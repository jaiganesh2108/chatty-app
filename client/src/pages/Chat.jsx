import React, { useState, useEffect } from "react";
import socket from "../lib/socket";
import MessageList from "../components/MessageList";
import ChatInput from "../components/ChatInput";
import "../styles/chat.css";

function Chat({ user }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!user?.name) return;

    socket.emit("join", user.name);

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, [user]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const msg = { user: user.name, text };
    socket.emit("message", msg);
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <h2>👽 Alien Chat</h2>
        <span>Welcome, {user.name}</span>
      </div>

      <MessageList messageList={messages} currentUser={user.name} />
      <ChatInput onSent={sendMessage} />
    </div>
  );
}

export default Chat;
