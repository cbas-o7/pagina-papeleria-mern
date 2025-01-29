import { useState, useEffect } from "react";
import { getRandomProducts } from "../services/api";

// Custom hook para manejar productos aleatorios
export const useRandomProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getRandomProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error al obtener productos: ", err);
      }
    };

    fetchProducts();
  }, []);

  return products;
};