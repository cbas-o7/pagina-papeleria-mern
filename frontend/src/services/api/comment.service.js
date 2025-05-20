import axios from "axios";
const API_URL = `http://localhost:5000`;

export const getComments = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/comments/${productId}`);
    return response.data.comments;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
}

export const addOrUpdateComment= async(commentData) => {
  // Desestructuración de los datos del comentario
  const { productId, userId, author, content, rating } = commentData;
  const data = {
    productId,
    userId,
    author,
    content,
    rating
  };

  return axios.post(`${API_URL}/comments`, data)
    .then(response => {response.data
        return response.data}
    )
    .catch(error => {
      throw new Error(error.response?.data?.message || "Error en la solicitud");
    });
}
