import React from 'react'
import { useNavigate } from 'react-router-dom'

const CategoriesHome = ({
    categories,
    onNextPage,
    onPreviousPage,
    hasNextPage,
    hasPreviousPage,
}) => {

    const navigate = useNavigate()

    const categoryClicked = (category) => {
        navigate(`/products?category=${encodeURIComponent(category)}`);
    }


    return (
        <section className="py-5">
            <div className="container">
                <h2 className="text-center mb-4">Categorias</h2>
                <div className="row row-cols-2 row-cols-sm-3 row-cols-md-6 g-3">
                    {categories.map((category, index) => (
                        <div key={index} className="col">
                            <div className="card h-100 text-center">
                                <button className="card-body btn btn-outline-secondary d-flex justify-content-center align-items-center"
                                    onClick={(event) => {
                                        event.preventDefault()
                                        categoryClicked(category.name)
                                    }}
                                >
                                    <h3 className="card-title h5 mb-0">{category.name}</h3>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Botones de navegación */}
                <div className="d-flex justify-content-between mt-4">
                    <button
                        className="btn btn-outline-primary"
                        onClick={onPreviousPage}
                        disabled={!hasPreviousPage}
                    >
                        Anterior
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={onNextPage}
                        disabled={!hasNextPage}
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </section>
    )
}

export default CategoriesHome