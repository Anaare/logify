/*
Authentication & Authorization (/api/auth)
1) POST /api/auth/register (Register a new user)

2) POST /api/auth/login (Login a user, returns a JWT)

3) GET /api/auth/me (Get the currently authenticated user's details)

*/

const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/register").post(authController.register);

module.exports = router;
