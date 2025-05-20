import Comment from "../models/comment.js";
import Order from "../models/order.js";
import User from "../models/user.js";

export const addComment = async (req, res) => {
  const { productId, userId, author, content, rating } = req.body;

  // Verifica compra
  const hasPurchased = await Order.exists({
    userId,
    "products.productId": productId,
    estado: { $in: ["Entregado", "Por entregar"] }
  });

  const verifiedPurchase = !!hasPurchased;

  // Busca si ya existe un comentario de este usuario para este producto
  let comment = await Comment.findOne({ productId, userId });

  if (comment) {
    // Si existe, actualízalo
    comment.author = author;
    comment.content = content;
    comment.rating = rating;
    comment.verifiedPurchase = verifiedPurchase;
    await comment.save();
    return res.status(200).json({ success: true, comment, updated: true });
  } else {
    // Si no existe, créalo
    comment = new Comment({
      productId,
      userId,
      author, 
      content,
      rating,
      verifiedPurchase
    });
   
    await comment.save();
    return res.status(201).json({ success: true, comment, created: true, updated: false });
  }
  
  
};

export const getCommentsByProduct = async (req, res) => {
  const { productId } = req.params;
  const comments = await Comment.find({ productId }).sort({ createdAt: -1 });
  res.json({ success: true, comments });
};