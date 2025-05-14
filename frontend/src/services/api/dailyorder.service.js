import axios from "axios";
const API_URL = `http://localhost:5000`;

export const getDailyOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/dailyorders`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al obtener órdenes diarias");
  }
};

export const updateOrderStatus = async (orderId, estado) => {
  try {
    const response = await axios.put(`${API_URL}/dailyorders/${orderId}`, { estado });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al actualizar el estado");
  }
};

export const deleteAllDailyOrders = async () => {
  try {
    const response = await axios.delete(`${API_URL}/dailyOrders/deleteAll`);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al actualizar el estado");
  }
};
