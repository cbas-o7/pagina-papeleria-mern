"use client"

import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"
import { useProducts } from "../../hooks/product/useProducts"
import { useAuth } from "../../context/AuthContext"

export default function Products({ openLogin, chosenCategory }) {
  const [selectedCategory, setSelectedCategory] = useState(chosenCategory)
  const [priceFilter, setPriceFilter] = useState("")
  const [ratingFilter, setRatingFilter] = useState("")

  const { products, categories } = useProducts()
  const { user } = useAuth();
  const userId = user ? user._id : "";

  if (userId == "") {
    console.log('No se encontró el usuario en localStorage. //ACCOUNT AND ORDERS')
  }

  const getFilteredAndSortedProducts = () => {
    let filteredProducts = selectedCategory === "Todos" ? products : products.filter((product) => product.category === selectedCategory)

    if (ratingFilter === "4plus") {
      filteredProducts = filteredProducts.filter((product) => product.averageRating >= 4)
    } else if (ratingFilter === "3plus") {
      filteredProducts = filteredProducts.filter((product) => product.averageRating == 3)
    } else if (ratingFilter === "2plus") {
      filteredProducts = filteredProducts.filter((product) => product.averageRating <= 2)
    } 

    // aplica el filtro de precio
    if (priceFilter === "lowToHigh") {
      filteredProducts.sort(
        (a, b) => parseFloat(a.price.replace(/[^0-9.]/g, "")) - parseFloat(b.price.replace(/[^0-9.]/g, ""))
      );
    } else if (priceFilter === "highToLow") {
      filteredProducts.sort(
        (a, b) => parseFloat(b.price.replace(/[^0-9.]/g, "")) - parseFloat(a.price.replace(/[^0-9.]/g, ""))
      );

      // aplica el filtro de rating
    } else if (ratingFilter === "highToLow") {
      filteredProducts.sort((a, b) => b.averageRating - a.averageRating)
    } else if (ratingFilter === "lowToHigh") {
      filteredProducts.sort((a, b) => a.averageRating - b.averageRating)
    }

    return filteredProducts
  }

  const clearFilters = () => {
    setPriceFilter("")
    setRatingFilter("")
    setSelectedCategory("Todos")
  }

  const filteredProducts = getFilteredAndSortedProducts()

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Nuestros Productos</h1>


      {/* Seccion de filtros */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex flex-wrap gap-3 align-items-center">
            {/* filtro de precio */}
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Precio {priceFilter && <span className="badge bg-primary ms-1">•</span>}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className={`dropdown-item ${priceFilter === "lowToHigh" ? "active" : ""}`}
                    onClick={() => {
                      setPriceFilter("lowToHigh")
                      setRatingFilter("")
                    }}
                  >
                    Bajo a Alto
                  </button>
                </li>
                <li>
                  <button
                    className={`dropdown-item ${priceFilter === "highToLow" ? "active" : ""}`}
                    onClick={() => {
                      setPriceFilter("highToLow")
                      setRatingFilter("")
                    }}
                  >
                    Alto a Bajo
                  </button>
                </li>
              </ul>
            </div>

            {/* Filtro de rating */}
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Rating {ratingFilter && <span className="badge bg-primary ms-1">•</span>}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className={`dropdown-item ${ratingFilter === "highToLow" ? "active" : ""}`}
                    onClick={() => {
                      setRatingFilter("highToLow")
                      setPriceFilter("")
                    }}
                  >
                    Alto a Bajo
                  </button>
                </li>
                <li>
                  <button
                    className={`dropdown-item ${ratingFilter === "lowToHigh" ? "active" : ""}`}
                    onClick={() => {
                      setRatingFilter("lowToHigh")
                      setPriceFilter("")
                    }}
                  >
                    Bajo a Alto
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className={`dropdown-item ${ratingFilter === "4plus" ? "active" : ""}`}
                    onClick={() => {
                      setRatingFilter("4plus")
                      setPriceFilter("")
                    }}
                  >
                    4★ o mas
                  </button>
                </li>
                <li>
                  <button
                    className={`dropdown-item ${ratingFilter === "3plus" ? "active" : ""}`}
                    onClick={() => {
                      setRatingFilter("3plus")
                      setPriceFilter("")
                    }}
                  >
                    3★
                  </button>
                </li>
                <li>
                  <button
                    className={`dropdown-item ${ratingFilter === "2plus" ? "active" : ""}`}
                    onClick={() => {
                      setRatingFilter("2plus")
                      setPriceFilter("")
                    }}
                  >
                    2★ o menos
                  </button>
                </li>
              </ul>
            </div>

            {/* Limpiar Filtro */}
            {(priceFilter || ratingFilter) && (
              <button className="btn btn-outline-danger btn-sm" onClick={clearFilters}>
                Limpiar Filtros
              </button>
            )}

            {/* Resultados*/}
            <span className="text-muted ms-auto">
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""} encontrados
            </span>
          </div>
        </div>
      </div>


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
          {filteredProducts.length > 0 ? (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">

              {/* Crea las tarjetas del producto llamando al componente ProductCard */}
              {filteredProducts.map((product) => (
                <Link to={`/products/${product._id}`} key={product._id} style={{ textDecoration: "none", color: "inherit" }}>
                  <ProductCard product={product} userId={userId} openLogin={openLogin} />
                </Link>
              ))}

            </div>) : (
            <div className="text-center py-5">
              <h4 className="text-muted">No se encontraron productos</h4>
              <p className="text-muted">Selecciona otro distinto.</p>
              <button className="btn btn-primary" onClick={clearFilters}>
                Limpiar todos los filtros
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  )
}

