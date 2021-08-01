const { check } = require("express-validator");

const userRegisterValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Must be a valid email id"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 char long"),
];

module.exports = {
  userRegisterValidator,
};
