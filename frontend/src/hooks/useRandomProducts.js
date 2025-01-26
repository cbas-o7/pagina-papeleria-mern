import { useState, useEffect } from "react";

// Custom hook para manejar productos aleatorios
export const useRandomProducts = (products, itemsPerPage = 6) => {
  const [randomProducts, setRandomProducts] = useState([]);

  // Función para seleccionar productos aleatorios
  const getRandomProducts = () => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, itemsPerPage);
  };

  useEffect(() => {
    setRandomProducts(getRandomProducts());
  }, [products, itemsPerPage]);

  return randomProducts;
};