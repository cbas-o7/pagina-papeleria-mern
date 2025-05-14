import express from "express";
import {
    getCart,
    updateCart,
    addToCart,
    checkout,
} from "../controller/cart.controller.js";

const cartRouter = express.Router();

cartRouter.post("/cart", getCart);
cartRouter.patch("/cart/update", updateCart);
cartRouter.post("/cart/add", addToCart);
cartRouter.post("/checkout", checkout);

export default cartRouter;
