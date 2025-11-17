import React from "react";
import Navbar from "../../components/Navbar";
import "../../styles/Table.css";
import "../../styles/Auth.css";

const Suppliers = () => {
    const suppliers = [
        { id: 1, name: "Fresh Foods Ltd", phone: "01711123456", email: "fresh@sup.com", address: "Dhaka" },
        { id: 2, name: "Meat Supply Co", phone: "01722234567", email: "meat@sup.com", address: "Sylhet" },
    ];

    return (
        <div className="App">
            <Navbar />
            <div className="table-container">
                <h2>Suppliers</h2>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th><th>Name</th><th>Phone</th><th>Email</th><th>Address</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map(s => (
                            <tr key={s.id}>
                                <td>{s.id}</td><td>{s.name}</td><td>{s.phone}</td>
                                <td>{s.email}</td><td>{s.address}</td>
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

export default Suppliers;
