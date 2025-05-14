import express from "express";
import {
    addCategory,
    editCategory,
    deleteCategory,
    getCategories,
} from "../controller/category.controller.js";

const categoryRouter = express.Router();

categoryRouter.post("/category/add", addCategory)
categoryRouter.put("/category/edit/:id", editCategory)
categoryRouter.delete("/category/delete/:id", deleteCategory)
categoryRouter.get("/categories", getCategories)

export default categoryRouter;