import { useParams } from "react-router-dom";


function ProductDetails() {
    const { id } = useParams();

    // Simulación: buscar datos de productos por ID
    // En una app real, aquí puedes hacer un fetch o consultar datos desde un estado global
    const products = [
        { id: "1", name: "Luxury Notebook", price: 24.99 },
        { id: "2", name: "Fountain Pen Set", price: 49.99 },
    ];
    const product = products.find((product) => product.id === id);

    if (!product) {
        return <p>Product not found!</p>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p>Price: ${product.price.toFixed(2)}</p>
        </div>
    );
}

export default ProductDetails;