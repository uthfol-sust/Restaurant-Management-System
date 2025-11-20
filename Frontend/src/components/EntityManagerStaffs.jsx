import React, { useState, useEffect } from "react";
import "../styles/Table.css";

const EntityManager = ({ title, fields, fetchData, updateEntity, deleteEntity, token }) => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchData(token);
        setItems(res.data);
      } catch (err) {
        console.error(`Error fetching ${title}:`, err);
      }
    };
    load();
  }, [token, fetchData, title]);

  // ----------------- OPEN EDIT -------------------
  const openEdit = (item) => {
    setSelectedID(item.id);
    setFormData({ ...item });
    setShowModal(true);
  };

  // ----------------- SAVE CHANGES -------------------
  const handleSave = async () => {
    try {
      await updateEntity(selectedID, formData, token);
      setItems(items.map((i) => (i.id === selectedID ? formData : i)));
      setShowModal(false);
    } catch (err) {
      console.error(`Error updating ${title}:`, err);
    }
  };

  // ----------------- DELETE -------------------
  const confirmDelete = async () => {
    try {
      await deleteEntity(selectedID, token);
      setItems(items.filter((i) => i.id !== selectedID));
      setShowDeletePopup(false);
    } catch (err) {
      console.error(`Error deleting ${title}:`, err);
    }
  };

  return (
    <div className="table-container">
      <h2>{title} Management</h2>

      <table>
        <thead>
          <tr>
            {fields.map((f) => (
              <th key={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.id}>
              {fields.map((f) => (
                <td key={f}>{i[f]}</td>
              ))}
              <td className="action-btns">
                <button className="edit-btn" onClick={() => openEdit(i)}>Edit</button>
                <button className="delete-btn" onClick={() => { setSelectedID(i.id); setShowDeletePopup(true); }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ----------------- EDIT POPUP ------------------- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit {title.slice(0, -1)}</h3>
            {fields.map((f) => (
              <input
                key={f}
                type="text"
                placeholder={f}
                value={formData[f] || ""}
                onChange={(e) => setFormData({ ...formData, [f]: e.target.value })}
              />
            ))}
            <div className="modal-actions">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- DELETE CONFIRMATION POPUP ------------------- */}
      {showDeletePopup && (
        <div className="modal-overlay">
          <div className="modal delete-modal">
            <h3>Delete {title.slice(0, -1)}</h3>
            <p>Are you sure you want to delete this {title.slice(0, -1).toLowerCase()}?</p>
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

export default EntityManager;
