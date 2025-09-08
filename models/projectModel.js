const mongoose = require("mongoose");
const validate = require("express-validator");

// 1) Create Schema

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

// 2) Create Model
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
