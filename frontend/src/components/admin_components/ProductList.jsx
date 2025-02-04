const img = "https://flowbite.com/docs/images/examples/image-1@2x.jpg"

const initialProducts = [
    { id: 1, name: "Luxury Notebook", price: 24.99, category: "Notebooks", image: img },
    { id: 2, name: "Fountain Pen Set", price: 49.99, category: "Writing Instruments", image: img },
]

export default function ProductList({ onEditProduct, onDeleteProduct }) {
    return (
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
        {initialProducts.map((product) => (
          <div key={product.id} className="col">
            <div className="card h-100 shadow-sm hover-shadow transition-shadow">
              <div className="position-relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="card-img-top object-fit-cover"
                  style={{ height: "200px" }}
                />
                <span className="position-absolute top-0 end-0 badge bg-primary m-2">{product.category}</span>
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text flex-grow-1">{product.description}</p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="fs-5 fw-bold text-primary">${product.price.toFixed(2)}</span>
                  <div>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEditProduct(product)}>
                      <i className="bi bi-pencil me-1"></i>Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDeleteProduct(product.id)}>
                      <i className="bi bi-trash me-1"></i>Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  