import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import axios from "axios";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

function Login() {
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_URL; 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post(`${API}/login`, formData);

            if (res.data.success) {
                login({
                    email: res.data.user.email,
                    token: res.data.token,
                    role: res.data.user.role,
                });

                navigate("/waiter");
            } else {
                setError(res.data.message || "Login failed");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(err.response?.data?.message || "Invalid email or password");
        }
    };

    return (
        <div className="App">
            <Navbar />

            <div className="auth-container">
                <h2>Login to 99 Meal</h2>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Login</button>
                </form>

                <p>
                    Don’t have an account?{" "}
                    <Link to="/signup">Sign up here</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
