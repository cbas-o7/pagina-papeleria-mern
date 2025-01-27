import AccountAndOrders from "../components/AccountAndOrders";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Account() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1">

      <AccountAndOrders />
      </main>
      

      <Footer />
    </div>
  )
}

export default Account