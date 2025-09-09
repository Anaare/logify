const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

// 1) Create Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please, provide username!"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please, provide email address!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    required: [true, "Please, provide a password!"],
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ], //Array of ObjectId, references Project model
});

// PASSWORD ENCRYPTION (hashing)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  //   Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

// 2) Create Model
const User = mongoose.model("User", userSchema);

module.exports = User;
