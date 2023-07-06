import express from "express";
import { userController } from "../controllers/index.js";

const router = express.Router();
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Authenticate a user
 *     description: Endpoint to authenticate a user with provided email and password
 *     tags:
 *       - User
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: User credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
router.post("/login", userController.login);
/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Create a new user
 *     description: Endpoint to create a new user with provided details
 *     tags:
 *       - User
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             gender:
 *               type: string
 *             date:
 *               type: string
 *             month:
 *               type: string
 *             year:
 *               type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
router.post("/register", userController.register);

router.get("/:id", userController.detailUser);
/**
 * @swagger
 * /api/user:
 *   patch:
 *     summary: Update a user
 *     description: Endpoint to update a user with the provided details
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to update
 *         required: true
 *         type: string
 *       - in: body
 *         name: user
 *         description: User object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             gender:
 *               type: string
 *             date:
 *               type: string
 *             month:
 *               type: string
 *             year:
 *               type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.patch("", userController.updateUser);

export default router;
