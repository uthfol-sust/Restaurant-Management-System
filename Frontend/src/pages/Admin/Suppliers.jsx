import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/Table.css";
import "../../styles/Auth.css";
import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../../api/suppliersApi";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedID, setSelectedID] = useState(null);

  const [form, setForm] = useState({
    supplier_id: "",
    name: "",
    contact_no: "",
    email: "",
    address: "",
  });

  const token = localStorage.getItem("token"); 

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await getSuppliers(token);
        setSuppliers(res?.data?.data || []);
      } catch (err) {
        console.error("Error fetching suppliers:", err);
      }
    };
    fetchSuppliers();
  }, [token]);

  const openAdd = () => {
    setIsEdit(false);
    setForm({
      supplier_id: "",
      name: "",
      contact_no: "",
      email: "",
      address: "",
    });
    setShowModal(true);
  };

  const openEdit = (supplier) => {
    setIsEdit(true);
    setSelectedID(supplier.supplier_id);
    setForm({ ...supplier });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (isEdit) {
        await updateSupplier(selectedID, form, token);
      } else {
        await createSupplier(form, token);
      }
      const res = await getSuppliers(token);
      setSuppliers(res.data.data);
    } catch (err) {
      console.error("Error saving supplier:", err);
    }
    setShowModal(false);
  };

  const confirmDelete = async () => {
    try {
      await deleteSupplier(selectedID, token);
      const res = await getSuppliers(token);
      setSuppliers(res.data.data);
    } catch (err) {
      console.error("Error deleting supplier:", err);
    }
    setShowDeletePopup(false);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="table-container">
        <div className="table-header">
          <h2>Suppliers</h2>
          <button className="add-btn" onClick={openAdd}>Add Supplier</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Contact No</th><th>Email</th><th>Address</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((s) => (
              <tr key={s.supplier_id}>
                <td>{s.supplier_id}</td>
                <td>{s.name}</td>
                <td>{s.contact_no}</td>
                <td>{s.email}</td>
                <td>{s.address}</td>
                <td className="action-btns">
                  <button className="edit-btn" onClick={() => openEdit(s)}>Edit</button>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      setSelectedID(s.supplier_id);
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
            <h3>{isEdit ? "Edit Supplier" : "Add Supplier"}</h3>

            <input
              type="text"
              placeholder="Supplier Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              type="text"
              placeholder="Contact No"
              value={form.contact_no}
              onChange={(e) => setForm({ ...form, contact_no: e.target.value })}
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              type="text"
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
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
            <p>Are you sure you want to delete this supplier?</p>

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

export default Suppliers;
