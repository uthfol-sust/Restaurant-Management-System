import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/Table.css";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/ProductApi";

import { uploadProductImage } from "../../api/UploadApi";

import ProductForm from "../../components/ProductForm";
import ProductTable from "../../components/ProductTable";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [newProduct, setNewProduct] = useState({
    product_id: "",
    product_name: "",
    category: "",
    price: "",
    availability_status: "Available",
    image: "",
    preview: "",
  });
  const [imageFile, setImageFile] = useState(null);

   const token = localStorage.getItem("token");
   
  const load = async () => {
    try {
      const res = await getProducts(token);
      setProducts(res.data.data);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleUpload = (file) => {
    setNewProduct({
      ...newProduct,
      preview: URL.createObjectURL(file),
    });

    setImageFile(file);
  };


  const saveProduct = async () => {
    try {
      let savedProduct;

      if (isEdit) {
        await updateProduct(selectedId, newProduct, token);
        savedProduct = { product_id: selectedId };
      } else {
        const res = await createProduct(
          {
            product_id: newProduct.product_id,
            product_name: newProduct.product_name,
            category: newProduct.category,
            price: newProduct.price,
            availability_status: newProduct.availability_status,
          },
          token
        );
        savedProduct = res.data.data;  
      console.log("Created Product:", savedProduct);
      }

      if (imageFile) {
        await uploadProductImage(savedProduct.product_id, imageFile, token);
      }

      setModal(false);
      setIsEdit(false);
      setNewProduct({
        product_id: "",
        product_name: "",
        category: "",
        price: "",
        availability_status: "",
        image: "",
        preview: "",
      });
      setImageFile(null);

      load();
    } catch (err) {
      console.error("Error saving product:", err);
    }
};


  // Delete
  const confirmDelete = async () => {
    try {
      await deleteProduct(deleteId, token);
      setShowDelete(false);
      setDeleteId(null);
      load();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Edit
  const startEdit = (p) => {
    setNewProduct({
      ...p,
      preview: "",
    });
    setSelectedId(p.product_id);
    setIsEdit(true);
    setModal(true);
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

              // Generate new product_id
              const newId =
                products.length > 0
                  ? Math.max(...products.map((p) => p.product_id)) + 1
                  : 1;

              setNewProduct({
                product_id: newId,
                product_name: "",
                category: "",
                price: "",
                availability_status: "",
                image: "",
                preview: "",
              });
              setModal(true);
            }}
          >
            Add Product
          </button>
        </div>

        <ProductTable
          products={products}
          onEdit={startEdit}
          onDelete={(id) => {
            setDeleteId(id);
            setShowDelete(true);
          }}
        />
      </div>

      {modal && (
        <ProductForm
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          isEdit={isEdit}
          onSave={saveProduct}
          onUpload={handleUpload}
          onClose={() => setModal(false)}
        />
      )}

      {showDelete && (
        <div className="modal-overlay">
          <div className="modal delete-modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this product?</p>

            <div className="modal-actions">
              <button className="delete-btn" onClick={confirmDelete}>
                Yes
              </button>
              <button className="cancel-btn" onClick={() => setShowDelete(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
