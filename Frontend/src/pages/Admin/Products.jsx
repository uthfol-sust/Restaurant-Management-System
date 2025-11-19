import React, { useState, useRef } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

import "../../styles/Table.css";
import "../../styles/Auth.css";
import "../../styles/products.css";

const API = "http://localhost:8080";

const Products = () => {
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);

    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [newProduct, setNewProduct] = useState({
        id: "",
        name: "",
        category: "",
        price: "",
        status: "Available",
        image: ""
    });

    const [products, setProducts] = useState([
        { id: 1, name: "Burger", category: "Fast Food", price: 250, status: "Available", image: "" },
        { id: 2, name: "Tea", category: "Beverage", price: 30, status: "Unavailable", image: "" },
    ]);

    const fileInputRef = useRef(null);

    const handleProductImageUpload = async (file) => {
        if (!file) return;

        const productId = isEdit ? editId : newProduct.id;

        const formData = new FormData();
        formData.append("image", file);
        formData.append("product_id", productId);

        try {
            const res = await axios.put(
                `${API}/products/${productId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const imageUrl = res.data.data;

            setNewProduct((prev) => ({ ...prev, image: imageUrl }));
            alert("Product image uploaded!");
        } catch (err) {
            console.log("Image upload error:", err);
        }
    };

    const handleAddProduct = () => {
        if (isEdit) {
            const updated = products.map(item =>
                item.id === editId ? newProduct : item
            );
            setProducts(updated);

        } else {
            const updated = [...products, { ...newProduct }];
            setProducts(updated);
        }

        setShowModal(false);
        setNewProduct({
            id: "",
            name: "",
            category: "",
            price: "",
            status: "Available",
            image: ""
        });
        setIsEdit(false);
    };

    const confirmDelete = () => {
        setProducts(products.filter(p => p.id !== deleteId));
        setShowDelete(false);
        setDeleteId(null);
    };

    return (
        <div className="App">
            <Navbar />

            <div className="table-container">
                <div className="table-header">
                    <h2>Products</h2>

                    <button
                        className="add-btn"
                        onClick={() => {
                            setIsEdit(false);
                            setNewProduct({
                                id: "",
                                name: "",
                                category: "",
                                price: "",
                                status: "Available",
                                image: ""
                            });
                            setShowModal(true);
                        }}
                    >
                        Add Product
                    </button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td>

                                <td>
                                    {p.image ? (
                                        <img
                                            src={p.image}
                                            style={{ width: "50px", borderRadius: "5px" }}
                                        />
                                    ) : (
                                        "No Image"
                                    )}
                                </td>

                                <td>{p.name}</td>
                                <td>{p.category}</td>
                                <td>{p.price}</td>
                                <td>{p.status}</td>

                                <td className="action-btns">

                                    <button
                                        className="edit-btn"
                                        onClick={() => {
                                            setIsEdit(true);
                                            setEditId(p.id);
                                            setNewProduct(p);
                                            setShowModal(true);
                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => {
                                            setDeleteId(p.id);
                                            setShowDelete(true);
                                        }}
                                    >
                                        Delete
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
                        <h3>{isEdit ? "Edit Product" : "Add New Product"}</h3>

                        {!isEdit && (
                            <input
                                type="number"
                                placeholder="Product ID"
                                value={newProduct.id}
                                onChange={(e) => setNewProduct({ ...newProduct, id: Number(e.target.value) })}
                            />
                        )}

                        <input
                            type="text"
                            placeholder="Product Name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />

                        <input
                            type="text"
                            placeholder="Category"
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        />

                        <input
                            type="number"
                            placeholder="Price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                        />

                        <select
                            value={newProduct.status}
                            onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
                        >
                            <option>Available</option>
                            <option>Unavailable</option>
                        </select>

                        <div className="upload-section">
                            <label>Upload Product Image</label>

                            <div
                                onClick={() => fileInputRef.current.click()}
                                style={{
                                    cursor: "pointer",
                                    padding: "6px 10px",
                                    background: "#333",
                                    color: "white",
                                    borderRadius: "5px",
                                    display: "inline-block",
                                    marginBottom: "8px"
                                }}
                            >
                                Upload Image
                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleProductImageUpload(e.target.files[0])}
                                style={{ display: "none" }}
                            />

                            {newProduct.image && (
                                <img
                                    src={newProduct.image}
                                    alt="preview"
                                    style={{
                                        width: "80px",
                                        marginTop: "10px",
                                        borderRadius: "6px",
                                        border: "1px solid #ccc",
                                    }}
                                />
                            )}
                        </div>

                        <div className="modal-actions">
                            <button className="save-btn" onClick={handleAddProduct}>
                                {isEdit ? "Update" : "Save"}
                            </button>

                            <button className="cancel-btn" onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {showDelete && (
                <div className="modal-overlay">
                    <div className="modal delete-modal">
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete this product?</p>

                        <div className="modal-actions">
                            <button className="delete-btn" onClick={confirmDelete}>Yes</button>
                            <button className="cancel-btn" onClick={() => setShowDelete(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
