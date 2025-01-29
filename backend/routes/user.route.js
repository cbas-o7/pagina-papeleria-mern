import express  from "express";
import { getUserLogin,
    userSignup,
    getProducts,
    getRandomProducts
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

export default router