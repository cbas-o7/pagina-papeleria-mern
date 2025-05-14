"use client"

import { useDailyOrders } from "../../hooks/order/useDailyOrders"
import { MdDelete } from "react-icons/md";
import { IconContext } from "react-icons/lib";

export default function OrderManagement() {

  const { orders, handleStatusChange, handleDeleteAllOrders } = useDailyOrders();

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
                  <th>Productos</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      {order.email}
                      <br />
                      <small className="text-muted">
                        {new Date(order.fechaCreacion).toLocaleString("es-MX")}
                      </small>
                    </td>
                    <td>
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
                      {/*order.products.join(", ")*/}
                    </td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>
                      <span className={`badge ${order.estado === "Por entregar" ? "bg-warning" : order.estado === "Entregado" ? "bg-success" : "bg-danger"}`}>
                        {order.estado}
                      </span>
                    </td>
                    <td>
                      {order.estado === "Por entregar" && (
                        <div className="">
                          <button
                            className="btn btn-sm btn-outline-success me-2"
                            onClick={() => handleStatusChange(order.orderId, "Entregado")}
                          >
                            Entregar
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleStatusChange(order.orderId, "Cancelado")}
                          >
                            Cancelar
                          </button>
                        </div>
                      )}
                      {order.estado === "Entregado" && <span className="text-success">Entregado</span>}
                      {order.estado === "Cancelado" && <span className="text-danger">Cancelado</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>)}
      </div>
    </div>
  )
}

