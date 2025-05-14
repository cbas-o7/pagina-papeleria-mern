import { useEffect, useState } from "react";
import { getProducts } from "../../services/api/product.service";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      //console.log("el pepe")
      setProducts(data.products);
      setCategories(data.categories);
    } catch (err) {
      console.error(err.message); 
    }
  };


  useEffect(() => {

    fetchProducts();

    
  }, []);

  

  return { products, categories, fetchProducts }; // Retornamos solo los productos
};
