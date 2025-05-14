import express from "express";
import {
    getDailyOrders,
    updateOrderStatus,
    deleteAllOrders,
} from "../controller/dailyorder.controller.js";

const dailyOrderRouter = express.Router();

dailyOrderRouter.get("/dailyorders", getDailyOrders)
dailyOrderRouter.put("/dailyorders/:orderId", updateOrderStatus);
dailyOrderRouter.delete("/dailyOrders/deleteAll", deleteAllOrders);

export default dailyOrderRouter;