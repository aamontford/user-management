const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();
const { numberOfRegisteredUsers, numberOfLoginAttempts } = require("./metrics"); 

// Register user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

const salt = await bcrypt.genSalt(10); 
const hashedPassword = await bcrypt.hash(password, salt); 

const newUser = new User({ name, email, password: hashedPassword, role });
await newUser.save();

  numberOfRegisteredUsers();

  res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error during registration:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

//Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      numberOfLoginAttempts('fail');
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      numberOfLoginAttempts('fail');
      return res.status(400).json({ message: "Invalid credentials" });
    }
    numberOfLoginAttempts('success');

  const payload = { userId: user._id, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });

    res.status(200).json({ message: "User login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
