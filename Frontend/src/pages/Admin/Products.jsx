import React from "react";
import Navbar from "../../components/Navbar";
import "../../styles/Table.css";
import "../../styles/Auth.css";

const Products = () => {
    const products = [
        { id: 1, name: "Burger", category: "Fast Food", price: 250, status: "Available" },
        { id: 2, name: "Tea", category: "Beverage", price: 30, status: "Unavailable" },
    ];

    return (
        <div className="App">
            <Navbar />
            <div className="table-container">
                <h2>Products</h2>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th><th>Name</th><th>Category</th><th>Price</th><th>Status</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td><td>{p.name}</td><td>{p.category}</td>
                                <td>{p.price}</td><td>{p.status}</td>
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

export default Products;
