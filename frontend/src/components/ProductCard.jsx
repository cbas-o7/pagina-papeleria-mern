
import { IoHeartOutline  } from 'react-icons/io5';

export default function ProductCard({ product }) {
    return (
        <div key={product.id} className="col">
            <div className="card h-100 shadow-sm">
                <div className="position-relative">
                    <img src={product.image || "/placeholder.svg"} alt={product.name} className="card-img-top" />
                    <button className="btn btn-sm btn-outline-secondary position-absolute top-0 end-0 m-2">
                        <IoHeartOutline  />
                    </button>
                </div>
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

    )
}