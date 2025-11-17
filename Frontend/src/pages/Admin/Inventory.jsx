import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/Table.css";
import "../../styles/Auth.css";
import "../../styles/products.css";

const Inventory = () => {
    const [inventory, setInventory] = useState([
        { id: 1, item: "Chicken", stock: 20, unit: "kg", level: 5, updated: "2025-01-05" },
        { id: 2, item: "Oil", stock: 10, unit: "L", level: 3, updated: "2025-01-01" },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const [isEdit, setIsEdit] = useState(false);
    const [selectedID, setSelectedID] = useState(null);

    const [newItem, setNewItem] = useState({
        id: "",
        item: "",
        stock: "",
        unit: "",
        level: "",
        updated: "",
    });

    const openAdd = () => {
        setIsEdit(false);
        setNewItem({
            id: inventory.length + 1,
            item: "",
            stock: "",
            unit: "",
            level: "",
            updated: new Date().toISOString().split("T")[0],
        });
        setShowModal(true);
    };

    // ---------- OPEN EDIT POPUP ----------
    const openEdit = (item) => {
        setIsEdit(true);
        setSelectedID(item.id);
        setNewItem({ ...item });
        setShowModal(true);
    };

    // ---------- SAVE ITEM ----------
    const handleSave = () => {
        if (isEdit) {
            const updated = inventory.map((i) =>
                i.id === selectedID ? newItem : i
            );
            setInventory(updated);
        } else {
            setInventory([...inventory, newItem]);
        }
        setShowModal(false);
    };

    // ---------- DELETE ----------
    const confirmDelete = () => {
        setInventory(inventory.filter((i) => i.id !== selectedID));
        setShowDeletePopup(false);
    };

    return (
        <div className="App">
            <Navbar />
            <div className="table-container">
                <div className="table-header">
                    <h2>Inventory</h2>
                    <button className="add-btn" onClick={openAdd}>Add Item</button>
                </div>

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
                                    <button className="edit-btn" onClick={() => openEdit(i)}>Edit</button>
                                    <button className="delete-btn" onClick={() => {
                                        setSelectedID(i.id);
                                        setShowDeletePopup(true);
                                    }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ---------- ADD/EDIT POPUP ---------- */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>{isEdit ? "Edit Inventory Item" : "Add New Inventory Item"}</h3>

                        <input
                            type="number"
                            placeholder="ID"
                            value={newItem.id}
                            readOnly
                        />
                        <input
                            type="text"
                            placeholder="Item Name"
                            value={newItem.item}
                            onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Stock"
                            value={newItem.stock}
                            onChange={(e) => setNewItem({ ...newItem, stock: Number(e.target.value) })}
                        />

                        <input
                            type="text"
                            placeholder="Unit"
                            value={newItem.unit}
                            onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                        />

                        <input
                            type="number"
                            placeholder="Reorder Level"
                            value={newItem.level}
                            onChange={(e) => setNewItem({ ...newItem, level: Number(e.target.value) })}
                        />

                        <input
                            type="date"
                            value={newItem.updated}
                            onChange={(e) => setNewItem({ ...newItem, updated: e.target.value })}
                        />

                        <div className="modal-actions">
                            <button className="save-btn" onClick={handleSave}>Save</button>
                            <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ---------- DELETE CONFIRMATION POPUP ---------- */}
            {showDeletePopup && (
                <div className="modal-overlay">
                    <div className="modal delete-modal">
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete this item?</p>

                        <div className="modal-actions">
                            <button className="delete-btn" onClick={confirmDelete}>Delete</button>
                            <button className="cancel-btn" onClick={() => setShowDeletePopup(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;
