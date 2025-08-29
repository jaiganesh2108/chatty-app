const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./src/connectDB"); // MongoDB connection

// Import routes
const authRoutes = require("./src/routes/auth");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // must match frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json()); // parses incoming JSON requests

// Routes
app.use("/api/auth", authRoutes);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // join event (optional, if you want rooms per user)
  socket.on("join", (username) => {
    socket.username = username;
    console.log(`👤 ${username} joined the chat`);
  });

  // handle incoming messages
  socket.on("message", (msg) => {
    if (!msg.text || !msg.text.trim()) return; // ignore empty messages

    console.log("📩 Message received:", msg);

    // broadcast to all INCLUDING sender
    io.emit("message", {
      user: msg.user || socket.username || "Anonymous",
      text: msg.text.trim(),
    });
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// Basic route
app.get("/", (req, res) => {
  res.send("🚀 Server running successfully");
});

const PORT = process.env.PORT || 5000;

// Connect DB and start server
connectDB(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect DB:", err);
    process.exit(1);
  });
