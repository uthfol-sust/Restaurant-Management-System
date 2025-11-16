import React from "react";
import Navbar from "../../components/Navbar";
import Card from "../../components/WaiterDeshboardCard";
import "../../styles/Auth.css";
import "../../styles/WaiterDashboard.css"
import { FaUtensils, FaClipboardList, FaCheckCircle } from "react-icons/fa";

const WaiterDashboard = () => {

    const cards = [
        { title: "Orders Pending", count: 12, icon: <FaClipboardList /> },
        { title: "Tables Served", count: 8, icon: <FaCheckCircle /> },
        { title: "New Orders", count: 5, icon: <FaUtensils /> },
    ];

    return (
        <div className="App">
            <Navbar />

            <div className="dashboard">
                <h2>Waiter Dashboard</h2>

                <div className="cards-container">
                    {cards.map((card, index) => (
                        <Card
                            key={index}
                            title={card.title}
                            count={card.count}
                            icon={card.icon}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WaiterDashboard;
