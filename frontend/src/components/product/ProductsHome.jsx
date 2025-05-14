import ProductCard from './ProductCard'
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";

const ProductsHome = ({ products, openLogin }) => {

    const { user } = useAuth();

    const userId = user ? user._id : "";

    if (userId == "") {
        console.log('No se encontró el usuario en localStorage. //HOME')
    }

    const navigate = useNavigate()

    const categoryClicked = () => {
        navigate(`/products`);
    }


    return (
        <section className="py-5 bg-light">
            <div className="container">
                <h2 className="text-center mb-5">Algunos de Nuestros Articulos</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">

                    {products.map((product) => (
                        <Link to={`/products/${product._id}`} key={product._id} style={{ textDecoration: "none", color: "inherit" }}>
                            <ProductCard product={product} userId={userId} openLogin={openLogin} />
                        </Link>
                    ))}

                </div>

                {/* Botón "Ver todos los productos" */}
                <div className="d-flex justify-content-center mt-4 w-100">
                    <button className="btn btn-dark"
                        onClick={(event) => {
                            event.preventDefault()
                            categoryClicked()
                        }}
                    >
                        Ver todos los productos
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ProductsHome