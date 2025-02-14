"use client"

import { useState } from "react"
import CategoryManagement from "./CategoryManagement"
import ProductList from "./ProductList"
import ProductForm from "./ProductForm"
import { deleteProduct } from "../../services/api"
import { useProducts } from "../../hooks/useProducts"
import { IoIosAddCircleOutline } from "react-icons/io";
import { IconContext } from "react-icons/lib";


export default function ProductManagement() {
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const { products, categories: originalCategories, fetchProducts } = useProducts()
  //fetchProducts()
  //const categories = originalCategories.filter(category => category.name !== "All")
  //.map(category => category.name)

  //console.log(categories)

  //console.log(categories)

  const handleAddProduct = () => {
    setEditingProduct(null)
    setShowProductForm(true)
  }

  const handleEditProduct = (product) => {
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

    deleteProduct(productId, fetchProducts)

  }

  return (
    <div className="container-fluid px-0">
      <div className="row g-4">
        <div className="col-lg-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h3 className="card-title mb-4">Categorias</h3>
              <CategoryManagement fetchCategories={fetchProducts} />
            </div>
          </div>
        </div>
        <div className="col-lg-9 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="card-title m-0">Productos</h3>
                <button className="btn btn-primary d-flex align-items-center" onClick={handleAddProduct}>
                  <IconContext.Provider value={{ className: "text-white opacity-75 fs-4 me-1" }}>
                    <IoIosAddCircleOutline />
                  </IconContext.Provider>
                  Agregar Producto
                </button>
              </div>
              <ProductList onEditProduct={handleEditProduct} onDeleteProduct={handleDeleteProduct} initialProducts={products} />
            </div>
          </div>
        </div>
      </div>
      {showProductForm && <ProductForm product={editingProduct} onClose={handleProductFormClose} fetchProducts={fetchProducts} />}
    </div>
  )
}

