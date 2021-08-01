const User = require("../models/user.js");
const { sendEmailToRegister } = require("../helpers/email/registerEmail");

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email has been taken",
      });
    }

    sendEmailToRegister(name, email, password)
      .then((response) => {
        console.log(response);
        return res.send(
          `Email has been sent to ${email}. Please check your mail box`
        );
      })
      .catch((err) => {
        res.status(400).json({
          error:
            "Something terribly went wrong. But don't worry, just check your internet connection",
        });
      });
  });
};
