import React from "react";
import Navbar from "../../components/Navbar";
import "../../styles/Table.css";
import "../../styles/Auth.css";


const OrderDetails = () => {
    const details = [
        { id: 1, order_id: 101, product: 1, qty: 2, price: 150, subtotal: 300 },
        { id: 2, order_id: 101, product: 2, qty: 1, price: 200, subtotal: 200 },
    ];

    return (
        <div className="App">
            <Navbar />
            <div className="table-container">
                <h2>Order Details</h2>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th><th>Order ID</th><th>Product ID</th><th>Qty</th>
                            <th>Price</th><th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.map(d => (
                            <tr key={d.id}>
                                <td>{d.id}</td><td>{d.order_id}</td><td>{d.product}</td>
                                <td>{d.qty}</td><td>{d.price}</td><td>{d.subtotal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderDetails;
