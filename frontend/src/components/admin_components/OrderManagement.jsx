"use client"

import { useState } from "react"

const initialOrders = [
  {
    id: 1,
    customerName: "John Doe",
    products: ["Luxury Notebook", "Fountain Pen Set"],
    status: "Pending",
    total: 74.98,
  },
  { id: 2, customerName: "Jane Smith", products: ["Leather Planner"], status: "Delivered", total: 34.99 },
  {
    id: 3,
    customerName: "Bob Johnson",
    products: ["Colored Pencil Set", "Canvas Backpack"],
    status: "Pending",
    total: 59.98,
  },
]

export default function OrderManagement() {
  const [orders, setOrders] = useState(initialOrders)

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-4">Order Management</h2>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Products</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{order.products.join(", ")}</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>
                    <span className={`badge ${order.status === "Pending" ? "bg-warning" : "bg-success"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    {order.status === "Pending" && (
                      <>
                        <button
                          className="btn btn-sm btn-outline-success me-2"
                          onClick={() => handleStatusChange(order.id, "Delivered")}
                        >
                          Deliver
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleStatusChange(order.id, "Cancelled")}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {order.status === "Delivered" && <span className="text-success">Delivered</span>}
                    {order.status === "Cancelled" && <span className="text-danger">Cancelled</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

