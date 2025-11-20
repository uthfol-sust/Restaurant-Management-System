import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

import Navbar from "../components/Navbar";
import TeamCard from "../components/TeamCard";
import Abouts from "../components/Abouts";
import homeImg from "../assets/home.jpg";
import { getStaffs } from "../api/usersApi";

const Home = () => {
    const [displayText, setDisplayText] = useState("");
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const API = import.meta.env.VITE_API_URL;

    const fullText = "Welcome to 99 Meal – Your Digital Restaurant Solution!";

    useEffect(() => {
        const token = localStorage.getItem("token")
        setIsLoggedIn(!!token);

        const fetchUsers = async () => {
            try {
                const res = await getStaffs(token);

                if (res.data.success && Array.isArray(res.data.data)) {
                    setUsers(res.data.data||[]);  
                } else {
                    setError("Failed to load users");
                }
            } catch (err) {
                setError(err.response?.data?.message || "Server error while loading users.");
            }
        };

        fetchUsers();
    }, []);

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

            <div className="home-page">
                <div className="overlay">
                    <div className="hero-content">
                        <h1 className="hero-title">{displayText}</h1>
                    </div>

                    {!isLoggedIn && (
                        <div className="button">
                            <Link to="/login" className="login-btn">
                                Login
                            </Link>
                        </div>
                    )}

                </div>
            </div>
            
            <div id="our-team" className="our-team-section">
                <h2>Our Team</h2>
                <p className="team-subtitle">
                    Meet the chefs, managers, and staff who craft unforgettable dining experiences every day.
                </p>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <div className="team-grid">
                    {users.length > 0 ? (
                        users.map((user,index) => (
                            <TeamCard
                                key={index}
                                id={user.id}
                                img={user.profile_image || homeImg}
                                name={user.name}
                                role={user.role || "Staff"}
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
