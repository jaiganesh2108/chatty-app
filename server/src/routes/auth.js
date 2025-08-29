const express = require("express");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// ✅ Helper: sign token
const signToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("❌ JWT_SECRET is not set in .env");
  }
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ✅ POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // save with correct field
    const user = await User.create({ name, email, passwordHash });

    const token = signToken(user);

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
      .status(201)
      .json({
        message: "User registered successfully",
        user: { id: user._id, name: user.name, email: user.email },
        token,
      });
  } catch (err) {
    console.error("❌ Register error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ compare against passwordHash
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken(user);

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        message: "Login successful",
        user: { id: user._id, name: user.name, email: user.email },
        token,
      });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ POST /api/auth/logout
router.post("/logout", (_req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
});

// ✅ GET /api/auth/me
router.get("/me", async (req, res) => {
  try {
    const hdr = req.header("Authorization");
    const token =
      hdr && hdr.startsWith("Bearer ")
        ? hdr.replace("Bearer ", "")
        : req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ user: decoded });
  } catch (err) {
    console.error("❌ Me error:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

module.exports = router;
