import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
        {
            productId: { type: String, required: true },
            name: { type: String, required: true },
            image: { type: String, required: true },
            quantity: { type: Number, required: true },
            unitPrice: { type: Number, required: true },
        },
    ],
    total: { type: Number, required: true },
    estado: { type: String, enum: ["Por entregar", "Entregado", "Cancelado"], default: "Por entregar" },
    fechaCreacion: { type: Date, default: Date.now },
});

const Order = mongoose.model(`Order`, orderSchema)

export default Order