"use client"

import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react"

const initialCategories = ["Notebooks", "Writing Instruments", "Organizers", "Art Supplies"]

export default function CategoryManagement() {
    const [categories, setCategories] = useState(initialCategories)
    const [newCategory, setNewCategory] = useState("")
    const [editingCategory, setEditingCategory] = useState(null)

    const handleAddCategory = (e) => {
        e.preventDefault()
        if (newCategory.trim()) {
            setCategories([...categories, newCategory.trim()])
            setNewCategory("")
        }
    }

    const handleEditCategory = (index, newName) => {
        const updatedCategories = [...categories]
        updatedCategories[index] = newName
        setCategories(updatedCategories)
        setEditingCategory(null)
    }

    const handleDeleteCategory = (index) => {
        const updatedCategories = categories.filter((_, i) => i !== index)
        setCategories(updatedCategories)
    }

    return (
        <div>
            <h3 className="mb-3">Categories</h3>
            <ul className="list-group mb-3">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="category-item mb-2 p-2 bg-light rounded d-flex justify-content-between align-items-center"
                    >
                        {editingCategory === index ? (
                            <input
                                type="text"
                                className="form-control form-control-sm me-2"
                                value={category}
                                onChange={(e) => handleEditCategory(index, e.target.value)}
                                onBlur={() => setEditingCategory(null)}
                                autoFocus
                            />
                        ) : (
                            <span>{category}</span>
                        )}
                        <div>
                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => setEditingCategory(index)}>
                                <FaEdit />
                            </button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteCategory(index)}>
                                <FaRegTrashAlt />
                            </button>
                        </div>
                    </div>
                ))}
            </ul>
            <form onSubmit={handleAddCategory}>
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

