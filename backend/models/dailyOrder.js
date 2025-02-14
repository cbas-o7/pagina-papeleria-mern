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
  estado: { type: String, enum: ["Por entregar", "Entregado", "Cancelado"], default: "Por entregar" },
  fechaCreacion: { type: Date, default: Date.now },
});

const DailyOrder = mongoose.model("DailyOrder", dailyOrder);

export default DailyOrder