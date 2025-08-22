const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const Message = require("./models/Message");

function roomKey(a, b) {
  // stable 1:1 room id; for global room, pass "global" to both join
  if (a === "global" || b === "global") return "global";
  return [a, b].sort().join("__");
}

module.exports = function initSocket(httpServer, corsOrigin) {
  const io = new Server(httpServer, {
    cors: { origin: corsOrigin, credentials: true }
  });

  // Auth handshake: client sends token in query
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("No token"));
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = user; // { id, name, email }
      next();
    } catch (e) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    // Join default global room
    socket.join("global");

    // Client can join a direct room with another user
    socket.on("joinDirect", (otherUserId) => {
      const rk = roomKey(socket.user.id, otherUserId);
      socket.join(rk);
    });

    // Send message to a room (global or direct)
    socket.on("sendMessage", async ({ roomId = "global", text }) => {
      if (!text?.trim()) return;
      const msg = await Message.create({
        roomId,
        senderId: socket.user.id,
        senderName: socket.user.name,
        text
      });
      io.to(roomId).emit("newMessage", {
        _id: msg._id,
        roomId: msg.roomId,
        senderId: msg.senderId,
        senderName: msg.senderName,
        text: msg.text,
        createdAt: msg.createdAt
      });
    });

    socket.on("disconnect", () => {});
  });

  return io;
};
