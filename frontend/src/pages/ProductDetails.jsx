import { useParams } from "react-router-dom";
import ProductDetailed from "../components/ProductDetailed";


function ProductDetails(openLogin) {
    const { id } = useParams();

    return (
        <div className="d-flex flex-column /min-vh-100">

            <main className="flex-grow-1">

                <ProductDetailed id={id} openLogin={openLogin}/>

            </main>

        </div>
    );
}

export default ProductDetails;