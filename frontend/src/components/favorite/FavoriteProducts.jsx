import useFavorites from "../../hooks/favorite/useFavorites"
import { useProducts } from "../../hooks/product/useProducts"
import ProductCard from "../product/ProductCard"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export default function FavoriteProducts() {
  const { products } = useProducts()
  const { user } = useAuth();
  const userId = user ? user._id : "";

  const { favorites } = useFavorites(userId);

  // Filtra los productos que están en la lista de favoritos
  const favoriteProducts = products.filter((product) =>
    favorites.some((fav) => fav.productId === product._id)
  );

  //console.log(favoriteProducts)

  return (
    <div className="container py-5">
      <h1 className="mb-4">Tus Productos Favoritos</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {favoriteProducts.map((product) => (
          <Link to={`/products/${product._id}`} key={product._id} style={{ textDecoration: "none", color: "inherit" }}>
            <ProductCard product={product} userId={userId} />
          </Link>
        ))}
      </div>
    </div>
  )
}