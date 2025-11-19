import axios from "axios";

const API_URL = "http://localhost:8080/inventories";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); 
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};


export const getInventories = async () => {
  try {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
  } catch (err) {
    console.error("Error fetching inventories:", err);
    throw err;
  }
};


export const getInventoryByID = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (err) {
    console.error(`Error fetching inventory ID ${id}:`, err);
    throw err;
  }
};

export const createInventory = async (item) => {
  try {
    const response = await axios.post(API_URL, item, getAuthHeaders());
    return response.data;
  } catch (err) {
    console.error("Error creating inventory:", err);
    throw err;
  }
};

// ---------- UPDATE INVENTORY ----------
export const updateInventory = async (id, item) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, item, getAuthHeaders());
    return response.data;
  } catch (err) {
    console.error(`Error updating inventory ID ${id}:`, err);
    throw err;
  }
};

// ---------- DELETE INVENTORY ----------
export const deleteInventory = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (err) {
    console.error(`Error deleting inventory ID ${id}:`, err);
    throw err;
  }
};
