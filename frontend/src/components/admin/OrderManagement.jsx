"use client"

import { useDailyOrders } from "../../hooks/order/useDailyOrders"
import { MdDelete } from "react-icons/md";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { useState } from "react";

export default function OrderManagement() {

  const { orders, handleStatusChange, handleDeleteAllOrders } = useDailyOrders();
  const [expandedOrder, setExpandedOrder] = useState(null)

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Por entregar":
        return "bg-warning"
      case "Procesando":
        return "bg-info"
      case "Enviando":
        return "bg-primary"
      case "Entregado":
        return "bg-success"
      case "Cancelado":
        return "bg-danger"
      default:
        return "bg-secondary"
    }
  }

  const getNextStatus = (currentStatus, deliveryOption) => {
    if (deliveryOption === "pickup") {
      return currentStatus === "Por entregar" ? "Entregado" : null
    } else {
      // Home Delivery
      switch (currentStatus) {
        case "Por entregar":
          return "Procesando"
        case "Procesando":
          return "Enviando"
        case "Enviando":
          return "Entregado"
        default:
          return null
      }
    }
  }

  const getActionButtons = (order) => {
  
    const nextStatus = getNextStatus(order.estado, order.shippingOption)

    if (order.estado === "Entregado" || order.estado === "Cancelado") {
      return <span className={`text-${order.estado === "Entregado" ? "success" : "danger"}`}>{order.estado}</span>
    }
    return (
      <div>
        {nextStatus && (
          <button
            className="btn btn-sm btn-outline-success me-2"
            onClick={() => handleStatusChange(order.orderId, nextStatus)}
          >
            {order.shippingOption === "pickup" ? "Marcar como entregado" : `Mover a ${nextStatus}`}
          </button>
        )}
        <button className="btn btn-sm btn-outline-danger" onClick={() => handleStatusChange(order.orderId, "Cancelado")}>
          Cancelar Orden
        </button>
      </div>
    )
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="card-title">Gestión de Órdenes</h2>
          <button className="btn btn-danger btn-sm" onClick={handleDeleteAllOrders}>
            <IconContext.Provider value={{ className: "text-white opacity-75 fs-4 me-1" }}>
              <MdDelete />
            </IconContext.Provider>
            Borrar Todas las Órdenes
          </button>
        </div>
        {orders.length === 0 ? (
          <p className="text-center text-muted">No hay órdenes registradas el día de hoy.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Cliente</th>
                  <th>Total</th>
                  <th>Forma De Pago</th>
                  <th>Entrega</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <>
                    <tr key={order._id}>
                      <td>
                        {order.email}
                        <br />
                        <small className="text-muted">
                          {new Date(order.fechaCreacion).toLocaleString("es-MX")}
                        </small>
                      </td>
                      <td>${order.total.toFixed(2)}</td>
                      <td>{order.paymentMethod}</td>
                      <td>
                        <div className="d-flex justify-content-between align-items-start">
                          <span className={`badge ${order.shippingOption === "pickup" ? "bg-secondary" : "bg-info"}`}>
                            {order.shippingOption}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${order.estado === "Por entregar" ? "bg-warning" : order.estado === "Entregado" ? "bg-success" : "bg-danger"} ${getStatusBadgeClass(order.estado)}`}>
                          {order.estado}
                        </span>
                      </td>
                      <td>{getActionButtons(order)}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary" onClick={() => toggleOrderDetails(order._id)}>
                          { expandedOrder === order._id ?<FaChevronUp></FaChevronUp> : <FaChevronDown></FaChevronDown> }
                        </button>
                      </td>
                    </tr>
                    {expandedOrder === order._id && (
                      <tr>
                        <td colSpan="8">
                          <div className="p-3 bg-light">
                            <div className="row">
                              <div className="col-md-6">
                                <h6>Productos:</h6>
                                  <ol className="list-group">
                                    {order.products.map((product) => (

                                      <li className="list-group-item d-flex justify-content-between align-items-start" key={product.productId}>
                                        <div className="ms-2 me-auto">
                                          <div className="fw-bold">{product.name}</div>
                                          <small>ID #{product.productId}</small>
                                        </div>
                                        <span className="badge text-bg-primary rounded-pill">{product.quantity}</span>
                                      </li>

                                    ))}
                                  </ol>
                              </div>
                              {order.shippingOption === "delivery" && order.shippingAddress && (
                                <div className="col-md-6">
                                  <h6>Direccion De Envio:</h6>
                                  <address>
                                    <strong>{order.shippingAddress.fullName}</strong>
                                    <br />
                                    {order.shippingAddress.address}
                                    <br />
                                    {order.shippingAddress.city}, {order.shippingAddress.zipCode}
                                    <br />
                                    Numero Telefonico: {order.shippingAddress.phone}
                                  </address>
                                </div>
                              )}
                            </div>
                            {order.shippingOption === "delivery" && (
                              <div className="mt-3">
                                <h6>Order Progress:</h6>
                                <div className="progress" style={{ height: "25px" }}>
                                  <div
                                    className={`progress-bar ${order.estado === "Procesando"
                                      ? "bg-info"
                                      : order.estado === "Enviando"
                                        ? "bg-primary"
                                        : order.estado === "Entregado"
                                          ? "bg-success"
                                          : "bg-warning"
                                      }`}
                                    role="progressbar"
                                    style={{
                                      width:
                                        order.estado === "Por entregar"
                                          ? "25%"
                                          : order.estado === "Procesando"
                                            ? "50%"
                                            : order.estado === "Enviando"
                                              ? "75%"
                                              : order.estado === "Entregado"
                                                ? "100%"
                                                : "0%",
                                    }}
                                  >
                                    {order.status}
                                  </div>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                  <small>Por entregar</small>
                                  <small>Procesando</small>
                                  <small>Enviando</small>
                                  <small>Entregado</small>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>)}
      </div>
    </div>
  )
}

