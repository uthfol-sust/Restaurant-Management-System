// src/api/uploadApi.js
import axios from "axios";

const API = "http://localhost:8080";

export const uploadProductImage = async (id, file, token) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("product_id",id)

  return axios.put(`${API}/products/upload/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
