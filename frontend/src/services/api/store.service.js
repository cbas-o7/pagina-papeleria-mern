import axios from "axios";
const API_URL = `http://localhost:5000`;

export const saveStoreHours = async (workingHours) => {
  try {
    const response = await axios.post(`${API_URL}/storeHours`, { workingHours });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al actualizar el estado");
  }
};

export const getStoreHours = async () => {
  try {
    const response = await axios.get(`${API_URL}/storeHours`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al actualizar el estado");
  }
};
