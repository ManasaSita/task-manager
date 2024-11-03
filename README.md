# Task Manager App

A full-stack Task Management Application built with Node.js, Express, and MongoDB on the backend, with a frontend for managing user tasks. The app allows users to create, update, and track tasks with support for comments, priorities, and due dates.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Future Enhancements](#future-enhancements)
- [License](#license)
- [Contributing](#contributing)

## Features

- **User Authentication**: Users can sign up and log in securely.
- **Task Management**: Create, edit, update, and delete tasks.
- **Commenting**: Users can add comments to tasks.
- **Prioritization**: Assign priority levels to tasks.
- **User-Friendly UI**: Interactive and responsive UI to manage tasks effectively.

## Tech Stack

- **Frontend**: React (or replace with your front-end framework)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Other Tools**: Axios, Mongoose

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ManasaSita/task-manager.git
   cd task-manager
   ```

2. **Install dependencies for the backend and frontend**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```plaintext
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/task_management_db
   JWT_SECRET=48c865586d257308604f4be7e70b55268f2d67da52f8bfd95a08e34ce47bb332
   ```

4. **Run the backend**:
   ```bash
   npx nodemon app.js
   ```

5. **Run the frontend**:
   In a separate terminal window:
   ```bash
   npm start
   ```

The backend server will be running on `http://localhost:5000`, and the frontend on the default development port (usually `http://localhost:3000`).

## Usage

1. **User Authentication**: Register and log in to access task management features.
2. **Task Creation**: Create tasks with due dates, priorities, and descriptions.
3. **Add Comments**: Comment on tasks to track progress or add notes.
4. **View Tasks**: View all tasks and filter by status or priority.

## API Endpoints

### Authentication
- **POST** `/api/auth/register` - Register a new user.
- **POST** `/api/auth/login` - Log in an existing user.

### Tasks
- **GET** `/api/tasks` - Retrieve all tasks for the authenticated user.
- **POST** `/api/tasks` - Create a new task.
- **PUT** `/api/tasks/:taskId` - Update an existing task.
- **DELETE** `/api/tasks/:taskId` - Delete a task.

### Comments
- **GET** `/api/tasks/:taskId/comments` - Retrieve all comments for a task.
- **POST** `/api/tasks/:taskId/comments` - Add a new comment to a task.

## Folder Structure

```
task-manager/
│
├── controllers/     # Controllers for handling API requests
│   ├── authController.js
│   ├── taskController.js
│
├── models/         # Mongoose models for MongoDB collections
│   ├── User.js
│   ├── Task.js
│
├── routes/         # Route definitions
│   ├── authRoutes.js
│   ├── taskRoutes.js
│
├── middleware/     # Middleware functions
│   └── authMiddleware.js
│
├── config/         # Config files
│   └── db.js
│
└── app.js         # Main server file
```

## Future Enhancements

- **Notifications**: Notify users about due dates or task updates.
- **Role-based Access Control**: Add roles like Admin, User, etc.
- **Pagination**: Enable pagination for task lists.
- **Enhanced Comments**: Allow image attachments or reactions.

## License

This project is licensed under the MIT License.

## Contributing

Feel free to submit issues or pull requests. All contributions are welcome!
