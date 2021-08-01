const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

//import from controllers
const { register } = require("../controllers/auth.js");

//validators
const { userRegisterValidator } = require("../validators/auth.js");
const { runValidation } = require("../validators/index.js");

router.post("/register", userRegisterValidator, runValidation, register);

module.exports = router;
