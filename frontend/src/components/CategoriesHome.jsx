import React from 'react'

const CategoriesHome = ({
    categories,
    onNextPage,
    onPreviousPage,
    hasNextPage,
    hasPreviousPage,
}) => {
    return (
        <section className="py-5">
            <div className="container">
                <h2 className="text-center mb-4">Categorias</h2>
                <div className="row row-cols-2 row-cols-sm-3 row-cols-md-6 g-3">
                    {categories.map((category, index) => (
                        <div key={index} className="col">
                            <div className="card h-100 text-center">
                                <div className="card-body d-flex justify-content-center align-items-center">
                                    <h3 className="card-title h5 mb-0">{category.name}</h3>
                                </div>
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