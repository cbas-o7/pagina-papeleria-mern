import AccountAndOrders from "../components/user/AccountAndOrders";

function Account() {
  return (
    <div className="d-flex flex-column min-vh-100">

      <main className="flex-grow-1">

        <AccountAndOrders />
      </main>

    </div>
  )
}

export default Account