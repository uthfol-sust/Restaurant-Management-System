import React, { useRef } from "react";

const ProductForm = ({
  newProduct,
  setNewProduct,
  isEdit,
  onSave,
  onClose,
  onUpload,
}) => {
  const fileRef = useRef(null);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{isEdit ? "Edit Product" : "Add New Product"}</h3>

        <input
          type="text"
          placeholder="Product ID"
          value={newProduct.product_id}
          disabled={isEdit}
          onChange={(e) =>
            setNewProduct({ ...newProduct, product_id: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Name"
          value={newProduct.product_name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, product_name: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: Number(e.target.value) })
          }
        />

        <select
          value={newProduct.availability_status}
          onChange={(e) =>
            setNewProduct({ ...newProduct, availability_status: e.target.value })
          }
        >
          <option>Available</option>
          <option>Unavailable</option>
        </select>

        <div className="upload-section">
          <label>Upload Product Image</label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
            if (!newProduct.product_id) {
              alert("Save product first before uploading image.");
              return;
            }
            onUpload(e.target.files[0]);
          }}
          />

          {newProduct.preview && (
            <img
              src={newProduct.preview}
              style={{ width: "80px", marginTop: "10px", borderRadius: "6px" }}
            />
          )}

          {newProduct.image && !newProduct.preview && (
            <img
              src={newProduct.image}
              style={{ width: "80px", marginTop: "10px", borderRadius: "6px" }}
            />
          )}
        </div>

        <div className="modal-actions">
          <button className="save-btn" onClick={onSave}>
            {isEdit ? "Update" : "Save"}
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
