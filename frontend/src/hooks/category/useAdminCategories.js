import { useState, useEffect } from "react";
import { getCategories, addCategory, deleteCategory, updateCategory } from "../../services/api/category.service";


export default function useAdminCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let data = await getCategories();
        data = data.filter(category => category.name !== "Todos")
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err.message);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async (categoryName) => {

    try {
      const newCategory = await addCategory(categoryName);
      setCategories([...categories, newCategory]);
    } catch (err) {
      console.error("Error adding category:", err.message);
    }
  }

  const handleEditCategory = async (categoryId, newName, fetchCategories) => {
    try {
      await updateCategory(categoryId, newName);
      setCategories(
        categories.map((cat) => (cat._id === categoryId ? { ...cat, name: newName } : cat))
      );
      fetchCategories()
    } catch (err) {
      console.error("Error updating category:", err.message);
    }
  };

  const handleDeleteCategory = async (categoryId, categoryName, showPopup) => {
    try {
      await deleteCategory(categoryId);
      setCategories(categories.filter((cat) => cat._id !== categoryId));
    } catch (err) {
      if (err.response && err.response.status === 400) {
        showPopup(`No puedes eliminar la categoría "${categoryName}" porque tiene productos asociados. Por favor, borre los productos con esta categoría antes de eliminarla.`);
      } else {
        console.error("Error deleting category:", err.message);
      }
    }
  };

  return { categories, handleAddCategory, handleEditCategory, handleDeleteCategory };
}
