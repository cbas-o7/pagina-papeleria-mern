import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true},
    description: { type: String, required: true },
    image: {type: String, required: true},
    category: {type: String, required: true}
});

const Product = mongoose.model(`Product`, userSchema)

export default Product