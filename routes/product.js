import express from "express";
import { productController } from "../controllers/index.js";

const router = express.Router();

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Search for products
 *     description: Retrieve a list of products based on the provided search criteria
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: searchString
 *         description: Search string to filter products by name or brand
 *         type: string
 *       - in: query
 *         name: page
 *         description: Page number for pagination
 *         type: integer
 *       - in: query
 *         name: size
 *         description: Number of products per page
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
router.get("", productController.getAllProduct);

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve a specific product based on the provided ID
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 *
 */
router.get("/:id", productController.detailProduct);

router.post("", productController.insertProduct);

export default router;
