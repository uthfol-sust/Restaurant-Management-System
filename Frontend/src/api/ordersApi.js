import axios from "axios";

const API = "http://localhost:8080";

export const createOrder = async (order, token) => {
  return axios.post(`${API}/orders`, order, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getOrders = async (token) => {
  return axios.get(`${API}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getOrderById = async (id, token) => {
  return axios.get(`${API}/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateOrder = async (id, order, token) => {
  return axios.put(`${API}/orders/${id}`, order, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteOrder = async (id, token) => {
  return axios.delete(`${API}/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
