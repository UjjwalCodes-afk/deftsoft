# User API -- Node.js

This project is a simple User Management API built using Node.js,
Express, and MongoDB. It supports user authentication and CRUD
operations on users.

------------------------------------------------------------------------

## Features

-   User registration and login
-   JWT based authentication
-   Password hashing using bcrypt
-   Email must be unique
-   Create, read, update and delete users
-   Pagination for users list
-   Clean folder structure
-   Uses ES modules (import / export)

------------------------------------------------------------------------

## Tech Used

-   Node.js
-   Express.js
-   MongoDB (Atlas or Local)
-   Mongoose
-   JWT
-   bcrypt
-   dotenv

------------------------------------------------------------------------

## Project Structure

src/ config/ controllers/ middlewares/ models/ routes/ app.js server.js

------------------------------------------------------------------------

## Setup Instructions

1.  Install dependencies

npm install

2.  Create .env file

PORT=3000
MONGO_URI=mongodb+srv://`<username>`{=html}:`<password>`{=html}@cluster.mongodb.net/user_api
JWT_SECRET=mysecretkey

3.  Start the server

npm start

Server will run on http://localhost:3000

------------------------------------------------------------------------

## Authentication & Authorization

-   Only registered and logged-in users can access user APIs
-   JWT token is required for all /users routes
-   Token must be sent in request headers

Authorization: Bearer `<JWT_TOKEN>`{=html}

Public APIs: - POST /auth/register - POST /auth/login

Protected APIs (Login Required): - POST /users - GET /users - GET
/users/:id - PUT /users/:id - DELETE /users/:id

If token is missing or invalid, API returns 401 Unauthorized.

------------------------------------------------------------------------

## API Endpoints

Auth APIs POST /auth/register POST /auth/login

User APIs POST /users GET /users GET /users/:id PUT /users/:id DELETE
/users/:id

------------------------------------------------------------------------

## Pagination Example

GET /users?page=1&limit=5

Pagination is implemented using MongoDB aggregation and password field
is excluded.

------------------------------------------------------------------------

## Testing

-   All APIs tested using Postman
-   Postman collection included
-   JWT token required for protected APIs

------------------------------------------------------------------------

## Notes

-   Passwords are stored in hashed format
-   Email is unique for each user
-   MongoDB Atlas is used to share database with other developers
