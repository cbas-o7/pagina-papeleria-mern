import express  from "express";

import { getUserLogin,
    userSignup
 } from "../controller/user.controller.js";

const router = express.Router()

/* 
router.get(`/`, (req, res) => {
    res.send(`Server's ready`)
})
 */

router.post(`/login`, getUserLogin);

router.post(`/signup`, userSignup)

export default router