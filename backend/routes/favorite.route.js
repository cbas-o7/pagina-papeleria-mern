import express from "express";
import {
    addFavorite,
    removeFavorite,
    getFavorites,
} from "../controller/favorite.controller.js";

const favoriteRouter = express.Router();

favoriteRouter.post("/favorites/add", addFavorite);
favoriteRouter.patch("/favorites/remove", removeFavorite);
favoriteRouter.post("/favorites", getFavorites);

export default favoriteRouter;