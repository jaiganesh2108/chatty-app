import React, {useState} from "react";

function ChatInput({ onSent}) {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onSent(text);
        setText("");
    };

    return (
        <form className="chat-input" onSubmit={handleSubmit}>
            <input type="text" placeholder="Type a message..." value={text} onClick={(e) => setText(e.target.value)} />
            <button type="submit">Send</button>
        </form>
    );
}

export default ChatInput;