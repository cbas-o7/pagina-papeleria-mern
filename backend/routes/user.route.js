import express  from "express";
import { getUserLogin,
    userSignup,
    getProducts,
    getRandomProducts,
    getProduct,
    getOrdersByUserId,
    getFavorites,
    addFavorite,
    removeFavorite,
    getCart,
    updateCart,
    addToCart
 } from "../controller/user.controller.js";

const router = express.Router()

/* 
router.get(`/`, (req, res) => {
    res.send(`Server's ready`)
})
 */

router.post(`/login`, getUserLogin)

router.post(`/signup`, userSignup)

router.get("/products", getProducts)

router.get("/", getRandomProducts)

router.get("/products/:id", getProduct)

router.post("/account", getOrdersByUserId);

router.post("/favorites", getFavorites);

router.post("/favorites/add", addFavorite);

router.post("/favorites/remove", removeFavorite);

router.post("/cart", getCart);

router.patch("/cart/update", updateCart);

router.post("/cart/add", addToCart);

export default router