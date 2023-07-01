import express from "express";
import { cartController } from "../controllers/index.js";

const router = express.Router();

router.post("/add-to-cart", cartController.addToCart);

router.post("", cartController.getCart);

router.patch("", cartController.updateCart);

router.delete("/drop-item", cartController.deleteCartItem);

router.delete("", cartController.dropCart);

export default router;
