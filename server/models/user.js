const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require("crypto");

const userSchema = new Schema(
  {
    userid: {
      type: String,
      trim: true,
      required: true,
      max: 25,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      max: 25,
      index: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      max: 25,
      unique: true,
      index: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: String,
      default: "subscriber",
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  { timestamp: true }
);

//virtual fields

const virtualPassword = userSchema.virtual("password");

virtualPassword.set(function (password) {
  // Create a temporary variable
  this._password = password;
  //Generate Salt
  this.salt = this.makeSalt();
  // Encrypt password
  this.hashed_password = this.encryptPassword(password);
});

virtualPassword.get(function () {
  return this._password;
});

userSchema.methods = {
  authenticate: function(password) {
    return this.encryptPassword(password) = this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() + Math.random()) + "";
  },
};

module.exports = mongoose.model('User', userSchema);
