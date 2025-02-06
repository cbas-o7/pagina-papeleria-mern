import { useState, useEffect } from "react";
import { getCategories, addCategory, deleteCategory, updateCategory } from "../services/api";


export default function useAdminCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let data = await getCategories();
        data = data.filter(category => category.name !== "All")
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

  const handleEditCategory = async (categoryId, newName) => {
    try {
      await updateCategory(categoryId, newName);
      setCategories(
        categories.map((cat) => (cat._id === categoryId ? { ...cat, name: newName } : cat))
      );
    } catch (err) {
      console.error("Error updating category:", err.message);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      setCategories(categories.filter((cat) => cat._id !== categoryId));
    } catch (err) {
      console.error("Error deleting category:", err.message);
    }
  };

  return { categories, handleAddCategory, handleEditCategory, handleDeleteCategory };
}
