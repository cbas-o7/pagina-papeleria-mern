"use client"


import { useDailyOrders } from "../../hooks/useDailyOrders"

const initialOrders = [
  {
    id: 1,
    customerName: "John Doe",
    products: [{ name: "Luxury Notebook", quantity: 2, productId: 4 }, { name: "Fountain Pen Set", quantity: 2, productId: 5 }],
    estado: "Por Entregar",
    total: 74.98,
  },
  { id: 2, customerName: "Jane Smith", products: [{ name: "Luxury Notebook", quantity: 2, productId: 6 }, { name: "Fountain Pen Set", quantity: 2, productId: 7 }], estado: "Entregado", total: 34.99 },
  {
    id: 3,
    customerName: "Bob Johnson",
    products: [{ name: "Luxury Notebook", quantity: 2, productId: 8 }],
    estado: "Por Entregar",
    total: 59.98,
  },
]

export default function OrderManagement() {

  const { orders, handleStatusChange } = useDailyOrders();

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-4">Gestión de Órdenes</h2>
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
                  <td>{order.email}</td>
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
        </div>
      </div>
    </div>
  )
}

