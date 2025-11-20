import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/Table.css";
import "../../styles/Auth.css";

import {
  getCustomers,
  updateCustomer,
  deleteCustomer,
} from "../../api/customersApi"; 

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const token = localStorage.getItem("token");

  const [showModal, setShowModal] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [selectedID, setSelectedID] = useState(null);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCustomers(token);
        setCustomers(res.data);
      } catch (err) {
        console.error("Error fetching customers:", err);
      }
    };
    fetchData();
  }, [token]);


  const openEdit = (c) => {
    setIsEdit(true);
    setSelectedID(c.id);
    setFormData({ ...c });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      await updateCustomer(selectedID, formData, token);
      setCustomers(customers.map((c) => (c.id === selectedID ? formData : c)));
      setShowModal(false);
    } catch (err) {
      console.error("Error updating customer:", err);
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteCustomer(selectedID, token);
      setCustomers(customers.filter((c) => c.id !== selectedID));
      setShowDeletePopup(false);
    } catch (err) {
      console.error("Error deleting customer:", err);
    }
  };

  return (
    <div className="App">
      <Navbar />

      <div className="table-container">
        <h2>Customers Management</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Email</th>
              <th>Phone</th><th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>

                <td className="action-btns">
                  <button className="edit-btn" onClick={() => openEdit(c)}>
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => {
                      setSelectedID(c.id);
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
      </div>


      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Customer</h3>

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

              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeletePopup && (
        <div className="modal-overlay">
          <div className="modal delete-modal">
            <h3>Delete Customer</h3>
            <p>Are you sure you want to delete this customer?</p>

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

export default Customers;
