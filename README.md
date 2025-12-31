User API – Node.js

This project is a simple User Management API built using Node.js, Express, and MongoDB.
It includes user authentication, password hashing, and CRUD operations on users.

Features

User registration and login

JWT based authentication

Password hashing using bcrypt

Email must be unique

Create, read, update and delete users

Pagination for users list

Proper folder structure

Uses ES modules (import / export)

Tech Used

Node.js

Express.js

MongoDB (Atlas or Local)

Mongoose

JWT

bcrypt

dotenv

Project Structure
src/
│
├── config/
│   ├── db.js
│   └── jwt.js
│
├── controllers/
│   ├── auth.controller.js
│   └── user.controller.js
│
├── middlewares/
│   └── auth.middleware.js
│
├── models/
│   └── user.model.js
│
├── routes/
│   ├── auth.routes.js
│   └── user.routes.js
│
├── app.js
└── server.js

Setup Instructions
1. Install dependencies
npm install

2. Create .env file
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/user_api
JWT_SECRET=mysecretkey

3. Start the server
npm run dev


Server will run on:

http://localhost:3000

Authentication

Login returns a JWT token

Pass the token in headers for protected APIs

Authorization: Bearer <token>

API Endpoints
Auth APIs
Method	Endpoint	Description
POST	/auth/register	Register new user
POST	/auth/login	Login user
User APIs (Protected)
Method	Endpoint	Description
POST	/users	Create user
GET	/users	Get users with pagination
GET	/users/:id	Get user by ID
PUT	/users/:id	Update user
DELETE	/users/:id	Delete user
Pagination Example
GET /users?page=1&limit=5


Pagination is handled using MongoDB aggregation and password field is excluded from response.
