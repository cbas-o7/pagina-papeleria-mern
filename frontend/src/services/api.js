import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = `http://localhost:5000`

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

    console.log('Usuario autenticado:', response.data);
    // Guardar datos del usuario en localStorage o context (opcional)
    localStorage.setItem('user', JSON.stringify(response.data.data));

    return response.data; // Retorna la respuesta del servidor
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en la solicitud");
  }
};

export const getProduct = async () => {
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