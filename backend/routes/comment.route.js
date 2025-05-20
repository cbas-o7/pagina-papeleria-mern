import express from "express";
import { addComment, getCommentsByProduct } from "../controller/comment.controller.js";
const commentRouter = express.Router();

commentRouter.post("/comments", addComment);
commentRouter.get("/comments/:productId", getCommentsByProduct);

export default commentRouter;