import express from "express";

import { orderController } from "../controllers/index.js";

import checkToken from "../authentication/auth.js";

const router = express.Router();

/**
 * @swagger
 * /api/order:
 *   post:
 *     summary: Create new order
 *     description: Endpoint to create a new order for a user
 *     tags:
 *       - Order
 *     parameters:
 *       - in: body
 *         name: order
 *         description: Order object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email_user:
 *               type: string
 *             address:
 *               type: string
 *             phone_number:
 *               type: string
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid request
 *       401:
 *          description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("", checkToken, orderController.checkOut);
/**
 * @swagger
 * /api/order:
 *   patch:
 *     summary: Update order
 *     description: Endpoint to update an order for a user
 *     tags:
 *       - Order
 *     parameters:
 *       - in: body
 *         name: order
 *         description: Order object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             email_user:
 *               type: string
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       400:
 *         description: Invalid request
 *       401:
 *          description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.patch("", checkToken, orderController.dropOrder);
/**
 * @swagger
 * /api/order/{email_user}:
 *   get:
 *     summary: Get orders by email
 *     description: Retrieve orders for a specific user based on email
 *     tags:
 *       - Order
 *     parameters:
 *       - in: path
 *         name: email_user
 *         description: Email of the user to retrieve orders for
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       401:
 *          description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/:email_user", checkToken, orderController.getOrder);
/**
 * @swagger
 * /api/order/detail/{id}:
 *   get:
 *     summary: Get order details by ID
 *     description: Retrieve the details of an order based on the order ID
 *     tags:
 *       - Order
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the order to retrieve details for
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       401:
 *          description: Unauthorized
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.get("/detail/:id", checkToken, orderController.detailOrder);
export default router;
