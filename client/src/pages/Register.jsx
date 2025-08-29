import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../lib/api"; // 👈 Axios instance
import "../styles/auth.css";
import alienChat from "../assets/alien.png"; // 👈 Add your alien image in src/assets/

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/api/auth/register", { name, email, password });

      if (res.data?.user) {
        alert("✅ Registered successfully!");
        navigate("/login");
      } else {
        alert(res.data?.message || "Registration failed");
      }
    } catch (err) {
      console.error("❌ Register error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        {/* 👇 Alien mascot */}
        <img src={alienChat} alt="Alien mascot" className="alien-img" />

        <h2>Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
