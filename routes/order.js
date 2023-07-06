import express from "express";

import { orderController } from "../controllers/index.js";

const router = express.Router();

router.post("", orderController.checkOut);
router.patch("", orderController.dropOrder);
router.get("/:email_user", orderController.getOrder);
router.get("/detail/:id", orderController.detailOrder);
export default router;
