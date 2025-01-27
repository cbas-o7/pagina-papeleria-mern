import React, { useState } from "react";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";

const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  address: "123 Main St, Anytown, AN 12345",
  avatar: "/placeholder.svg",
};

const orders = [
  {
    id: 1,
    date: "2023-05-15",
    total: 74.97,
    status: "Delivered",
    products: [
      { id: 1, name: "Luxury Notebook", price: 24.99, quantity: 2, image: "/placeholder.svg" },
      { id: 2, name: "Fountain Pen Set", price: 49.99, quantity: 1, image: "/placeholder.svg" },
    ],
  },
  {
    id: 2,
    date: "2023-05-01",
    total: 49.99,
    status: "Shipped",
    products: [
      { id: 3, name: "Leather Planner", price: 34.99, quantity: 1, image: "/placeholder.svg" },
      { id: 4, name: "Colored Pencil Set", price: 19.99, quantity: 1, image: "/placeholder.svg" },
    ],
  },
  {
    id: 3,
    date: "2023-04-20",
    total: 89.97,
    status: "Processing",
    products: [
      { id: 5, name: "Desk Organizer", price: 29.99, quantity: 1, image: "/placeholder.svg" },
      { id: 6, name: "Canvas Backpack", price: 39.99, quantity: 1, image: "/placeholder.svg" },
    ],
  },
];

export default function AccountAndOrders() {
  const [openOrder, setOpenOrder] = useState(null); // Track which order is open

  const toggleOrder = (orderId) => {
    setOpenOrder(openOrder === orderId ? null : orderId);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Your Account</h1>

      <div className="card mb-4">
        <div className="card-body d-flex align-items-center">
          <div>
            <p className="mb-1 fw-bold">{user.name}</p>
            <p className="mb-1 text-muted">{user.email}</p>
            <p className="mb-1 text-muted">{user.address}</p>
          </div>
          <button className="btn btn-primary ms-auto">Edit Profile</button>
        </div>
      </div>

      <h2 className="mb-4">Your Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="card mb-3">
          <div className="card-header d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0">Order #{order.id}</h5>
              <small className="text-muted">{order.date}</small>
            </div>
            <button
              className="btn btn-link text-dark"
              onClick={() => toggleOrder(order.id)}
              aria-expanded={openOrder === order.id}
            >
              {openOrder === order.id ? <SlArrowUp /> : <SlArrowDown /> }
            </button>
          </div>
          {openOrder === order.id && (
            <div className="card-body">
              <p>
                <span className="text-muted">Status:</span> <strong>{order.status}</strong>
              </p>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="me-3"
                            style={{ width: "50px", height: "50px" }}
                          />
                          {product.name}
                        </div>
                      </td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>{product.quantity}</td>
                      <td>${(product.price * product.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="text-end fw-bold">
                      Total:
                    </td>
                    <td className="fw-bold">${order.total.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}