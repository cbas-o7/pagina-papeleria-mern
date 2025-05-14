import express from "express";
import {
    getUserLogin,
    userSignup,
    getOrdersByUserId,
    getPendingOrdersByUserId,
    cancelOrder
} from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.post(`/login`, getUserLogin);
userRouter.post(`/signup`, userSignup);
userRouter.post("/account", getOrdersByUserId);
userRouter.get(`/orders/pending`, getPendingOrdersByUserId);
userRouter.delete("/orders/cancel/:id", cancelOrder);

export default userRouter;