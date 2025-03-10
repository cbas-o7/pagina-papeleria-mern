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
    addToCart,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    editCategory,
    deleteCategory,
    getCategories,
    checkout,
    getPendingOrdersByUserId,
    cancelOrder,
    getDailyOrders,
    updateOrderStatus,
    saveStoreHours,
    getStoreHours,
    deleteAllOrders,
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

router.post("/checkout", checkout);

router.get("/orders/pending", getPendingOrdersByUserId);

router.delete("/orders/cancel/:id", cancelOrder)



router.post("/product/add", addProduct);

router.post("/product/add/:id", updateProduct)

router.post("/product/delete/:id", deleteProduct)
//
router.post("/category/add", addCategory)

router.put("/category/edit/:id", editCategory)

router.delete("/category/delete/:id", deleteCategory)

router.get("/categories", getCategories)

router.get("/dailyorders", getDailyOrders)

router.put("/dailyorders/:orderId", updateOrderStatus);

router.delete("/dailyOrders/deleteAll", deleteAllOrders);


router.post("/store-hours", saveStoreHours)

router.get("/store-hours", getStoreHours)

export default router