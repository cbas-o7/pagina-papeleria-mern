import React from 'react'
import ProductCard from './ProductCard'

const ProductsHome = ({products}) => {


    return (
        <section className="py-5 bg-light">
            <div className="container">
                <h2 className="text-center mb-5">Featured Products</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">

                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}

                </div>

                {/* Botón "Ver todos los productos" */}
                <div className="d-flex justify-content-center mt-4 w-100">
                    <button className="btn btn-dark">
                        Ver todos los productos
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ProductsHome