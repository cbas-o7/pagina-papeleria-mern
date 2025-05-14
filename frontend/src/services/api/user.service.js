import axios from "axios";
const API_URL = `http://localhost:5000`;

export const signup = async (newUser) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, newUser);
    if (response.data.success) {
      const userData = response.data.data;
      if (userData.rol === "user") {
        localStorage.setItem("user", JSON.stringify(userData));
      }
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const getUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/login`, user);
    if (response.data.success) {
      const userData = response.data.data;
      if (userData.rol === "admin") {
        sessionStorage.setItem("admin", JSON.stringify(userData));
      } else {
        localStorage.setItem("user", JSON.stringify(userData));
      }
      return userData;
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};
