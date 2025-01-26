import React from 'react'

const ProductsHome = ({products}) => {


    return (
        <section className="py-5 bg-light">
            <div className="container">
                <h2 className="text-center mb-5">Featured Products</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                    {products.map((product, index) => (
                        <div key={index} className="col">
                            <div className="card h-100">
                                <img src={product.image || "/placeholder.svg"} className="card-img-top" alt={product.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.price}</p>
                                    <p className="card-text">
                                        <small className="text-muted">{product.category}</small>
                                    </p>
                                    <button className="btn btn-outline-dark w-100">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Botón "Ver todos los productos" */}
                <div className="d-flex justify-content-center mt-4">
                    <button className="btn btn-primary">
                        Ver todos los productos
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ProductsHome