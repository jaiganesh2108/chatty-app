import React, { useState, useEffect, use} from "react";
import { Routes, Route } from "react-router-dom";
import login from "./pages/Login";
import chat from "./Pages/Register";
import Home from "./pages/Chat";

function App() {
    const [user, setUser] = useState(
        () => Json.parse(localStorage.getItem("user")) || null 
    );
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate("/login");
    }, [user]);

    return (
        <Routes>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Repister />} />
            <Route path="/chat" element={user ? <Chat user={user} /> : <Navigate to="/login" />} />
        </Routes>
    );
}

export default App;