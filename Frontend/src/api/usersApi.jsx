import axios from "axios";

const API = "http://localhost:8080";

export const getStaffs = async (token) => {
  return axios.get(`${API}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};