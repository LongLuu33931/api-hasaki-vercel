import express from "express";
import { iconCategoriesController } from "../controllers/index.js";

const router = express.Router();

router.post("", iconCategoriesController.insertIconCategories);
router.get("", iconCategoriesController.getAllIconCategories);

export default router;
