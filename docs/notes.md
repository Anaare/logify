## Step 1: Initialize a project

### Goal: Create essential folder/file structure

#### What I did:

- Created essential files and folders

  - `config.env`: Stores environment variables and secrets.
  - `.gitignore`: Specifies which files and folders to exclude from version control.
  - `controllers/`: Contains the business logic for each route.
  - `routes/`: Defines the API endpoints and links them to controllers.
  - `models/`: Houses the database schemas and Mongoose models.
  - `utils/`: For general helper functions.

- Set up the main application files

  - `app.js`: Manages Express logic, middleware, and route mounting.
  - `server.js`: Handles server-side tasks like connecting to the database and starting the server.

## Step 2: Dependencies

### Goal: Install essential packages for security, routing, and data management.

#### What I did:

- express: The foundational web framework for building your Node.js API.
- bcrypt: A library for hashing and salting passwords, a crucial step for user data security.
- dotenv: Loads environment variables from a .env file, keeping your configuration separate from your code.
- cors: Middleware to enable Cross-Origin Resource Sharing, allowing your front-end to communicate with the back-end.
- jsonwebtoken: A library for creating and verifying JSON Web Tokens (JWTs), which are used for secure user authentication.
- mongoose: An Object Data Modeling (ODM) library that provides a straightforward way to interact with your MongoDB database.
- validator: Provides a set of middleware to validate and sanitize incoming data from requests.

## Step 3: Schemas and Models for Database

### Goal: Create necessary schemas for the database models

#### What I did:

- Implemented separate schemas for User, Project, and Task.
- Created a Mongoose model for each schema.
- Added validation for each field, including custom error messages.
- Used a pre-save hook to automatically hash user passwords with bcryptjs before they are stored.

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
