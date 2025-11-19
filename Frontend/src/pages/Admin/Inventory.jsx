import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/Table.css";
import "../../styles/Auth.css";
import "../../styles/products.css";

import { getInventories, createInventory, updateInventory, deleteInventory } from "../../api/inventoryApi";

const Inventory = () => {
    const [inventory, setInventory] = useState([]);
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
        last_updated: "",
    });

    const getNextID = () => {
    if (!inventory || inventory.length === 0) return 1;
    const maxID = Math.max(...inventory.map(i => i.id));
    return maxID + 1;
   };

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const data = await getInventories();
                setInventory(data.data);
            } catch (err) {
                console.error("Error fetching inventory:", err);
                setInventory([]);
            }
        };
        fetchInventory();
    }, []);

    const openAdd = () => {
        setIsEdit(false);
        setNewItem({
            id: getNextID(),
            item: "",
            stock: "",
            unit: "",
            level: "",
            last_updated: new Date().toISOString().split("T")[0],
        });
        setShowModal(true);
    };

    const openEdit = (item) => {
        setIsEdit(true);
        setSelectedID(item.id);
        setNewItem({ ...item });
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            if (isEdit) {
                await updateInventory(selectedID, newItem);
                setInventory(inventory.map(i => i.id === selectedID ? newItem : i));
            } else {
                const savedItem = await createInventory(newItem);
                setInventory([...inventory, savedItem.data]);
            }
            setShowModal(false);
        } catch (err) {
            console.error("Error saving item:", err);
        }
    };


    const confirmDelete = async () => {
        try {
            await deleteInventory(selectedID);
            setInventory(inventory.filter(i => i.id !== selectedID));
            setShowDeletePopup(false);
        } catch (err) {
            console.error("Error deleting item:", err);
        }
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
                            <th>ID</th>
                            <th>Item</th>
                            <th>Stock</th>
                            <th>Unit</th>
                            <th>Reorder Level</th>
                            <th>Last Updated</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory?.map((i ,index) => (
                            <tr key={index}>
                                <td>{i.id}</td>
                                <td>{i.item}</td>
                                <td>{i.stock}</td>
                                <td>{i.unit}</td>
                                <td>{i.level}</td>
                                <td>{i.last_updated}</td>
                                <td className="action-btns">
                                    <button className="edit-btn" onClick={() => openEdit(i)}>Edit</button>
                                    <button className="delete-btn" onClick={() => {
                                        setSelectedID(i.id);
                                        setShowDeletePopup(true);
                                    }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>{isEdit ? "Edit Inventory Item" : "Add New Inventory Item"}</h3>

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
                            value={newItem.last_updated}
                            onChange={(e) => setNewItem({ ...newItem, last_updated: e.target.value })}
                        />

                        <div className="modal-actions">
                            <button className="save-btn" onClick={handleSave}>Save</button>
                            <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

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
