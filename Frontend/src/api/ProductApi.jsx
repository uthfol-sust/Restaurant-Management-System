// src/api/productApi.js
import axios from "axios";

const API = "http://localhost:8080";

export const getProducts = async (token) => {
  return axios.get(`${API}/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createProduct = async (product, token) => {
  return axios.post(`${API}/products`, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateProduct = async (id, product, token) => {
  return axios.put(`${API}/products/${id}`, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteProduct = async (id, token) => {
  console.log(id)
  return axios.delete(`${API}/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
