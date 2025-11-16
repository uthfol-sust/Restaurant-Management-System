import React from "react";
import Navbar from "../../components/Navbar";
import "../../styles/Auth.css";
import { FaUsers, FaUtensils, FaShoppingCart, FaChartBar } from "react-icons/fa";

const AdminDashboard = () => {
    // Dummy data (you can replace with API results later)
    const cards = [
        { title: "Total Customers", count: 120, icon: <FaUsers /> },
        { title: "Total Orders", count: 450, icon: <FaShoppingCart /> },
        { title: "Available Items", count: 35, icon: <FaUtensils /> },
        { title: "Daily Report", count: "View", icon: <FaChartBar /> },
    ];

    return (
        <div className="App">
            <Navbar />

            <div className="dashboard">
                <h2>Admin Dashboard</h2>

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

export default AdminDashboard;
