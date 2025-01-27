import CartComponent from "../components/CartComponent";
import Header from "../components/Header";
import Footer from "../components/Footer";


export default function Favorites() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1">

      <CartComponent />
      </main>
      

      <Footer />
    </div>
  )
}