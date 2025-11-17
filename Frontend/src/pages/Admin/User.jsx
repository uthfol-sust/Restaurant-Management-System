import React from "react";
import Navbar from "../../components/Navbar";
import "../../styles/Table.css";
import  "../../styles/Auth.css"

const Users = () => {
    const users = [
        { id: 1, name: "John Doe", email: "john@example.com", role: "Waiter", phone: "01710000000" },
        { id: 2, name: "Admin User", email: "admin@rest.com", role: "Admin", phone: "01820000000" },
    ];

    return (
        <div className="App">
            <Navbar />
            <div className="table-container">
                <h2>Users Management</h2>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Phone</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id}>
                                <td>{u.id}</td><td>{u.name}</td><td>{u.email}</td>
                                <td>{u.role}</td><td>{u.phone}</td>
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

export default Users;
