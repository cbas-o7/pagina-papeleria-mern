import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductDetailed from "../components/ProductDetailed";


function ProductDetails() {
    const { id } = useParams();


    return (
        <div className="d-flex flex-column min-vh-100">

            <Header />

            <main className="flex-grow-1">

                <ProductDetailed id={id} />

            </main>

            <Footer />

        </div>
    );
}

export default ProductDetails;