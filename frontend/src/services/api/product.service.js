import axios from "axios";
const API_URL = `http://localhost:5000`;

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const getRandomProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const getProductByID = async ({ id }) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const addProduct = async (product) => {
  try {
    const response = await axios.post(`${API_URL}/product/add`, product, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const updateProduct = async (id, formData) => {
  try {
    const response = await axios.post(`${API_URL}/product/add/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const deleteProduct = async (id, fetchProducts) => {
  try {
    const response = await axios.post(`${API_URL}/product/delete/${id}`);
    if (fetchProducts) fetchProducts();
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};
