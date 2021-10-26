const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

//import from controllers
const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
} = require("../controllers/auth.js");

const { read } = require("../controllers/user");

router.get("/user", requireSignin, authMiddleware, read);
router.get("/admin", requireSignin, adminMiddleware, read);

module.exports = router;
