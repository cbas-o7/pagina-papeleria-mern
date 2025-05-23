"use client"

import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"
import { useProducts } from "../../hooks/product/useProducts"
import { useAuth } from "../../context/AuthContext"

export default function Products({openLogin, chosenCategory}) {
  const [selectedCategory, setSelectedCategory] = useState(chosenCategory)
  const { products, categories } = useProducts()
  const { user } = useAuth();
  const userId = user ? user._id : "";

  if (userId == "") {
    console.log('No se encontró el usuario en localStorage. //ACCOUNT AND ORDERS')
  }

  const filteredProducts =
    selectedCategory === "Todos" ? products : products.filter((product) => product.category === selectedCategory)

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Nuestros Productos</h1>
      <div className="row">

        {/* Apartado de eleccion de categoria */}
        <div className="col-md-3 mb-4 z-0">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">Categorias</h5>
              <div className="list-group">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className={`list-group-item list-group-item-light  ${selectedCategory === category.name ? "active" : ""
                      }`}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Apartado donde se despliegan los productos */}
        <div className="col-md-9 z-0">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">

            {/* Crea las tarjetas del producto llamando al componente ProductCard */}
            {filteredProducts.map((product) => (
              <Link to={`/products/${product._id}`} key={product._id} style={{ textDecoration: "none", color: "inherit" }}>
                <ProductCard product={product} userId={userId} openLogin={openLogin}/>
              </Link>
            ))}

          </div>
        </div>

      </div>
    </div>
  )
}

