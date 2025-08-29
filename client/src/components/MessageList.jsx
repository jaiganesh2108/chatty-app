import React, { useEffect, useRef } from "react";

function MessageList({ messageList, currentUser }) {
  const bottomRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  return (
    <div className="message-list">
      {messageList.map((m, i) => (
        <div
          key={i}
          className={`message ${m.user === currentUser ? "me" : "other"}`}
        >
          {/* Always show sender's name */}
          <span className="user">{m.user}</span>
          <p className="text">{m.text}</p>
        </div>
      ))}
      <div ref={bottomRef}></div>
    </div>
  );
}

export default MessageList;