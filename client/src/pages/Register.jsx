import React, { use, useState } from "react";
import {useNavigate, Link} from "react-router-dom";
import api from "../lib/api";
import "../styles/auth.css";

function Register() {
    const [name, setName] = useState("");
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await api.post("/auth/register", { name, email, password});
            alert("Registered successfully!");
            navigate("/login");
        } catch (err) {
            alert("Error registering user");
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-box" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required/>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.terget.value)} required/>
                <input type="password" placeholder="Password" value={password} onClick={(e) => setPassword(e.target.value)} required/>
                <button type="submit">Register</button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
}

export default Register;