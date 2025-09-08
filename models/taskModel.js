const mongoose = require("mongoose");
const validate = require("express-validator");

// 1) Create schema for the model
const taskModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  timeEntries: [{ startTime: Date, stopTime: Date, duration: Number }],
});

// 2) Create model for the schema
const Task = mongoose.model("Task", taskModel);

module.exports = Task;
