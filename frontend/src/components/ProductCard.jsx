import { FaHeart, FaRegHeart } from "react-icons/fa";
//import { useHistory } from "react-router-dom";
import useFavorites from '../hooks/useFavorites';
import { IconContext } from "react-icons/lib";


export default function ProductCard({ product, userId }) {
    //console.log(userId)

    const { toggleFavorite, isProductFavorite } = useFavorites(userId);
    const isFavorite = isProductFavorite(product._id);

    const handleFavoriteToggle = () => {
        //console.log(userId, product._id)
        toggleFavorite(userId, product._id);
    };


    return (
        <div className="col">
            <div className="card h-100 shadow-sm">
                <div className="position-relative">
                    <img src={product.image || "/placeholder.svg"} alt={product.name} className="card-img-top" />
                    <button
                        className="btn btn-sm btn-outline-secondary position-absolute top-0 end-0 m-2"
                        onClick={(event) => {
                            event.preventDefault()
                            toggleFavorite(userId, product._id)
                        }}
                    >
                        <IconContext.Provider value={{ className: isFavorite ? "text-white opacity-75 fs-5" : "text-secondary opacity-50 fs-5" }}>
                            {isFavorite ? <FaHeart /> : <FaRegHeart />}
                        </IconContext.Provider>
                    </button>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.price}</p>
                    <p className="card-text">
                        <small className="text-muted">{product.category}</small>
                    </p>
                    <button className="btn btn-outline-dark w-100"
                        onClick={(event) => {
                            event.preventDefault()
                        }}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>

    )
}