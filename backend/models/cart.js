import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
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
});

const Cart = mongoose.model(`Cart`, cartSchema)

export default Cart