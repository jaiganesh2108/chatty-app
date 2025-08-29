import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const navigate = useNavigate();

  // Redirect to /login if no user is found
  useEffect(() => {
    // Only redirect if trying to access /chat and not logged in
    if (!user && window.location.pathname === "/chat") {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Routes>
      {/* Default route → Login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Login route (passes setUser so we can save logged-in user) */}
      <Route path="/login" element={<Login setUser={setUser} />} />

      {/* Register route */}
      <Route path="/register" element={<Register />} />

      {/* Protected chat route */}
      <Route
        path="/chat"
        element={user ? <Chat user={user} /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;
