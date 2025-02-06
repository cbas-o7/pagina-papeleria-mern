
import { useState, useEffect } from "react"
import useCart from "../hooks/useCart"

export default function ShoppingCart() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : "";


  const { cartItems, updateQuantity } = useCart(userId);

  // Calcular total
  const total = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);


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
                  <tr key={item.productId}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="object-fit-cover me-3 rounded "
                          style={{ width: "100px", height: "auto" }}
                        />
                        {item.name}
                      </div>
                    </td>
                    <td>${item.unitPrice.toFixed(2)}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button
                          onClick={() => updateQuantity(item.productId, -1)}
                          className="btn btn-sm btn-outline-secondary"
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, 1)}
                          className="btn btn-sm btn-outline-secondary"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${(item.unitPrice * item.quantity).toFixed(2)}</td>
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