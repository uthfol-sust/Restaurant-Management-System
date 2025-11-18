import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/KitchenDashboard.css";

const KitchenDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [popup, setPopup] = useState(null);
    const [showNewOrders, setShowNewOrders] = useState(false);
    const [inventoryRequests, setInventoryRequests] = useState([]);
    const [newInventoryItem, setNewInventoryItem] = useState("");

    const orderStatuses = {
        NEW: "new",
        RECEIVED: "received",
        CANCELLED: "cancelled",
        READY: "ready",
        READY_TO_PICK: "ready_to_pick",
    };

    const addInventory = () => {
        if (!newInventoryItem) return;
        setInventoryRequests([...inventoryRequests, newInventoryItem]);
        setNewInventoryItem("");
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const newOrder = {
                id: Date.now(),
                table: Math.floor(Math.random() * 15) + 1,
                customer: { name: "John Doe", phone: "01700000000", email: "john@test.com" },
                items: [
                    { name: "Burger", qty: 1 },
                    { name: "French Fries", qty: 2 }
                ],
                status: orderStatuses.NEW,
                reason: "",
                date: "today",
            };
            setOrders((prev) => [...prev, newOrder]);
            setPopup(newOrder);
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    const viewPopup = () => {
        if (popup) {
            setShowNewOrders(true);
            setPopup(null);
        }
    };

    const updateOrderStatus = (id, status, reason = "") => {
        setOrders(
            orders.map((o) => (o.id === id ? { ...o, status, reason } : o))
        );
    };

    const getOrdersByStatus = (status) => {
        return orders.filter((o) => o.status === status);
    };

    return (
        <div className="App">
            <Navbar />

            {popup && (
                <div className="popup-center">
                    <p>New Order Received at Table {popup.table}</p>
                    <button onClick={viewPopup}>View</button>
                </div>
            )}

            <div className="kitchen-dashboard">
                <h2>Kitchen Dashboard</h2>

                <div className="orders-section">
                    <h3>New Orders</h3>
                    {getOrdersByStatus(orderStatuses.NEW).length === 0 ? (
                        <p>No new orders</p>
                    ) : (
                        getOrdersByStatus(orderStatuses.NEW).map((order) => (
                            <div key={order.id} className="order-card">
                                <p><strong>Table:</strong> {order.table}</p>
                                <p><strong>Customer:</strong> {order.customer.name}</p>
                                <p><strong>Phone:</strong> {order.customer.phone}</p>
                                <ul>
                                    {order.items.map((item, idx) => (
                                        <li key={idx}>{item.name} x {item.qty}</li>
                                    ))}
                                </ul>
                                <div className="order-actions">
                                    <button onClick={() => updateOrderStatus(order.id, orderStatuses.RECEIVED)}>Receive</button>
                                    <button onClick={() => updateOrderStatus(order.id, orderStatuses.CANCELLED, "OutOfStock")}>Cancel</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="orders-section">
                    <h3>Preparing / Confirmed Orders</h3>
                    {getOrdersByStatus(orderStatuses.RECEIVED).length === 0 ? (
                        <p>No orders</p>
                    ) : (
                        getOrdersByStatus(orderStatuses.RECEIVED).map((order) => (
                            <div key={order.id} className="order-card">
                                <p><strong>Table:</strong> {order.table}</p>
                                <p><strong>Status:</strong> Preparing</p>
                                <button onClick={() => updateOrderStatus(order.id, orderStatuses.READY)}>Ready</button>
                            </div>
                        ))
                    )}
                </div>

                <div className="orders-section">
                    <h3>Ready Orders</h3>
                    {getOrdersByStatus(orderStatuses.READY).length === 0 ? (
                        <p>No orders ready</p>
                    ) : (
                        getOrdersByStatus(orderStatuses.READY).map((order) => (
                            <div key={order.id} className="order-card">
                                <p><strong>Table:</strong> {order.table}</p>
                                <p><strong>Status:</strong> Ready</p>
                                <button onClick={() => updateOrderStatus(order.id, orderStatuses.READY_TO_PICK)}>Ready to Pick</button>
                            </div>
                        ))
                    )}
                </div>

                <div className="orders-section">
                    <h3>Inventory Requests</h3>
                    <div className="inventory-add">
                        <input
                            type="text"
                            value={newInventoryItem}
                            onChange={(e) => setNewInventoryItem(e.target.value)}
                            placeholder="Enter inventory item"
                        />
                        <button onClick={addInventory}>Add</button>
                    </div>
                    <ul>
                        {inventoryRequests.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default KitchenDashboard;
