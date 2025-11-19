import React from "react";
import "../styles/Table.css";

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
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
        {products?.map((p) => (
          <tr key={p.product_id}>
            <td>{p.product_id}</td>

            <td>
              {p.image ? (
                <img
                  src={p.image}
                  alt=""
                  style={{ width: "50px", borderRadius: "6px" }}
                />
              ) : (
                "No Image"
              )}
            </td>

            <td>{p.product_name}</td>
            <td>{p.category}</td>
            <td>{p.price}</td>
            <td>{p.availability_status}</td>

            <td className="action-btns">
              <button className="edit-btn" onClick={() => onEdit(p)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => onDelete(p.product_id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
