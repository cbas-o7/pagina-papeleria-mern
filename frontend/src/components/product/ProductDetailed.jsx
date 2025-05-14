import { useState } from 'react'
import { Star, StarHalf } from "lucide-react"
import { FaStar, FaRegStar } from "react-icons/fa";
import { useProduct } from '../../hooks/product/useProductById'
import useCart from '../../hooks/cart/useCart';
import { useAuth } from "../../context/AuthContext";

const initialComments = [
    { id: 1, author: "John Doe", content: "Great product! Highly recommended.", rating: 5 },
    { id: 2, author: "Jane Smith", content: "Good quality, but a bit pricey.", rating: 4 },
    { id: 3, author: "Mike Johnson", content: "Decent product, could be better.", rating: 3 },
]

function ProductDetailed({id, openLogin}) {
    const product = useProduct({id})
    //const [comments, setComments] = useState(initialComments)
    //const [newComment, setNewComment] = useState({ author: "", content: "", rating: 5 })

    //console.log(product)

    const { user } = useAuth();
    const userId = user ? user._id : "";
    
    const { addProductToCart } = useCart(userId, openLogin);

    if (!product) {
        return <div className="container mt-5">Product not found</div>
    }



    const handleCommentSubmit = (e) => {
        e.preventDefault()
        if (newComment.author.trim() && newComment.content.trim()) {
            setComments([...comments, { ...newComment, id: comments.length + 1 }])
            setNewComment({ author: "", content: "", rating: 5 })
        }
    }


    const StarRating = ({ rating }) => {
        return (
            <div className="d-inline-block">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>
                        {star <= rating ? (
                            <FaStar className="text-warning fs-4" />
                        ) : star - 0.5 <= rating ? (
                            <FaRegStar className="text-warning fs-4" />
                        ) : (
                            <FaStar className="text-secondary fs-4" />
                        )}
                    </span>
                ))}
            </div>
        )
    }

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
                    {/* 
                    <button className="btn btn-outline-dark w-100"
                        onClick={(event) => {
                            event.preventDefault()
                            addProductToCart(product._id, product.price, product.name, product.image);
                        }}
                    >
                        Agregar a carrito
                    </button> */}

                </div>
            </div>

            {/*
            <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="border p-3 mb-3 rounded-4" >
                            <div className="flex justify-between items-center mb-2">
                                <p className="font-semibold">{comment.author}</p>
                                <StarRating rating={comment.rating} />
                            </div>
                            <p>{comment.content}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h2 className="mb-4">Leave a Review</h2>
                <form onSubmit={handleCommentSubmit}>
                    <div className="mb-3">
                        <label htmlFor="author" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            id="author"
                            className="form-control"
                            value={newComment.author}
                            onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">
                            Review
                        </label>
                        <textarea
                            id="content"
                            className="form-control"
                            rows={3}
                            value={newComment.content}
                            onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rating" className="form-label">
                            Rating
                        </label>
                        <select
                            id="rating"
                            className="form-select"
                            value={newComment.rating}
                            onChange={(e) => setNewComment({ ...newComment, rating: Number(e.target.value) })}
                        >
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success">
                        Submit Review
                    </button>
                </form>
            </div>
            */}

        </div>
    )
}

export default ProductDetailed