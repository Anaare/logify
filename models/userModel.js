const mongoose = require("mongoose");
const validate = require("express-validator");

// 1) Create Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ], //Array of ObjectId, references Project model
});

// 2) Create Model
const User = mongoose.model("User", userSchema);

module.exports = User;
