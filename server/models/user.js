import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: "String",
    trim: true,
    required: true,
    max: 25,
    unique: true,
    index: true,
  },
  email: String,
  password: String,
});

module.exports = userSchema;
