import axios from "axios";

const API = "http://localhost:8080";

export const getSuppliers = async (token) => {
  return axios.get(`${API}/suppliers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSupplierById = async (id, token) => {
  return axios.get(`${API}/suppliers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createSupplier = async (supplier, token) => {
  return axios.post(`${API}/suppliers`, supplier, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateSupplier = async (id, supplier, token) => {
  return axios.put(`${API}/suppliers/${id}`, supplier, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteSupplier = async (id, token) => {
  return axios.delete(`${API}/suppliers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
