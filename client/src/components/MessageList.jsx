import React from "react";

function MessageList({ messageList, currentUser }) {
    return (
        <div className="message-list">
            {messageList.map((m, i) => (
                <div key={i} className={`message ${m.user === currentUser ? "me" : "other"}`}>
                <span className="user"> {m.user}</span>: <span>{m.text}</span>
                </div>
            ))}
        </div>
    );
}

export default MessageList; 