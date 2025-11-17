import React from "react";
import Navbar from "../../components/Navbar";
import "../../styles/Table.css";
import "../../styles/Auth.css"

const Orders = () => {
    const orders = [
        { id: 101, waiter: 1, customer: 5, total: 500, status: "Pending", time: "2025-01-10" },
        { id: 102, waiter: 2, customer: 6, total: 350, status: "Completed", time: "2025-01-11" },
        { id: 101, waiter: 1, customer: 5, total: 500, status: "Pending", time: "2025-01-10" },
        { id: 102, waiter: 2, customer: 6, total: 350, status: "Completed", time: "2025-01-11" },
        { id: 101, waiter: 1, customer: 5, total: 500, status: "Pending", time: "2025-01-10" },
        { id: 102, waiter: 2, customer: 6, total: 350, status: "Completed", time: "2025-01-11" },
    ];

    return (
        <div className="App">
            <Navbar />
            <div className="table-container">
                <h2>Orders</h2>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th><th>Waiter ID</th><th>Customer ID</th><th>Total</th>
                            <th>Status</th><th>Order Time</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(o => (
                            <tr key={o.id}>
                                <td>{o.id}</td><td>{o.waiter}</td><td>{o.customer}</td>
                                <td>{o.total}</td><td>{o.status}</td><td>{o.time}</td>
                                <td className="action-btns">
                                    <button className="view-btn">View</button>
                                    <button className="edit-btn">Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;
