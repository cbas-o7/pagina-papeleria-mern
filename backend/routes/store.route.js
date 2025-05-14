import express from "express";
import {
    saveStoreHours,
    getStoreHours,
} from "../controller/store.controller.js";

const storeRouter = express.Router();

storeRouter.post("/storeHours", saveStoreHours)
storeRouter.get("/storeHours", getStoreHours)

export default storeRouter;