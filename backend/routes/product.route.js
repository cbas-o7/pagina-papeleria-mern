import express from "express";
import {
    getProducts,
    getTopRatedProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
} from "../controller/product.controller.js";

const productRouter = express.Router();

productRouter.get("/products", getProducts);
productRouter.get("/", getTopRatedProducts);
productRouter.get("/products/:id", getProduct);
productRouter.post("/product/add", addProduct);
productRouter.post("/product/add/:id", updateProduct);
productRouter.post("/product/delete/:id", deleteProduct);

export default productRouter;
