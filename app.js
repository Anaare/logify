const express = require("express");
const authRouter = require("./routes/authRoutes");
const globalErrorHandler = require("./controllers/errorController");
const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);

// Will run for ALL http verbs
// Handling UNHANDLED routes
app.all("/{*any}", (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
