import mongoose from "mongoose";

const dailyOrder = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  email: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  estado: { type: String, enum: ["Por entregar", "Procesando", "Enviando", "Entregado", "Cancelado"], default: "Por entregar" },
  fechaCreacion: { type: Date, default: Date.now },
  paymentMethod: { type: String, enum: ["paypal", "efectivo"], required: true }, // <--- NUEVO
    shippingOption: { type: String, enum: ["delivery", "pickup"], required: true }, // <--- NUEVO
    shippingAddress: {
        fullName: String,
        address: String,
        city: String,
        zipCode: String,
        phone: String,
    },
});

const DailyOrder = mongoose.model("DailyOrder", dailyOrder);

export default DailyOrder