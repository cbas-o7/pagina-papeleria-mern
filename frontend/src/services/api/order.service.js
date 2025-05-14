import axios from "axios";
const API_URL = `http://localhost:5000`;

export const getOrdersByUserId = async (userId) => {
  try {
    const response = await axios.post(`${API_URL}/account`, { userId });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const getPendingOrdersByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/orders/pending`, { params: { userId } });
    return response.data.data || [];
  } catch (error) {
    return [];
  }
};

export const cancelOrder = async (orderId) => {
  try {
    const response = await axios.delete(`${API_URL}/orders/cancel/${orderId}`, { orderId });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};
