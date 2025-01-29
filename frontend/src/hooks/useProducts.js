import { useEffect, useState } from "react";
import { getProducts } from "../services/api"; // Asegúrate de que la ruta sea correcta

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data.products);
        setCategories(data.categories);
      } catch (err) {
        console.error(err.message); // Si hay error, se muestra en consola
      }
    };

    fetchProducts();
  }, []);

  return { products, categories }; // Retornamos solo los productos
};
