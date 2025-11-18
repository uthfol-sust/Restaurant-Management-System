import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/WaiterDashboard.css";
import {
    FaUsers,
    FaUtensils,
    FaClipboardList,
    FaCheckCircle,
    FaClock,
    FaPhone,
    FaEnvelope
} from "react-icons/fa";

const WaiterDashboard = () => {
    // ------------------------------
    //  CUSTOMER INFO FORM
    // ------------------------------
    const [customer, setCustomer] = useState({
        name: "",
        phone: "",
        email: "",
    });

    const handleCustomerChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const saveCustomer = () => {
        if (!customer.name || !customer.phone) {
            alert("Name and phone are required");
            return;
        }
        alert("Customer Saved Successfully!");
        setCustomer({ name: "", phone: "", email: "" });
    };

    // ------------------------------
    //  LIVE KITCHEN ORDERS (Dummy)
    // ------------------------------
    const kitchenOrders = [
        { id: 1, table: 4, item: "Chicken Curry", status: "RECEIVED", reason: "" },
        { id: 2, table: 2, item: "Beef Fry", status: "READY IN 5 MIN", reason: "" },
        { id: 3, table: 7, item: "Vegetable Pizza", status: "READY TO PICK", reason: "" },
        { id: 4, table: 1, item: "Momo", status: "CANCELLED", reason: "Late" },
    ];

    // ------------------------------
    //  TIME FILTERS (stats)
    // ------------------------------
    const [timeFilter, setTimeFilter] = useState("today");

    const tableStats = {
        today: 6,
        week: 22,
        month: 75,
    };

    const salesStats = {
        today: 3200,
        week: 14200,
        month: 58200,
    };

    const servedStats = {
        today: 18,
        week: 91,
        month: 364,
    };

    // ------------------------------
    //  MENU ITEMS (dummy)
    // ------------------------------
    const menuItems = [
        {
            id: 1,
            name: "Chicken Biriyani",
            price: 220,
            img: "https://i.imgur.com/hX3X4Vf.jpeg",
        },
        {
            id: 2,
            name: "Beef Tehari",
            price: 250,
            img: "https://i.imgur.com/7iKjQJp.jpeg",
        },
        {
            id: 3,
            name: "Cold Coffee",
            price: 150,
            img: "https://i.imgur.com/wn8cHfE.jpeg",
        },
        {
            id: 4,
            name: "Chicken Burger",
            price: 180,
            img: "https://i.imgur.com/suG1M5S.jpeg",
        },
    ];

    return (
        <div className="waiter-dashboard">
            <Navbar />

            <div className="dashboard-container">
                <h2 className="page-title">Waiter Dashboard</h2>

                {/* ---------------------- */}
                {/* CUSTOMER INFO FORM */}
                {/* ---------------------- */}
                <div className="card section-card">
                    <h3><FaUsers /> Add Customer Info</h3>

                    <div className="customer-form">
                        <input
                            type="text"
                            name="name"
                            placeholder="Customer Name"
                            value={customer.name}
                            onChange={handleCustomerChange}
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            value={customer.phone}
                            onChange={handleCustomerChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email (optional)"
                            value={customer.email}
                            onChange={handleCustomerChange}
                        />
                        <button onClick={saveCustomer} className="save-btn">Save</button>
                    </div>
                </div>

                {/* ---------------------- */}
                {/* MENU ITEMS */}
                {/* ---------------------- */}
                <div className="card section-card">
                    <h3><FaUtensils /> Menu Items</h3>
                    <div className="menu-grid">
                        {menuItems.map((item) => (
                            <div className="menu-item" key={item.id}>
                                <img src={item.img} alt={item.name} />
                                <h4>{item.name}</h4>
                                <p>Price: {item.price} TK</p>
                                <button className="order-btn">Add Order</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ---------------------- */}
                {/* LIVE KITCHEN ORDERS */}
                {/* ---------------------- */}
                <div className="card section-card">
                    <h3><FaClipboardList /> Live Kitchen Orders</h3>
                    <div className="kitchen-list">
                        {kitchenOrders.map((order) => (
                            <div key={order.id} className="kitchen-card">
                                <h4>Table {order.table}</h4>
                                <p><strong>Item:</strong> {order.item}</p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    <span className={`status ${order.status.toLowerCase().replace(/ /g, "-")}`}>
                                        {order.status}
                                    </span>
                                </p>
                                {order.reason && (
                                    <p className="reason">Reason: {order.reason}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ---------------------- */}
                {/* STATS SECTION */}
                {/* ---------------------- */}
                <div className="card section-card">
                    <h3><FaClock /> Performance Summary</h3>

                    <div className="time-filter">
                        <button onClick={() => setTimeFilter("today")} className={timeFilter === "today" ? "active" : ""}>Today</button>
                        <button onClick={() => setTimeFilter("week")} className={timeFilter === "week" ? "active" : ""}>This Week</button>
                        <button onClick={() => setTimeFilter("month")} className={timeFilter === "month" ? "active" : ""}>This Month</button>
                    </div>

                    <div className="stats-row">
                        <div className="stats-box">
                            <FaCheckCircle className="icon" />
                            <h4>Tables Served</h4>
                            <p>{tableStats[timeFilter]}</p>
                        </div>

                        <div className="stats-box">
                            <FaUtensils className="icon" />
                            <h4>Total Served</h4>
                            <p>{servedStats[timeFilter]}</p>
                        </div>

                        <div className="stats-box">
                            <FaClipboardList className="icon" />
                            <h4>Total Sales</h4>
                            <p>{salesStats[timeFilter]} TK</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default WaiterDashboard;
