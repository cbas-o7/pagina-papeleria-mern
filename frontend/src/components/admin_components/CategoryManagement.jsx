"use client"

import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react"
import useAdminCategories from "../../hooks/useAdminCategories";


//const initialCategories = ["Notebooks", "Writing Instruments", "Organizers", "Art Supplies"]

export default function CategoryManagement({ fetchCategories }) {
    const { categories, handleAddCategory, handleEditCategory, handleDeleteCategory } = useAdminCategories();

    const [newCategory, setNewCategory] = useState("")
    const [editingCategory, setEditingCategory] = useState(null)
    const [editedValues, setEditedValues] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newCategory.trim()) {
            fetchCategories()
            await handleAddCategory(newCategory.trim());
            setNewCategory("");
        }
    };

    return (
        <div>
            <h3 className="mb-3">Categories</h3>
            {categories.length === 0 ? (
                <p>No categories found.</p>
            ) : (
                <ul className="list-group mb-3">
                    {categories.map((category) => (
                        <div
                            key={category._id}
                            className="category-item mb-2 p-2 bg-light rounded d-flex justify-content-between align-items-center"
                        >
                            {editingCategory === category._id ? (
                                <input
                                    type="text"
                                    className="form-control form-control-sm me-2"
                                    value={editedValues[category._id] || category.name}
                                    onChange={(e) => setEditedValues({ ...editedValues, [category._id]: e.target.value })}
                                    onBlur={() => {
                                        handleEditCategory(category._id, editedValues[category._id] || category.name);
                                        setEditingCategory(null);
                                        setEditedValues((prev) => ({ ...prev, [category._id]: "" })); 
                                    }}
                                    autoFocus
                                />
                            ) : (
                                <span>{category.name}</span>
                            )}
                            <div className="d-flex flex-row-reverse">
                                <button className="btn btn-sm btn-outline-danger me-1" onClick={() => handleDeleteCategory(category._id)}>
                                    <FaRegTrashAlt />
                                </button>
                                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => setEditingCategory(category._id)}>
                                    <FaEdit />
                                </button>
                            </div>
                        </div>
                    ))}
                </ul>
            )}
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="New category name"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <button type="submit" className="btn btn-outline-primary">
                        Add
                    </button>
                </div>
            </form>
        </div>
    )
}

