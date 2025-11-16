import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../styles/Home.css";
import "../styles/Auth.css";

import Navbar from "../components/Navbar";
import TeamCard from "../components/TeamCard";
import Abouts from "../components/Abouts";

import homeImg from "../assets/home.jpg";

const Home = () => {
    const [displayText, setDisplayText] = useState("");
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    const API = import.meta.env.VITE_API_URL;

    const fullText = "Welcome to 99 Meal – Your Digital Restaurant Solution!";

    // ⬇️ Fetch users on first page load
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${API}/users`);

                if (res.status === 200 && Array.isArray(res.data)) {
                    setUsers(res.data);  // store users in state
                } else {
                    setError("Failed to load users");
                }
            } catch (err) {
                setError(err.response?.data?.message || "Server error while loading users.");
            }
        };

        fetchUsers();
    }, []);

    // ⬇️ Typewriter text animation
    useEffect(() => {
        let i = 0;

        const startTyping = () => {
            i = 0;
            setDisplayText("");

            const typingInterval = setInterval(() => {
                setDisplayText(fullText.substring(0, i));
                i++;

                if (i > fullText.length) {
                    clearInterval(typingInterval);
                    setTimeout(startTyping, 2000);
                }
            }, 60);
        };

        startTyping();
    }, []);

    return (
        <div className="App">
            <Navbar />

            {/* HERO SECTION */}
            <div className="home-page">
                <div className="overlay">
                    <div className="hero-content">
                        <h1 className="hero-title">{displayText}</h1>
                    </div>

                    <div className="button">
                        <Link to="/login" className="login-btn">
                            Login
                        </Link>
                    </div>
                </div>
            </div>

            {/* TEAM SECTION (Users from API) */}
            <div id="our-team" className="our-team-section">
                <h2>Our Team</h2>
                <p className="team-subtitle">
                    Meet the chefs, managers, and staff who craft unforgettable dining experiences every day.
                </p>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <div className="team-grid">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <TeamCard
                                key={user.id}
                                id={user.id}
                                img={user.image || homeImg}
                                name={user.name}
                                role={user.role || "Staff"}
                                desc={user.bio || "Dedicated staff member of 99 Meal."}
                            />
                        ))
                    ) : (
                        <p>Loading team members...</p>
                    )}
                </div>

            </div>
            <Abouts />
        </div>
    );
};

export default Home;
