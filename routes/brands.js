import express from "express";

import { brandsController } from "../controllers/index.js";

const router = express.Router();

router.post("", brandsController.insertBrands);

export default router;
