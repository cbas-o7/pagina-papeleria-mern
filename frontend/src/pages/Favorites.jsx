import FavoriteProducts from "../components/favorite/FavoriteProducts";


export default function Favorites() {
  return (
    <div className="d-flex flex-column min-vh-100">

      <main className="flex-grow-1">

        <FavoriteProducts />

      </main>

    </div>
  )
}