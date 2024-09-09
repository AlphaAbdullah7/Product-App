import express from "express";
import {
	getProducts,
	createProduct,
	updateProduct,
	deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/api/products", getProducts);

router.post("/api/products", createProduct);

router.put("/api/products/:id", updateProduct);

router.delete("/api/products/:id", deleteProduct);

export default router;
