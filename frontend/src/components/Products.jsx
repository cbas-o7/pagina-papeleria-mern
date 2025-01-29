//"use client"

import { Link } from "react-router-dom"
import { useState } from "react"
import ProductCard from "./ProductCard"
import { useProducts } from "../hooks/useProducts"


const categories = [
  "All",
  "Notebooks",
  "Writing Instruments",
  "Organizers",
  "Art Supplies",
  "Desk Accessories",
  "Backpacks",
]



export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const {products} = useProducts()

  console.log(products)

  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((product) => product.category === selectedCategory)

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Our Collection</h1>
      <div className="row">

        {/* Apartado de eleccion de categoria */}
        <div className="col-md-3 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">Categories</h5>
              <div className="list-group">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`list-group-item list-group-item-light  ${selectedCategory === category ? "active" : ""
                      }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>


        {/* Apartado donde se despliegan los productos */}
        <div className="col-md-9">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">

            {/* Crea las tarjetas del producto llamando al componente ProductCard */}
            {filteredProducts.map((product) => (
              <Link to={`/products/${product._id}`} key={product._id} style={{ textDecoration: "none", color: "inherit" }}>
                <ProductCard product={product} />
              </Link>

            ))}

          </div>
        </div>


      </div>
    </div>
  )
}

