import React from "react";
import Navbar from "../../components/Navbar";
import "../../styles/Table.css";
import "../../styles/Auth.css";

const Inventory = () => {
    const inventory = [
        { id: 1, item: "Chicken", stock: 20, unit: "kg", level: 5, updated: "2025-01-05" },
        { id: 2, item: "Oil", stock: 10, unit: "L", level: 3, updated: "2025-01-01" },
    ];

    return (
        <div className="App">
            <Navbar />
            <div className="table-container">
                <h2>Inventory</h2>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th><th>Item</th><th>Stock</th>
                            <th>Unit</th><th>Reorder Level</th><th>Last Updated</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map(i => (
                            <tr key={i.id}>
                                <td>{i.id}</td><td>{i.item}</td><td>{i.stock}</td>
                                <td>{i.unit}</td><td>{i.level}</td><td>{i.updated}</td>
                                <td className="action-btns">
                                    <button className="edit-btn">Edit</button>
                                    <button className="delete-btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inventory;
