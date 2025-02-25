import React, { useState } from "react";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import { MdCancel } from "react-icons/md";
import { useOrders } from "../hooks/useOrders";
import Swal from "sweetalert2";

export default function AccountAndOrders() {
  const [openOrder, setOpenOrder] = useState(null); // Track which order is open


  const user = JSON.parse(localStorage.getItem('user'));

  const userId = user ? user._id : "";


  if (userId == "") {
    console.log('No se encontró el usuario en localStorage. //ACCOUNT AND ORDERS')
  }
  const { orders, handleCancelOrder } = useOrders(userId)

  const toggleOrder = (orderId) => {
    setOpenOrder(openOrder === orderId ? null : orderId);
  };

  const confirmCancelOrder = (orderId) => {
    Swal.fire({
      title: "¿Cancelar pedido?",
      text: "Si cancelas este pedido, no podrás recuperarlo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No, mantener",
    }).then((result) => {
      if (result.isConfirmed) {
        handleCancelOrder(orderId);
        Swal.fire("Cancelado", "Tu pedido ha sido cancelado.", "success");
      }
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Tu cuenta</h1>

      <div className="card mb-4">
        <div className="card-body d-flex align-items-center">
          <div>
            <p className="mb-1 fw-bold">{user.name}</p>
            <p className="mb-1 text-muted">{user.email}</p>
          </div>
          <button className="btn btn-primary ms-auto">Editar Perfil</button>
        </div>
      </div>

      <h2 className="mb-4">Tus Pedidos</h2>
      {orders.map((order) => (
        <div key={order._id} className="card mb-3">
          <div className="card-header d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0">Pedido #{order._id}</h5>
              <small className="text-muted">{new Date(order.fechaCreacion).toLocaleString("es-MX")}</small>
            </div>

            {order.estado === "Por entregar" && (
              <button
                className="btn btn-danger btn-sm pb-2"
                onClick={(e) => {
                  e.stopPropagation();
                  confirmCancelOrder(order._id);
                }}
              >
                <MdCancel />
              </button>
            )}

            <button
              className="btn btn-link text-dark"
              onClick={() => toggleOrder(order._id)}
              aria-expanded={openOrder === order._id}
            >
              {openOrder === order._id ? <SlArrowUp /> : <SlArrowDown />}
            </button>
          </div>
          {openOrder === order._id && (
            <div className="card-body">
              <p>
                <span className="text-muted">Status:</span> <strong>{order.estado}</strong>
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

                    <tr key={product.productId}>
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
                      <td>${product.unitPrice.toFixed(2)}</td>
                      <td>{product.quantity}</td>
                      <td>${(product.unitPrice * product.quantity).toFixed(2)}</td>
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