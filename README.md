### Node.js REST API for JWT Based Authentication
This project is a Node.js REST API built with Node.js, Express and MongoDB. It supports user registration, login, protected routes, rolebased access control using JWT and basic observability metrics.


### Features
- User Registration (/register)
- User Login with JWT (/login)
- Access to protected route which requires valid JWT (/profile)
- Access to admin-only route which the user to be an admin (/admin/data)
- Observability route (/metrics) 


### Technologies Used
- Node.js
- Express.js
- MongoDB (via Mongoose)
- bcrypt for password hashing
- JSON Web Tokens (JWT)
- dotenv for environment variable management


### Setup for this project
- Initialize the project using th command: git init -y
- Clone the repository using the command: git clone https://github.com/aamontford/user-management.git
- Install the necessary dependencies using the command: npm install express mongoose dotenv bcryptjs jsonwebtoken and npm install --save-dev nodemon.
- Create a .env file in the root directory with the following:
  the Port number, your MONGO_URI and your JWT_SECRET
- Start your server using nodemon index.js/npm start

### API Usage Via Postman
- All API requests should be http://localhost:3000 or your deployed server URL
1. Register a new user 
Endpoint: POST /api/register
Description: Creates a new user account.
Request body (JSON): 
{
    "name": "Ama Montford",
    "email": "ama05montford@gmail.com",
    "password": "yourPassword123",
    "role": "admin"
}
Response: 
{
    "message": "User registered successfully"
}

2. Login user
Endpoint: POST /api/login
Description: Logs in into created account.
Request body (JSON): 
{
   "email": "ama05montford@gmail.com",
   "password": "yourPassword123"
}
Response:
   {
    "message": "User login successful",
    "token": "your jwt token"
   }

3. Get User Profile (Protected)
Endpoint: GET /api/profile
Description: Returns the authenticated user's profile which requires a valid JWT
Authorization: Bearer token <your jwt token>
Response: 
{
    "message": "Welcome Admin",
    "adminId": "6825...",
    "iat": 17...,
    "exp": 17...
}

4. Get access to Admin Data(for admins only)
Endpoint: GET /api/admin/data
Description: Returns admin-specific data which requires a valid JWT with role "admin"
Authorization: Bearer token <your jwt token>
Response: 
{
    "message": "Welcome Admin",
    "adminId": "6825...",
    "iat": 17...,
    "exp": 17...
}

5. Get Server Metrics
Endpoint: GET /api/metrics
Description: Returns basic observability metrics.
Response: 
{
    "TotalRegisteredUsers": 1,
    "TotalLoginAttempts": {
        "success": 1,
        "fail": 0
    },
    "ProtectedRouteAccesses": 1
}


### Testing
- Use Postman to test all endpoints 
- Copy the JWT token from the login response and add it to the Authorization header for protected routes
  
### Developer Information
Name: Ama Addae Montford
Github: aamontford







  


