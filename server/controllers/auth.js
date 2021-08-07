const jwt = require("jsonwebtoken");

const User = require("../models/user.js");
const { sendEmailToRegister } = require("../helpers/email/registerEmail");

const { handleError } = require("../helpers/errorHandler.js");

exports.register = (req, res) => {
  const { name, userid, email, password } = req.body;

  User.findOne({ userid }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "UserID has been taken",
      });
    }
  });

  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email id has been taken",
      });
    }
    sendEmailToRegister(name, userid, email, password)
      .then((response) => {
        return res.send(
          `Email has been sent to ${email}. Please check your mail box`
        );
      })
      .catch((err) => {
        return res.status(400).json({
          error:
            "Something terribly went wrong. But don't worry, just check your internet connection",
        });
      });
  });
};

exports.registerActivate = (req, res) => {
  const { query } = req.body;
  jwt.verify(
    query,
    process.env.JWT_ACCOUT_ACTIVATION,
    function (err, response) {
      if (err) {
        return res.status(400).json({
          error: handleError(err.message) || "Issue with json web token",
        });
      } else {
        const { name, userid, email, password } = response;
        const newUser = new User({ name, userid, email, password });
        newUser.save((err, user) => {
          if (err) {
            return res.status(400).json({
              error: handleError(err) || "Issue while saving the user",
            });
          }
          return res.json({
            user,
          });
        });
      }
    }
  );
};
