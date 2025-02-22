import Products from "../components/Products";
import Header from "../components/Header";
import Footer from "../components/Footer";


export default function ProductsPage() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1">
        <Products />
      </main>


      <Footer />
    </div>
  )
}
