const express = require("express");

const app = express();

app.use(express.json());

app.use("/api/v1/tasks", (req, res) => {
  res.status(200).json({
    status: "success",
    data: null,
  });
});

module.exports = app;
