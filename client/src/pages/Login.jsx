import React, { userState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import "../styles/auth.css";

function Login({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", { email, password});
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
                <h2>Login</h2>
                <input type="email" placeholder="Email" value={email} onClick={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onclick={(e) => setPassword(e.target.value)} required/>
                <button type="submit">Login</button>
                <p>
                    Don't have an account? <Link to="/register"> Register </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;