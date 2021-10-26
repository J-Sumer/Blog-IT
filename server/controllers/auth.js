const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

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

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({
      error: "All fields must be entered",
    });
  }
  User.findOne({ email }).exec(async (err, user) => {
    if (err || !user)
      return res.status(400).json({
        error: "User with this email id doesn't exist. Please register",
      });

    if (!user.authenticate(password))
      return res.status(400).json({
        error: "Eamil and password did not match",
      });

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const { _id, name, email, userid, role } = user;
    return res.json({
      token,
      user: { _id, name, email, userid, role },
    });
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
}); // This will set the decoded object in req.user

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id;
  User.findOne({ _id: authUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.user._id;
  User.findOne({ _id: adminUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "User not found",
      });
    }
    if (user.role !== "admin") {
      return res.status(401).json({
        error: "Admin access denied",
      });
    }
    req.profile = user;
    next();
  });
};
