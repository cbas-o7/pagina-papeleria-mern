
import ProductCard from './ProductCard'
import { Link } from "react-router-dom"


const ProductsHome = ({ products }) => {

    const user = JSON.parse(localStorage.getItem('user'));


    const userId = user ? user._id : "";

    if (userId == ""){
        console.log('No se encontró el usuario en localStorage. //HOME')
    }

    //console.log( products);

    return (
        <section className="py-5 bg-light">
            <div className="container">
                <h2 className="text-center mb-5">Featured Products</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">

                    {products.map((product) => (
                        <Link to={`/products/${product._id}`} key={product._id} style={{ textDecoration: "none", color: "inherit" }}>
                            <ProductCard product={product} userId={userId} />
                        </Link>
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