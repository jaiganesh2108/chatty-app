import react , { useState, useEffect, use} from "react";
import socket from "../lib/socket";
import MessageList from "../components/MessageList";
import ChatInput from "../components/ChatInput";
import "../styles/chat.css";

function Chat({ user }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.emit("join", user.name);

        socket.on("message", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off("message");
        };
    },[]);

    const sendMessage = (text) => {
        const msg = { user: user.name, text };
        socket.emit("message", msg);
        setMessages((prev) => [...prev, msg]);
    };

    return (
        <div className="chat-container">
            <h2>Welcome, {user.name}</h2>
            <MessageList messages={messages} currentUser={user.name} />
            <ChatInput onSent={sendMessage} />
        </div>
    );
}

export default Chat;