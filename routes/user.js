import express from "express";
import { userController } from "../controllers/index.js";

const router = express.Router();

router.post("/login", userController.login);

router.post("/register", userController.register);

router.get("/:id", userController.detailUser);

router.patch("", userController.updateUser);

export default router;
