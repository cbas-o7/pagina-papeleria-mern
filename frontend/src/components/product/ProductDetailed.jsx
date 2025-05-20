import { useState } from 'react'
import { Star, StarHalf } from "lucide-react"
import { FaStar, FaRegStar } from "react-icons/fa";
import { useProduct } from '../../hooks/product/useProductById'
import { useComments } from '../../hooks/comment/useComment'
import useCart from '../../hooks/cart/useCart';
import { useAuth } from "../../context/AuthContext";

const initialComments = [
    { id: 1, author: "John Doe", content: "Great product! Highly recommended.", rating: 5 },
    { id: 2, author: "Jane Smith", content: "Good quality, but a bit pricey.", rating: 4 },
    { id: 3, author: "Mike Johnson", content: "Decent product, could be better.", rating: 3 },
]

function ProductDetailed({ id, openLogin }) {
    const product = useProduct({ id })
    //const [comments, setComments] = useState(initialComments)
    //const [newComment, setNewComment] = useState({ author: "", content: "", rating: 5 })

    //console.log(product)

    const { user } = useAuth();
    const userId = user ? user._id : "";

    const { addProductToCart } = useCart(userId, openLogin);
    const { comments, userComment, submitComment, handleChange, isCommentChanged } = useComments(id, userId);

    if (!product) {
        return <div className="container mt-5">Product not found</div>
    }

    const StarRating = ({ rating }) => {
        return (
            <div className="d-flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-warning">
                        {star <= rating ? <FaStar /> : <FaRegStar />}
                    </span>
                ))}
            </div>
        )
    }

    const averageRating = comments.length > 0
        ? (comments.map((comment) => comment.rating).reduce((sum, rating) => sum + rating, 0) / comments.length).toFixed(1)
        : 0

    console.log(averageRating)

    return (
        <div className="container pt-5">
            <div className="row mb-5">
                <div className="col-md-6">
                    <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="img-fluid rounded shadow"
                    />
                </div>
                <div className="col-md-6">
                    <h1 className="mb-3">{product.name}</h1>
                    <div className="d-flex align-items-center mb-3">
                        <StarRating rating={Math.round(averageRating)} />
                        <span className="ms-2 text-muted">({averageRating}/5)</span>
                    </div>
                    <p className="fs-3 text-primary mb-3">{product.price}</p>
                    <p className="mb-4">{product.description}</p>
                    <button className="btn btn-primary btn-lg"
                        onClick={(event) => {
                            event.preventDefault()
                            addProductToCart(product._id, product.price, product.name, product.image);
                        }}
                    >
                        Agregar al carrito
                    </button>

                </div>
            </div>


            <div className="mb-5">
                <h2 className="mb-4">Customer Reviews</h2>
                <div className="list-group mb-4">


                    {comments && comments.map((comment) => (

                        <div key={comment._id} className="list-group-item" >
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h5 className="mb-0">{comment.author}</h5>
                                <StarRating rating={comment.rating} />
                            </div>
                            <p className="mb-0">{comment.content}</p>
                            {comment.verifiedPurchase && (
                                <span className="badge bg-success">Compra verificada</span>
                            )}
                        </div>
                    ))}
                    {comments < 1 && <p className="text-center">No hay comentarios disponibles.</p>}
                </div>
            </div>
            <div>
                <h2 className="mb-4">Deja un comentario</h2>
                <form onSubmit={e => submitComment(e)}>
                    <div className="mb-3">
                        <label htmlFor="author" className="form-label">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="author"
                            className="form-control"
                            value={userComment.author}
                            onChange={(e) => handleChange({ ...userComment, author: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">
                            Comentario
                        </label>
                        <textarea
                            id="content"
                            className="form-control"
                            rows={3}
                            value={userComment.content}
                            onChange={(e) => handleChange({ ...userComment, content: e.target.value })}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label d-block">
                            Rating
                        </label>

                        <div className="d-flex align-items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    value={star}
                                    type="button"
                                    className="btn btn-link p-0 me-1"
                                    onClick={(e) => handleChange({ ...userComment, rating: Number(star) })}
                                >
                                    <span className="text-warning fs-4">{star <= userComment.rating ? <FaStar /> : <FaRegStar />}</span>
                                </button>
                            ))}
                            <span className="ms-2">({userComment.rating}/5)</span>
                        </div>


                        {/* <select
                            id="rating"
                            className="form-select"
                            value={userComment.rating}
                            onChange={(e) => handleChange({ ...userComment, rating: Number(e.target.value) })}
                        >
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select> */}
                    </div>
                    {isCommentChanged() && (
                        <button type="submit" className="btn btn-success">
                            Submit Review
                        </button>
                    )}
                </form>
            </div>


        </div>
    )
}

export default ProductDetailed