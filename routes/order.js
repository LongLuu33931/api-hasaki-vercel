import express from "express";

import { orderController } from "../controllers/index.js";

const router = express.Router();

router.post("", orderController.checkOut);
router.patch("", orderController.dropOrder);

export default router;
