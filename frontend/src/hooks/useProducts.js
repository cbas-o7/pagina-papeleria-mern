import { useEffect, useState } from "react";
import { getProduct } from "../services/api"; // Asegúrate de que la ruta sea correcta

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProduct();
        setProducts(data); // Almacenar los productos
      } catch (err) {
        console.error(err.message); // Si hay error, se muestra en consola
      }
    };

    fetchProducts();
  }, []);

  return { products }; // Retornamos solo los productos
};
