
import React, { useState } from "react"
import useCart from "../../hooks/cart/useCart"
import PaypalButtons from "./PaypalButtons";
import Swal from "sweetalert2"
import { getPendingOrdersByUserId } from "../../services/api/order.service";
import { useAuth } from "../../context/AuthContext";

export default function ShoppingCart() {
  const { user } = useAuth();
  const userId = user ? user._id : "";

  const { cartItems, updateQuantity, addOrder } = useCart(userId);
  const [shippingOption, setShippingOption] = useState("pickup") // "pickup" or "delivery"
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("paypal") // "paypal" or "efectivo"
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
  })

  const [loading, setLoading] = useState(false);

  const [pendingOrders, setPendingOrders] = useState(false);

  React.useEffect(() => {
    const fetchPendingOrders = async () => {
      const result = await getPendingOrdersByUserId(userId);
      if (result.length > 0) {
        setPendingOrders(true);
      } else {
        setPendingOrders(false);
      }

    };
    fetchPendingOrders();
  }, []);


  { /* BLOQUE */ }

  // Calcular total
  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const shippingCost = shippingOption === "delivery" ? 30 : 0
  const tax = subtotal * 0.16 // 16% tax
  const total = subtotal + shippingCost + tax


  const handleAddressChange = (field, value) => {
    setShippingAddress((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validateAddress = () => {
    if (shippingOption === "pickup") return true

    const { fullName, address, city, zipCode, phone } = shippingAddress
    return fullName.trim() && address.trim() && city.trim() && zipCode.trim() && phone.trim()
  }

  if (cartItems.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2 className="mb-4">Tu carrito esta vacio</h2>
          <p className="text-muted mb-4">Agrega algun producto a tu carrito</p>
          <a href="/products" className="btn btn-primary">
            Continua comprando
          </a>
        </div>
      </div>
    )
  }


  { /* BLOQUE */ }
  const handleCheckout = async (paymentMethod) => {

    if (shippingOption === "delivery" && !validateAddress()) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text:
          shippingOption === "delivery"
            ? "Please fill in all shipping address fields."
            : "Please complete your information.",
        confirmButtonColor: "#0d6efd",
      })
      return
    }

    if (cartItems.length === 0) {
      Swal.fire("Carrito vacío", "Agrega productos antes de hacer checkout", "warning");
      return;
    }
    setLoading(true);

    try {

      // Verificamos si el usuario tiene órdenes pendientes
      if (pendingOrders == true) {
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

      confirmOrder(paymentMethod);

    } catch (error) {
      console.error("Error en el checkout:", error);
      Swal.fire("Error", "No se pudo procesar la compra.", "error");
    } finally {
      setLoading(false);
    }
  }

  const confirmOrder = async (paymentMethod) => {
    try {

      const orderData = {
        userId,
        products: cartItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          image: item.image,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
        subtotal,
        tax,
        total,
        paymentMethod, // "paypal" o "efectivo"
        shippingOption, // "delivery" o "pickup"
        shippingAddress: shippingAddress,
      };
      console.log("Order Data:", orderData);

      await addOrder(orderData);

    } catch (error) {
      console.error("Error en el checkout:", error);
      Swal.fire("Error", "No se pudo procesar la compra.", "error");
    }

  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Carrito de Compras</h1>

      <div className="row">
        <div className="col-lg-8">

          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
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
                </table>
              </div>
            </div>
          </div>

          {/* Opciones De Compra */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Opciones De Compra</h5>
            </div>
            <div className="card-body">
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="shippingOption"
                  id="pickup"
                  value="pickup"
                  checked={shippingOption === "pickup"}
                  onChange={(e) => setShippingOption(e.target.value)}
                />
                <label className="form-check-label" htmlFor="pickup">
                  <strong>Store Pickup</strong> - Gratis
                  <br />
                  <small className="text-muted">Listo para recoger dentro de 1-2 horas</small>
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="shippingOption"
                  id="delivery"
                  value="delivery"
                  checked={shippingOption === "delivery"}
                  onChange={(e) => setShippingOption(e.target.value)}
                />
                <label className="form-check-label" htmlFor="delivery">
                  <strong>Entrega En Casa</strong> - $30.00
                  <br />
                  <small className="text-muted">Se enviara dentro de 2-3 horas en horario laboral</small>
                </label>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          {shippingOption === "delivery" && (
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Direccion De Envio</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12 mb-3">
                    <label className="form-label">Nombre Completo</label>
                    <input
                      type="text"
                      className="form-control"
                      value={shippingAddress.fullName}
                      onChange={(e) => handleAddressChange("fullName", e.target.value)}
                      placeholder="Ingresa tu nombre completo"
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label">Direccion</label>
                    <input
                      type="text"
                      className="form-control"
                      value={shippingAddress.address}
                      onChange={(e) => handleAddressChange("address", e.target.value)}
                      placeholder="Ingresa tu direccion"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Ciudad</label>
                    <input
                      type="text"
                      className="form-control"
                      value={shippingAddress.city}
                      onChange={(e) => handleAddressChange("city", e.target.value)}
                      placeholder="Ingresa tu ciudad"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Codigo Postal</label>
                    <input
                      type="text"
                      className="form-control"
                      value={shippingAddress.zipCode}
                      onChange={(e) => handleAddressChange("zipCode", e.target.value)}
                      placeholder="Ingresa tu codigo postal"
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label">Numero de telefono</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={shippingAddress.phone}
                      onChange={(e) => handleAddressChange("phone", e.target.value)}
                      placeholder="Ingresa tu numero de telefono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}



          {/* <div className="mt-4 text-end">
            <button className="btn btn-primary" onClick={handleCheckout} disabled={loading}>
            {loading ? "Procesando..." : "Finalizar Compra"}
              </button>
          </div> */}


        </div>

        <div className="col-lg-4">
          {/* Order Summary */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Resumen de Compra</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Envio:</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Impuesto:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong>${total.toFixed(2)}</strong>
              </div>

              <div className="d-grid gap-2">

                {shippingOption === "pickup" && (<button
                  className="btn btn-primary"
                  onClick={() => {
                    handleCheckout("efectivo")
                  }}
                  style={{ backgroundColor: "#0070ba", borderColor: "#0070ba" }}
                >
                  Pagar en efectivo
                </button>)}



                {!pendingOrders && shippingOption === "pickup" && (
                  <PaypalButtons
                    confirmOrder={confirmOrder}
                    total={total}
                  />
                )}

                {pendingOrders && (
                  <button className="btn btn-secondary" disabled>
                    No puedes realizar otra compra hasta entregar o cancelar tu pedido pendiente
                  </button>
                )}
                {validateAddress() && shippingOption === "delivery" && (
                  <PaypalButtons
                    confirmOrder={confirmOrder}
                    total={total}
                  />
                )}
                {shippingOption === "delivery" && !validateAddress() && (
                  <button className="btn btn-secondary" disabled>
                    Agrega una direccion de envio para poder pagar con PayPal
                  </button>
                )}
              </div>

              <div>

              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}