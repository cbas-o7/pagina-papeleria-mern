import express  from "express";
import { getUserLogin,
    userSignup,
    getProducts,
    getRandomProducts,
    getProduct
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

export default router