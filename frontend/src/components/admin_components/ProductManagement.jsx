"use client"

import { useState } from "react"
import CategoryManagement from "./CategoryManagement"
import ProductList from "./ProductList"
import ProductForm from "./ProductForm"
import { deleteProduct } from "../../services/api"
import { useProducts } from "../../hooks/useProducts"


export default function ProductManagement() {
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const { products, categories: originalCategories, fetchProducts } = useProducts()
  //fetchProducts()
  const categories = originalCategories.filter(category => category.name !== "All")
    //.map(category => category.name)

  //console.log(categories)

  //console.log(categories)

  const handleAddProduct = () => {
    fetchProducts()
    setEditingProduct(null)
    setShowProductForm(true)
  }

  const handleEditProduct = (product) => {
    fetchProducts()
    setEditingProduct(product)
    setShowProductForm(true)
  }

  const handleProductFormClose = () => {
    setShowProductForm(false)
    setEditingProduct(null)
  }

  const handleDeleteProduct = (productId) => {
    //fetchProducts()
    //console.log(`Deleting product with id: ${productId}`)

    deleteProduct(productId)
  }

  return (
    <div className="container-fluid px-0">
      <div className="row g-4">
        <div className="col-lg-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h3 className="card-title mb-4">Categories</h3>
              <CategoryManagement fetchCategories={fetchProducts}/>
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="card-title m-0">Products</h3>
                <button className="btn btn-primary" onClick={handleAddProduct}>
                  <i className="bi bi-plus-lg me-2"></i>Add New Product
                </button>
              </div>
              <ProductList onEditProduct={handleEditProduct} onDeleteProduct={handleDeleteProduct} initialProducts={products} />
            </div>
          </div>
        </div>
      </div>
      {showProductForm && <ProductForm product={editingProduct} onClose={handleProductFormClose} initialCategories={categories} />}
    </div>
  )
}

