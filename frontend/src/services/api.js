import { useEffect, useState } from "react";
import axios from "axios";
// API_URL Desarrollo
const API_URL = `http://localhost:5000`

// API_URL Producccion 
//const API_URL = "https://8xzt8k3b-5000.usw3.devtunnels.ms"

export const signup = async (newUser) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, newUser);
    return response.data; // Retorna la respuesta del servidor
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const getUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/login`, user);

    
    if (response.data.success) {
      const userData = response.data.data;
      console.log('Usuario autenticado:', userData);
      // Si el usuario es normal, guardamos sus datos en localStorage
      if (userData.role === "user") {
        localStorage.setItem("user", JSON.stringify(userData));
      }

      // Verifica si el usuario es admin o no
      if (userData.role === "admin") {
        sessionStorage.setItem("admin", JSON.stringify(userData)); // Guarda solo en sessionStorage
      } else {
        localStorage.setItem("user", JSON.stringify(userData)); // Guarda solo en localStorage si es user
      }

      return userData; // Retornamos los datos del usuario
    }

  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);

    return response.data.data; // Retorna solo los productos
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const getRandomProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data.data; // Retorna solo los productos
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const getProductByID = async ({ id }) => {
  try {
    //console.log(`${API_URL}/products/${id}`)

    const response = await axios.get(`${API_URL}/products/${id}`);
    //console.log(response.data.data)
    return response.data.data; // Retorna solo los productos
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const getOrdersByUserId = async (userId) => {
  try {
    const response = await axios.post(`${API_URL}/account`, { userId });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const getFavoritesByUser = async (userId) => {
  try {
    //console.log(userId)
    const response = await axios.post(`${API_URL}/favorites`, { userId });
    //
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const addFavorite = async (productId, userId) => {
  try {
    //console.log(userId)
    await axios.post(`${API_URL}/favorites/add`, { userId, productId });
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const removeFavorite = async (userId, productId) => {
  try {
    //console.log(userId, productId)
    await axios.post(`${API_URL}/favorites/remove`, { userId, productId });
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};


export const getCartByUserId = async (userId) => {
  try {
    const response = await axios.post(`${API_URL}/cart`, { userId });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const updateCartQuantity = async (userId, productId, quantity) => {
  try {
    const response = await axios.patch(`${API_URL}/cart/update`, {
      userId,
      productId,
      quantity,
    });
    return response.data.cart; // Devolvemos el carrito actualizado
  } catch (error) {
    console.error("Error al actualizar el carrito:", error);
    return null;
  }
};

export const addToCart = async (userId, productId, price, name, image) => {
  const numericPrice = parseFloat(price.replace('$', ''));

  try {
    const response = await axios.post(`${API_URL}/cart/add`, {
      userId,
      productId,
      price: numericPrice,
      name,
      image,
    });
    return response.data.cart;
  } catch (error) {
    console.error("Error al agregar al carrito:", error);
    return null;
  }
};
