/*

Authentication & Authorization (/api/auth)
1) POST /api/auth/register (Register a new user) + 
2) POST /api/auth/login (Login a user, returns a JWT)
3) GET /api/auth/me (Get the currently authenticated user's details)


// PASSWORD HASHING BRO
*/
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");

/* 1) HELPER FUNCTIONS */

// Purpose: create a JWT for a user’s ID, to send secure, tamper-proof token to a client
const signToken = (id) => {
  // Payload is info about the user
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Purpose: wraps everything up in one place.
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  user.password = undefined;

  //   Token is returned so user is logged in automatically
  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};

/* CONTROLLERS */

exports.register = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  createSendToken(newUser, 201, res);
});

// 2) POST /api/auth/login (Login a user, returns a JWT)

// 3) GET /api/auth/me (Get the currently authenticated user's details)
