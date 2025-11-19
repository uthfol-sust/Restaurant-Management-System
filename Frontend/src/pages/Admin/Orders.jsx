import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../styles/Table.css";
import "../../styles/Auth.css";
// import "../../styles/popup.css";

const Orders = () => {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([
        { id: 101, waiter: 1, customer: 5, total: 500, status: "Pending", time: "2025-01-10" },
        { id: 102, waiter: 2, customer: 6, total: 350, status: "Completed", time: "2025-01-11" },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);


    const handleUpdate = () => {
        const updated = orders.map(o =>
            o.id === selectedOrder.id ? selectedOrder : o
        );
        setOrders(updated);
        setShowModal(false);
    };

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
                        {orders.map((o) => (
                            <tr key={o.id}>
                                <td>{o.id}</td>
                                <td>{o.waiter}</td>
                                <td>{o.customer}</td>
                                <td>{o.total}</td>
                                <td>{o.status}</td>
                                <td>{o.time}</td>

                                <td className="action-btns">
                                    <button
                                        className="view-btn"
                                        onClick={() => navigate(`/admin/order/${o.id}`)}
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Update Order</h3>

                        <select
                            value={selectedOrder.status}
                            onChange={(e) => setSelectedOrder({ ...selectedOrder, status: e.target.value })}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Canceled">Canceled</option>
                        </select>

                        <input
                            type="number"
                            placeholder="Total Amount"
                            value={selectedOrder.total}
                            onChange={(e) =>
                                setSelectedOrder({ ...selectedOrder, total: Number(e.target.value) })
                            }
                        />

                        <div className="modal-actions">
                            <button className="save-btn" onClick={handleUpdate}>Save</button>
                            <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Orders;
