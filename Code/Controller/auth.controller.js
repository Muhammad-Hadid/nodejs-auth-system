const Usermodel = require("../models").User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load .env variables
require("dotenv").config();

// REGISTER FUNCTION
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const checkemail = await Usermodel.findOne({ where: { email } });
    if (checkemail) {
      return res.status(400).json({ message: "User is already registered" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const createaccount = await Usermodel.create({
      name,
      email,
      password: hashedpassword
    });

    res.status(201).json({
      message: "User is created successfully",
      data: createaccount
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN FUNCTION
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkuser = await Usermodel.findOne({ where: { email } });

    if (!checkuser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, checkuser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign(
      {
        id: checkuser.id,
        email: checkuser.email
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN } // e.g., 1d, 7d, etc.
    );

    // Set the JWT token in HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,         // can't be accessed by JavaScript
      secure: false,          // true in production (https)
      sameSite: "strict",     // protect against CSRF
      maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: checkuser.id,
        name: checkuser.name,
        email: checkuser.email
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { register, login };

////////
// ✅ React Frontend:
// Ab frontend me axios se login request bhejte waqt ye zaroori hai:

// js
// Copy
// Edit
// axios.post("http://localhost:5000/api/login", data, {
//   withCredentials: true
// });
// ⚠️ withCredentials: true lagana na bhoolna — tabhi cookie frontend me store hogi.