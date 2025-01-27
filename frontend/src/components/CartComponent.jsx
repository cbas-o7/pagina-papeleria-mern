
import { useState } from "react"

const img = 'https://flowbite.com/docs/images/examples/image-1@2x.jpg'

const initialCartItems = [
  { id: 1, name: "Luxury Notebook", price: 24.99, quantity: 2, image: img },
  { id: 2, name: "Fountain Pen Set", price: 49.99, quantity: 1, image: img },
]

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="container py-5">
      <h1 className="mb-4">Your Shopping Cart</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="me-3 rounded"
                          style={{ width: "100px", height: "auto" }}
                        />
                        {item.name}
                      </div>
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="btn btn-sm btn-outline-secondary"
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="btn btn-sm btn-outline-secondary">
                          +
                        </button>
                      </div>
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="text-end fw-bold">
                    Total:
                  </td>
                  <td className="fw-bold">${total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-4 text-end">
        <button className="btn btn-primary">Proceed to Checkout</button>
      </div>
    </div>
  )
}