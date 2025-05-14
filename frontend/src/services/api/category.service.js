import axios from "axios";
const API_URL = `http://localhost:5000`;

export const addCategory = async (categoryName) => {
  const response = await axios.post(`${API_URL}/category/add`, { name: categoryName });
  return response.data;
};

export const updateCategory = async (categoryId, newName) => {
  await axios.put(`${API_URL}/category/edit/${categoryId}`, { name: newName });
};

export const deleteCategory = async (categoryId) => {
  await axios.delete(`${API_URL}/category/delete/${categoryId}`);
};

export const getCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
};
