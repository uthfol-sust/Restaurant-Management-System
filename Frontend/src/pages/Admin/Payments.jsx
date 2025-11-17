import React from "react";
import Navbar from "../../components/Navbar";
import "../../styles/Table.css";
import "../../styles/Auth.css";


const Payments = () => {
    const payments = [
        { id: 1, order: 101, method: "Cash", status: "Paid", amount: 500, date: "2025-01-10" },
        { id: 2, order: 102, method: "Card", status: "Pending", amount: 350, date: "2025-01-11" },
    ];

    return (
        <div className="App">
            <Navbar />
            <div className="table-container">
                <h2>Payments</h2>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th><th>Order ID</th><th>Method</th><th>Status</th>
                            <th>Amount</th><th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td><td>{p.order}</td><td>{p.method}</td>
                                <td>{p.status}</td><td>{p.amount}</td><td>{p.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Payments;
