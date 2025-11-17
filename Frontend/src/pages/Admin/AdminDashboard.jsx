import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import "../../styles/Auth.css";
import "../../styles/Admin.css";

import {
    FaUsers,
    FaUtensils,
    FaShoppingCart,
    FaChartBar,
    FaWarehouse,
    FaMoneyBill,
    FaTruck,
    FaBoxOpen
} from "react-icons/fa";

const AdminDashboard = () => {

    const cards = [
        { title: "Total Customers", count: 120, icon: <FaUsers />, link: "/admin/users" },
        { title: "Total Orders", count: 450, icon: <FaShoppingCart />, link: "/admin/orders" },
        { title: "Available Items", count: 35, icon: <FaUtensils />, link: "/admin/products" },
        { title: "Inventory Stock", count: 78, icon: <FaWarehouse />, link: "/admin/inventory" },
        { title: "Payments Processed", count: 320, icon: <FaMoneyBill />, link: "/admin/payments" },
        { title: "Suppliers", count: 12, icon: <FaTruck />, link: "/admin/suppliers" },
        { title: "Purchases", count: 50, icon: <FaBoxOpen />, link: "/admin/purchases" },
        { title: "Daily Report", count: "View", icon: <FaChartBar />, link: "/admin/reports" },
    ];

    return (
        <div className="admin-layout" >
            <Navbar />

            <div className="admin-container">
                <h2 className="admin-title">Admin Dashboard</h2>

                <div className="cards-container">
                    {cards.map((card, index) => (
                        <Link to={card.link} key={index} className="dashboard-card">
                            <div className="card-icon">{card.icon}</div>
                            <h3>{card.title}</h3>
                            <p className="count">{card.count}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
