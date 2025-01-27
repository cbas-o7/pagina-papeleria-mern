//"use client"

import { Link } from "react-router-dom"
import { useState } from "react"
import ProductCard from "./ProductCard"

const img = 'https://flowbite.com/docs/images/examples/image-1@2x.jpg'

const categories = [
  "All",
  "Notebooks",
  "Writing Instruments",
  "Organizers",
  "Art Supplies",
  "Desk Accessories",
  "Backpacks",
]

const products = [
  {
    id: 1,
    name: "Luxury Notebook",
    price: "$24.99",
    image: img,
    category: "Notebooks",
  },
  {
    id: 2,
    name: "Fountain Pen Set",
    price: "$49.99",
    image: img,
    category: "Writing Instruments",
  },
  {
    id: 3,
    name: "Leather Planner",
    price: "$34.99",
    image: img,
    category: "Organizers",
  },
  {
    id: 4,
    name: "Colored Pencil Set",
    price: "$19.99",
    image: img,
    category: "Art Supplies",
  },
  {
    id: 5,
    name: "Desk Organizer",
    price: "$29.99",
    image: img,
    category: "Desk Accessories",
  },
  {
    id: 6,
    name: "Canvas Backpack",
    price: "$39.99",
    image: img,
    category: "Backpacks",
  },
]

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All")

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
              <Link to={`/products/${product.id}`} key={product.id} style={{ textDecoration: "none", color: "inherit" }}>
                <ProductCard product={product} />
              </Link>

            ))}

          </div>
        </div>


      </div>
    </div>
  )
}

