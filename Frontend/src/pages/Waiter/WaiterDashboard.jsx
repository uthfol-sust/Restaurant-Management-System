import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../styles/WaiterDashboard.css";
import { getProducts } from "../../api/ProductApi";
import { createCustomer } from "../../api/customersApi";

import {
    FaUsers,
    FaUtensils,
    FaClipboardList,
    FaCheckCircle,
    FaClock,
} from "react-icons/fa";

import { createOrder, } from "../../api/ordersApi";

const WaiterDashboard = () => {
    const [customer, setCustomer] = useState({
        name: "",
        phone: "",
        email: "",
    });

    const [menuItems, setMenuItems] = useState([]);
    const [savedCustomerId, setSavedCustomerId] = useState(null);
    const [waiterId, setWaiterId] = useState(null);



    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetch = async () => {
        try {
            const response = await getProducts(token);
            if (response.data.success) {
            setMenuItems(response.data.data);
            }

            const payload = JSON.parse(atob(token.split(".")[1])); 
            setWaiterId(payload.ID || payload.id); 
        
        } catch (error) {
            console.error("Error fetching products:", error);
        }
        };
        fetch();
    }, []);

    const handleCustomerChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const payload = {
            name: customer.name,
            phone: customer.phone,
            email: customer.email,
        };

    const saveCustomer = async () => {
    if (!customer.name || !customer.phone) {
        alert("Name and phone are required");
        return;
    }

    try {
        const token = localStorage.getItem("token");
        const response = await createCustomer(payload, token);
        const newCustomerId = response.data.data;
        console.log(newCustomerId)
        if (response.data.success) {
            setSavedCustomerId(newCustomerId.id);
            alert("Customer Saved Successfully!");
            setCustomer({ name: "", phone: "", email: "" });
        }
    } catch (error) {
        console.error("Customer Save Error:", error);
        alert("Failed to save customer.");
    }
};

    const [currentOrders, setCurrentOrders] = useState([]);

    const addOrder = (item) => {
        const exists = currentOrders.find((o) => o.id === item.id);

        if (exists) {
            setCurrentOrders(
                currentOrders.map((o) =>
                    o.id === item.id ? { ...o, qty: o.qty + 1 } : o
                )
            );
        } else {
            setCurrentOrders([
                ...currentOrders,
                { id: item.id, name: item.name, price: item.price, qty: 1 },
            ]);
        }
    };

    const increaseQty = (id) => {
        setCurrentOrders(
            currentOrders.map((o) =>
                o.id === id ? { ...o, qty: o.qty + 1 } : o
            )
        );
    };

    const decreaseQty = (id) => {
        setCurrentOrders(
            currentOrders
                .map((o) =>
                    o.id === id ? { ...o, qty: o.qty > 1 ? o.qty - 1 : 1 } : o
                )
        );
    };

    const deleteOrder = (id) => {
        setCurrentOrders(currentOrders.filter((o) => o.id !== id));
    };

    const calculateTotal = () => {
        return currentOrders.reduce((sum, o) => sum + o.qty * o.price, 0);
    };

    const [kitchenOrders, setKitchenOrders] = useState([
        { id: 1, table: 4, item: "Chicken Curry", status: "RECEIVED", reason: "" },
        { id: 2, table: 2, item: "Beef Fry", status: "READY IN 5 MIN", reason: "" },
        { id: 3, table: 7, item: "Vegetable Pizza", status: "READY TO PICK", reason: "" },
        { id: 4, table: 1, item: "Momo", status: "CANCELLED", reason: "Late" },
    ]);

    const [tableNumber, setTableNumber] = useState("");

    const sendToKitchen = async () => {
        if (!savedCustomerId) {
            alert("Please save customer first!");
            return;
        }

        if (!tableNumber) {
            alert("Please enter table number!");
            return;
        }

        if (currentOrders.length === 0) {
            alert("No items added!");
            return;
        }

        if (!waiterId) {
            alert("Waiter ID missing (token issue)");
            return;
        }

        const token = localStorage.getItem("token");
        const total = calculateTotal();

        const orderPayload = {
            waiter_id: waiterId,
            customer_id: savedCustomerId,
            table_no: tableNumber,
            order_time: new Date().toISOString(),
            status: "Pending",
            total_amount: total
        };

        try {
            const response = await createOrder(orderPayload, token);

            if (response.data.success) {
                alert("Order sent to backend!");
            }
        } catch (err) {
            console.error("Order API Error:", err);
            alert("Failed to send order!");
        }

        currentOrders.forEach((item) => {
            setKitchenOrders((prev) => [
                ...prev,
                {
                    id: Date.now() + Math.random(),
                    table: tableNumber,
                    item: item.name,
                    status: "NEW ORDER",
                    reason: "",
                },
            ]);
        });

        setCurrentOrders([]);
        setTableNumber("");
};




    const [timeFilter, setTimeFilter] = useState("today");

    const tableStats = { today: 6, week: 22, month: 75 };
    const salesStats = { today: 3200, week: 14200, month: 58200 };
    const servedStats = { today: 18, week: 91, month: 364 };

    return (
        <div className="waiter-dashboard">
            <Navbar />

            <div className="dashboard-container">
                <h2 className="page-title">Waiter Dashboard</h2>

                <div className="card section-card">
                    <h3><FaUsers /> Add Customer Info</h3>

                    <div className="customer-form">
                        <input name="name" placeholder="Customer Name" value={customer.name} onChange={handleCustomerChange} />
                        <input name="phone" placeholder="Phone Number" value={customer.phone} onChange={handleCustomerChange} />
                        <input name="email" placeholder="Email (optional)" value={customer.email} onChange={handleCustomerChange} />
                        <button onClick={saveCustomer} className="save-btn">Save</button>
                    </div>
                </div>

                <div className="card section-card">
                    <h3><FaUtensils /> Menu Items</h3>

                    <div className="menu-grid">
                        {menuItems.slice(0,4).map((item) => (
                            <div className="menu-item" key={item.product_id}>
                            <img className="product-img" src={item.image} alt={item.product_name} />
                            <h4>{item.product_name}</h4>
                            <p>Price: {item.price} TK</p>
                            <p>Status: {item.availability_status}</p>
                            <button
                                onClick={() => addOrder({
                                id: item.product_id,
                                name: item.product_name,
                                price: item.price
                                })}
                                className="order-btn"
                                disabled={item.availability_status !== "Available"}
                            >
                                {item.availability_status === "Available" ? "Add Order" : "Unavailable"}
                            </button>
                            </div>
                        ))}
                    </div>
                   <Link to="/allproducts" className="view-btn">View All</Link>
                </div>

                {currentOrders.length > 0 && (
                    <div className="card section-card">
                        <h3><FaClipboardList /> Current Orders</h3>

                        <input
                            type="number"
                            placeholder="Table Number"
                            className="table-input"
                            value={tableNumber}
                            onChange={(e) => setTableNumber(e.target.value)}
                        />

                        <table className="order-table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Subtotal</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentOrders.map((o) => (
                                    <tr key={o.id}>
                                        <td>{o.name}</td>
                                        <td>
                                            <button onClick={() => decreaseQty(o.id)}>-</button>
                                            {o.qty}
                                            <button onClick={() => increaseQty(o.id)}>+</button>
                                        </td>
                                        <td>{o.price} TK</td>
                                        <td>{o.qty * o.price} TK</td>
                                        <td>
                                            <button onClick={() => deleteOrder(o.id)} className="delete-small">X</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h3 className="total-bill">Total: {calculateTotal()} TK</h3>

                        <button onClick={sendToKitchen} className="send-btn">Send to Kitchen</button>
                    </div>
                )}

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
                                {order.reason && <p className="reason">Reason: {order.reason}</p>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ---------------------- */}
                {/* STATS */}
                {/* ---------------------- */}
                <div className="card section-card">
                    <h3><FaClock /> Performance Summary</h3>

                    <div className="time-filter">
                        <button onClick={() => setTimeFilter("today")} className={timeFilter === "today" ? "active" : ""}>Today</button>
                        <button onClick={() => setTimeFilter("week")} className={timeFilter === "week" ? "active" : ""}>This Week</button>
                        <button onClick={() => setTimeFilter("month")} className={timeFilter === "month" ? "active" : ""}>This Month</button>
                    </div>

                    <div className="stats-row">
                        <div className="stats-box"><FaCheckCircle className="icon" /><h4>Tables Served</h4><p>{tableStats[timeFilter]}</p></div>
                        <div className="stats-box"><FaUtensils className="icon" /><h4>Total Served</h4><p>{servedStats[timeFilter]}</p></div>
                        <div className="stats-box"><FaClipboardList className="icon" /><h4>Total Sales</h4><p>{salesStats[timeFilter]} TK</p></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WaiterDashboard;
