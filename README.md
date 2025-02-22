# TaskFlow

**TaskFlow** is a task management web application that allows users to create, update, delete, and categorize tasks. Users can easily drag tasks between categories, mark them as complete, and track their progress in real-time.

---

## Live Links

- **Project Demo**: [TaskFlow Live Demo](https://taskflow-24416.web.app)  
- **GitHub Repository**: [TaskFlow GitHub](https://github.com/saikat1076/TaskFlow-sarvar)

---

## Short Description

TaskFlow is a **task management system** that helps users stay organized and productive. Built with **React**, **Node.js**, and **MongoDB**, it provides real-time updates and drag-and-drop features for a smooth task management experience.

---

## Dependencies

### Frontend:
- `React` - JavaScript library for building user interfaces.
- `React Router` - For routing between different pages.
- `React Query` - For data fetching and caching.
- `Axios` - For making HTTP requests.
- `React-DnD` - For drag-and-drop functionality.
- `Tailwind CSS` - For styling the UI.
- `react-icons` - For including icons in the application.

### Backend:
- `Node.js` - JavaScript runtime for building the backend.
- `Express.js` - Framework for building the backend server.
- `MongoDB` - NoSQL database for storing tasks and user information.
- `Socket.IO` - For real-time task updates across different clients.

---

## 🏃‍♂ Local Development Guide

Follow these steps to run the project locally on your machine:

1. *Clone the repository*:
    bash
    git clone https://github.com/saikat-1076/taskflow-.git
    cd taskflow-
    

2. *Install dependencies*:
    Run the following command to install all the required dependencies:
    bash
    npm install
    

3. *Set up environment variables*:
    Create a .env file in the root directory of the project and add your MongoDB URI and JWT secret key:
    
    MONGODB_URI=your-mongodb-uri-here
    JWT_SECRET=your-secret-key-here
    

4. *Run the backend server*:
    To start the backend server, run:
    bash
    npm run server
    

5. *Run the frontend development server*:
    In a separate terminal window, run the following command to start the frontend:
    bash
    npm run client
    

6. *Open the app in your browser*:
    After starting both the backend and frontend, open your browser and navigate to http://localhost:3000 to see the live version of the app running locally.


Technologies Used
Frontend:

React.js
React Query
React Router
Tailwind CSS
React DnD
Axios
react-icons
Backend:

Node.js
Express.js
MongoDB
Socket.IO
Development Tools:

VS Code - Code editor used for development.
Postman - For testing API endpoints.
