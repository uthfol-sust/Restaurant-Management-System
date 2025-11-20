import React, { useState, useEffect} from "react";
import Navbar from "../../components/Navbar";
import "../../styles/Table.css";
import "../../styles/Auth.css";

import {
    getStaffs,
    updateStaff,
    deleteStaff,
} from "../../api/usersApi"

const Users = () => {
    const token  = localStorage.getItem("token");

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const [isEdit, setIsEdit] = useState(false);
    const [selectedID, setSelectedID] = useState(null);

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        email: "",
        role: "",
        phone: "",
    });

    const loadUsers = async () => {
        try {
            const res = await getStaffs(token);
            setUsers(res.data.data); 
        } catch (err) {
            console.error("Error loading users:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const openEdit = (u) => {
        setIsEdit(true);
        setSelectedID(u.id);
        setFormData({ ...u });
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            await updateStaff(selectedID, formData, token);

            const updatedUsers = users.map((u) =>
                u.id === selectedID ? formData : u
            );
            setUsers(updatedUsers);

            setShowModal(false);
        } catch (err) {
            console.error("Error updating user:", err);
        }
    };

    const confirmDelete = async () => {
        try {
            await deleteStaff(selectedID, token);
            setUsers(users.filter((u) => u.id !== selectedID));
        } catch (err) {
            console.error("Error deleting user:", err);
        }
        setShowDeletePopup(false);
    };

    return (
        <div className="App">
            <Navbar />

            <div className="table-container">
                <h2>Users Management</h2>

                {loading ? (
                    <p>Loading users...</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th><th>Name</th><th>Email</th>
                                <th>Role</th><th>Phone</th><th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((u ,index) => (
                                <tr key={index}>
                                    <td>{u.id}</td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.role}</td>
                                    <td>{u.phone}</td>

                                    <td className="action-btns">
                                        <button className="edit-btn" onClick={() => openEdit(u)}>
                                            Edit
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => {
                                                setSelectedID(u.id);
                                                setShowDeletePopup(true);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Edit User</h3>

                        <input
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Role"
                            value={formData.role}
                            onChange={(e) =>
                                setFormData({ ...formData, role: e.target.value })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                            }
                        />

                        <div className="modal-actions">
                            <button className="save-btn" onClick={handleSave}>
                                Save
                            </button>

                            <button className="cancel-btn" onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {showDeletePopup && (
                <div className="modal-overlay">
                    <div className="modal delete-modal">
                        <h3>Delete User</h3>
                        <p>Are you sure you want to delete this user?</p>

                        <div className="modal-actions">
                            <button className="delete-btn" onClick={confirmDelete}>
                                Delete
                            </button>

                            <button
                                className="cancel-btn"
                                onClick={() => setShowDeletePopup(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
