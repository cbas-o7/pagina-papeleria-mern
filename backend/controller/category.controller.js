import Category from "../models/category.js";
import Product from "../models/product.js";

export const addCategory = async (req, res) => {
    try {
        const newCategory = new Category({ name: req.body.name });
        await newCategory.save();
        res.json(newCategory);
    } catch (err) {
        res.status(500).json({ message: "Error adding category" });
    }
};

export const editCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        const oldCategoryName = category.name;

        // Actualizar el nombre de la categoría
        const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });

        // Actualizar los productos que tengan esta categoría
        await Product.updateMany({ category: oldCategoryName }, { category: name });

        //const updatedCategory = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
        res.json({ success: true, updatedCategory, message: "Categoría y productos actualizados correctamente." });
    } catch (err) {
        res.status(500).json({ message: "Error updating category" });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        // Buscar la categoría en la base de datos por su ID
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        // Buscar productos con la categoría por nombre
        const productsInCategory = await Product.find({ category: category.name });

        if (productsInCategory.length > 0) {
            return res.status(400).json({ message: "No se puede eliminar esta categoría porque hay productos asociados." });
        }

        // Eliminar la categoría
        await Category.findByIdAndDelete(categoryId);

        res.json({ message: "Categoría eliminada correctamente." });
    } catch (err) {
        res.status(500).json({ message: "Error deleting category" });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: "Error fetching categories" });
    }
};
