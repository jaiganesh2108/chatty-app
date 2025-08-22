const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (user) =>
  jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already in use" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash });

  const token = signToken(user);
  res
    .cookie("token", token, { httpOnly: true, sameSite: "lax", secure: false })
    .json({ user: { id: user._id, name: user.name, email: user.email }, token });
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken(user);
  res
    .cookie("token", token, { httpOnly: true, sameSite: "lax", secure: false })
    .json({ user: { id: user._id, name: user.name, email: user.email }, token });
});

// POST /api/auth/logout
router.post("/logout", (_req, res) => {
  res.clearCookie("token").json({ ok: true });
});

// GET /api/auth/me
router.get("/me", async (req, res) => {
  const hdr = req.header("Authorization");
  if (!hdr) return res.status(401).json({ message: "No token" });
  try {
    const token = hdr.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ user: decoded });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
