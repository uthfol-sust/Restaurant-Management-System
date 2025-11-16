import React from "react";
import Navbar from "../../components/Navbar";
import "../../styles/Auth.css";
import { FaFireAlt, FaBell, FaCheck } from "react-icons/fa";

const KitchenDashboard = () => {
    const cards = [
        { title: "Pending Orders", count: 14, icon: <FaBell /> },
        { title: "Cooking Now", count: 7, icon: <FaFireAlt /> },
        { title: "Completed Orders", count: 21, icon: <FaCheck /> },
    ];

    return (
        <div className="App">
            <Navbar />

            <div className="dashboard">
                <h2>Kitchen Dashboard</h2>

                <div className="cards-container">
                    {cards.map((card, index) => (
                        <div className="dashboard-card" key={index}>
                            <div className="card-icon">{card.icon}</div>
                            <h3>{card.title}</h3>
                            <p className="count">{card.count}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default KitchenDashboard;
