import express from "express";
import {
    createPaypalOrder,
    capturePaypalOrder,
} from "../controller/paypal.controller.js";

const paypalRouter = express.Router();

paypalRouter.post("/paypal/orders", createPaypalOrder);
paypalRouter.post("/paypal/orders/:orderID/capture", capturePaypalOrder);

export default paypalRouter;