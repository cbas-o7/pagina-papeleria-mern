import Products from "../components/Products";


export default function ProductsPage({openLogin}) {
  return (
    <div className="d-flex flex-column min-vh-100">

      <main className="flex-grow-1">
        <Products openLogin={openLogin}/>
      </main>

    </div>
  )
}
