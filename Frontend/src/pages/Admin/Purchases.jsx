import React from "react";
import Navbar from "../../components/Navbar";
import "../../styles/Table.css";
import "../../styles/Auth.css";

const Purchases = () => {
    const purchases = [
        { id: 1, supplier: 1, inventory: 1, qty: 10, date: "2025-01-08", cost: 1500 },
        { id: 2, supplier: 2, inventory: 2, qty: 5, date: "2025-01-09", cost: 900 },
    ];

    return (
        <div className="App">
            <Navbar />
            <div className="table-container">
                <h2>Purchases</h2>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th><th>Supplier</th><th>Inventory ID</th>
                            <th>Qty Purchased</th><th>Date</th><th>Total Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td><td>{p.supplier}</td><td>{p.inventory}</td>
                                <td>{p.qty}</td><td>{p.date}</td><td>{p.cost}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Purchases;
