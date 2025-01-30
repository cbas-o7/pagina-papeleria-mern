import mongoose from "mongoose";


const favoriteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    favoriteProducts: [
        {
            productId: { type: String, required: true },
        },
    ]
});

const Favorite = mongoose.model(`Favorite`, favoriteSchema)

export default Favorite