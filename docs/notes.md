## Step 1: Project Initialization

### Goal: Set up the essential folder and file structure.

#### What I did:

- Created the following configuration files:

  - `config.env`: Stores environment variables and secrets.
  - `.gitignore`: Specifies which files and folders to exclude from version control.

- Created the following folders for project organization:

  - `controllers/`: Contains the business logic for each route.
  - `routes/`: Defines the API endpoints and links them to controllers.
  - `models/`: Houses the database schemas and Mongoose models.
  - `utils/`: For general helper functions.

- Created main application entry files:

  - `app.js`: Manages Express logic, middleware, and route mounting.
  - `server.js`: Handles server-side tasks like connecting to the database and starting the server.

## Step 2: Dependencies

### Goal: Install essential packages for routing, database management, and security.

#### What I did:

- Installed the following dependencies:
  - express: Core web framework for Node.js.
  - bcrypt: Hashing and salting passwords for user security.
  - dotenv: Loads environment variables from .env.
  - cors: Enables Cross-Origin Resource Sharing for frontend-backend communication.
  - jsonwebtoken: Creates and verifies JSON Web Tokens (JWT) for authentication.
  - mongoose: An Object Data Modeling (ODM) for working with MongoDB.
  - validator: Validates and sanitizes incoming request data.

## Step 3: Database Schemas & Models

### Goal: Define database structure with Mongoose schemas and models.

#### What I did:

- Created separate schemas for:

  - User
  - Project
  - Task

- Added validation rules and custom error messages.
- Implemented pre-save middleware to automatically hash user passwords with bcryptjs.

**Code Example (UserModel.js):**

```js
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please, provide a username!"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please, provide an email address!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please, provide a password!"],
    minlength: 8,
    select: false, // Ensures the password is not returned by default in queries
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
```

## Step 4: Error Handling

### Goal: Implement a centralized error-handling system for production.

#### What I did:

- Added a global error handler in app.js to override Express defaults.
- Created errorController.js in controllers/ for handling Mongoose-related errors.
- Built a reusable AppError class for custom errors.
- Implemented a catchAsync utility to handle errors in async functions.

## Step 5: Authentication & Authorization

### Goal: Implement user authentication and authorization logic.

#### What I did:

- Planned routes for working with the User model:
  - POST /api/auth/register → Register a new user.
  - POST /api/auth/login → Authenticate a user and return a JWT.
  - GET /api/auth/me → Retrieve currently authenticated user’s details.
- Added environment variables:

  - JWT_SECRET → Secret key for signing tokens.
  - JWT_EXPIRES_IN → Expiration time for tokens.

- Created helper functions and register controller.
- Set up /register route.
