import axios from "axios";
const API = "http://localhost:8080";

export const createCustomer = async (customer, token) => {
  return axios.post(`${API}/customers`, customer, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getCustomers = async (token) => {
  return axios.get(`${API}/customers`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getCustomerById = async (id, token) => {
  return axios.get(`${API}/customers/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updateCustomer = async (id, data, token) => {
  return axios.put(`${API}/customers/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const deleteCustomer = async (id, token) => {
  return axios.delete(`${API}/customers/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
