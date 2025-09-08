3. Core Functionalities and Routes
   These are the RESTful API endpoints you will build.

Authentication & Authorization (/api/auth)
POST /api/auth/register (Register a new user)

POST /api/auth/login (Login a user, returns a JWT)

GET /api/auth/me (Get the currently authenticated user's details)

Project Management (/api/projects)
GET /api/projects (Get all projects for the user)

POST /api/projects (Create a new project)

GET /api/projects/:id (Get a single project)

PUT /api/projects/:id (Update a project)

DELETE /api/projects/:id (Delete a project)

Task Management & Time Tracking (/api/tasks)
GET /api/tasks (Get all tasks for the user, filtered by project ID)

POST /api/tasks (Create a new task)

PUT /api/tasks/:id (Update a task)

DELETE /api/tasks/:id (Delete a task)

POST /api/tasks/:id/start (Start a timer for a task)

POST /api/tasks/:id/stop (Stop the timer and save the time entry)

5. Essential Middleware
   Integrate these middleware functions into your server.js file.

express.json(): For parsing JSON request bodies.

cors(): To enable Cross-Origin Resource Sharing.

authMiddleware: Your custom function to protect routes by verifying JWT tokens.
