 import mongoose from "mongoose";
 
 
 const commentSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  verifiedPurchase: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
 
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;