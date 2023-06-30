import express from "express";
import { productController } from "../controllers/index.js";

const router = express.Router();

router.get("", productController.getAllProduct);
router.get("/:id", productController.detailProduct);

router.post("", productController.insertProduct);

export default router;
