import { useParams } from "react-router-dom";
import ProductDetailed from "../components/ProductDetailed";


function ProductDetails() {
    const { id } = useParams();


    return (
        <div className="d-flex flex-column min-vh-100">

            <main className="flex-grow-1">

                <ProductDetailed id={id} />

            </main>

        </div>
    );
}

export default ProductDetails;