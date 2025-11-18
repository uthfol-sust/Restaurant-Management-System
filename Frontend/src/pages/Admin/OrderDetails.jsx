import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../styles/Table.css";
import "../../styles/Auth.css";

const OrderDetails = () => {
    const { id } = useParams(); 

    const allDetails = [
        { id: 1, order_id: 101, product: 1, qty: 2, price: 150, subtotal: 300 },
        { id: 2, order_id: 101, product: 2, qty: 1, price: 200, subtotal: 200 },
        { id: 3, order_id: 102, product: 4, qty: 1, price: 350, subtotal: 350 },
    ];

    const details = allDetails.filter((d) => d.order_id == id);

    return (
        <div className="App">
            <Navbar />
            <div className="table-container">
                <h2>Order Details - #{id}</h2>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th><th>Order ID</th><th>Product ID</th>
                            <th>Qty</th><th>Price</th><th>Subtotal</th>
                        </tr>
                    </thead>

                    <tbody>
                        {details.map((d) => (
                            <tr key={d.id}>
                                <td>{d.id}</td>
                                <td>{d.order_id}</td>
                                <td>{d.product}</td>
                                <td>{d.qty}</td>
                                <td>{d.price}</td>
                                <td>{d.subtotal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderDetails;
