
import { useState, useEffect } from "react"
import useCart from "../hooks/useCart"
import Swal from "sweetalert2"
import { getPendingOrdersByUserId } from "../services/api";


export default function ShoppingCart() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : "";


  const { cartItems, updateQuantity, addOrder } = useCart(userId);
  const [loading, setLoading] = useState(false);

  // Calcular total
  const total = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      Swal.fire("Carrito vacío", "Agrega productos antes de hacer checkout", "warning");
      return;
    }
    setLoading(true);


    try {

      // 🚀 Verificamos si el usuario tiene órdenes pendientes
      const pendingOrders = await getPendingOrdersByUserId(userId);
      if (pendingOrders.length > 0) {
        Swal.fire(
          "Pedido pendiente",
          "Tienes un pedido 'Por entregar'. Recógelo o cancélalo antes de hacer otra compra.",
          "warning"
        );
        setLoading(false);
        return;
      }


      const result = await Swal.fire({
        title: "Confirmar compra",
        html: `
          <p>Total: <strong>$${total.toFixed(2)}</strong></p>
          <p>Las entregas solo se hacen en sucursal.</p>
        `,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      });

      
      if (!result.isConfirmed) return;

      const orderData = {
        userId,
        products: cartItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          image: item.image,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
        total,
      };
      //console.log(orderData)
      await addOrder(orderData);



    } catch (error) {
      console.error("Error en el checkout:", error);
      Swal.fire("Error", "No se pudo procesar la compra.", "error");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="container py-5">
      <h1 className="mb-4">Carrito de Compras</h1>
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
        <button className="btn btn-primary" onClick={handleCheckout} disabled={loading}>
          {loading ? "Procesando..." : "Finalizar Compra"}
        </button>
      </div>
    </div>
  )
}