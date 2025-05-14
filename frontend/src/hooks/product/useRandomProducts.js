import { useState, useEffect } from "react";
import { getRandomProducts } from "../../services/api/product.service";

// Custom hook para manejar productos aleatorios
export const useRandomProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getRandomProducts();
        setProducts(data.products);
        setCategories(data.categories);
      } catch (err) {
        console.error("Error al obtener productos: ", err);
      }
    };

    fetchProducts();
  }, []);

  return {products, categories};
};