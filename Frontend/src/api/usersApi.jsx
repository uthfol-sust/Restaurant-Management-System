import axios from "axios";

const API = "http://localhost:8080";

export const getStaffs = async (token) => {
  return axios.get(`${API}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getStaffById = async (id, token) => {
  return axios.get(`${API}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getStaffByEmail = async (email, token) => {
  return axios.get(`${API}/users/email/${email}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


export const updateStaff = async (id, data, token) => {
  return axios.put(`${API}/users/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


export const uploadStaffProfile = async (id, file, token) => {
  const formData = new FormData();
  formData.append("profile", file);

  return axios.put(`${API}/users/upload/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteStaff = async (id, token) => {
  return axios.delete(`${API}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
