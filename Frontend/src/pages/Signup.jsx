import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "waiter",
        phone_no: "",
    });
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
            const res = await axios.post(`${API}/register`, formData);
            if (res.status==201) {
                navigate("/login");
            } else {
                setError(res.data.message || "Signup failed");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Server error.");
        }
    };

    return (
        <div className="App">
            <Navbar />
            <div className="auth-container">
                <h2>Create Account - 99 Meal</h2>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="phone_no"
                        placeholder="Phone Number"
                        value={formData.phone_no}
                        onChange={handleChange}
                        required
                    />

                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="admin">Admin</option>
                        <option value="waiter">Waiter</option>
                        <option value="kitchen">Kitchen Staff</option>
                    </select>

                    <button type="submit">Sign Up</button>
                </form>

                <p>
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
