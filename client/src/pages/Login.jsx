import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/api";
import "../styles/auth.css";
import alienChat from "../assets/alien.png"; // 👈 Save your image in src/assets/alien.png

function Login({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/api/auth/login", { email, password });
            localStorage.setItem("user", JSON.stringify(res.data));
            setUser(res.data);
            navigate("/chat");
        } catch (err) {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-box" onSubmit={handleSubmit}>
                {/* 👇 Alien Image */}
                <img src={alienChat} alt="Alien chatting" className="alien-img" />

                <h2>Login</h2>
                
                <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>

                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
