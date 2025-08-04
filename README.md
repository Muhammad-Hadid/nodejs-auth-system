"# nodejs-auth-system" 

Simple authentication system using:
- Node.js
- Express
- SQL
- bcryptjs
- jsonwebtoken
- cookie-parser

📁 Folder Structure:
.
├── app.js                  # Main entry point
├── .env                    # Environment variables (PORT, DB_URI, etc.)
├── /Controller
│   └── auth.controller.js  # Register/Login logic
├── /Models
│   └── user.model.js       # Mongoose user schema
├── /Router
│   └── auth.routes.js      # API routes (/register, /login)
└── /Middleware
    └── auth.middleware.js  # Auth check (optional)

🛠 Installation:
$ npm install
$ node app.js

🔐 API Routes:

# Register
POST /register
Body (JSON):
{
  "name": "John",
  "email": "john@example.com",
  "password": "123456"
}

# Login
POST /login
Body (JSON):
{
  "email": "john@example.com",
  "password": "123456"
}

📝 Notes:
- Passwords are hashed using bcryptjs.
- On successful login, a JWT token is created and sent in a cookie.


🔗 Dependencies:
- express
- bcryptjs
- jsonwebtoken
- cookie-parser
- dotenv
