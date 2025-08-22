require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db");
const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");
const initSocket = require("./socket");

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// REST routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);

const server = http.createServer(app);
initSocket(server, process.env.CLIENT_ORIGIN);

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  server.listen(process.env.PORT, () =>
    console.log(`🚀 API & Socket on http://localhost:${process.env.PORT}`)
  );
};
start();
