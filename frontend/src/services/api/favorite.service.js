import axios from "axios";
const API_URL = `http://localhost:5000`;

export const getFavoritesByUser = async (userId) => {
  try {
    const response = await axios.post(`${API_URL}/favorites`, { userId });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const addFavorite = async (productId, userId) => {
  try {
    await axios.post(`${API_URL}/favorites/add`, { userId, productId });
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const removeFavorite = async (userId, productId) => {
  try {
    await axios.patch(`${API_URL}/favorites/remove`, { userId, productId });
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};
