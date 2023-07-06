import express from "express";
import { cartController } from "../controllers/index.js";

const router = express.Router();
/**
 * @swagger
 * /api/cart/add-to-cart:
 *   post:
 *     summary: add to cart
 *     description: add to cart
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: body
 *         name: add to cart
 *         description: Array of cart objects
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               email_user:
 *                 type: string
 *               product_id:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Cart created successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
router.post("/add-to-cart", cartController.addToCart);
/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: get cart
 *     description: get cart
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: body
 *         name: cartItem
 *         description: Cart item object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email_user:
 *               type: string
 *     responses:
 *       201:
 *         description: get cart successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
router.post("", cartController.getCart);
/**
 * @swagger
 * /api/cart:
 *   patch:
 *     summary: Update item in cart
 *     description: Endpoint to update an item in the cart for a user
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: body
 *         name: cartItem
 *         description: Cart item object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email_user:
 *               type: string
 *             product_id:
 *               type: string
 *             quantity:
 *               type: integer
 *     responses:
 *       200:
 *         description: Item in cart updated successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
router.patch("", cartController.updateCart);
/**
 * @swagger
 * /api/cart/drop-item:
 *   delete:
 *     summary: Drop item from cart
 *     description: Endpoint to drop/remove an item from the cart for a user
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: body
 *         name: cartItem
 *         description: Cart item object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email_user:
 *               type: string
 *             product_id:
 *               type: string
 *     responses:
 *       200:
 *         description: Item dropped from cart successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
router.delete("/drop-item", cartController.deleteCartItem);
/**
 * @swagger
 * /api/cart:
 *   delete:
 *     summary: Clear cart
 *     description: Endpoint to clear the entire cart for a user
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: body
 *         name: cart
 *         description: Cart object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email_user:
 *               type: string
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
router.delete("", cartController.dropCart);

export default router;
