import mongoose from "mongoose";
import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		return res
			.status(200)
			.json({ status: true, data: products, message: "All Products" });
	} catch (error) {
		console.log(`Error fetching products ${error}`);
		res.status(500).json({ status: false, mesage: "Internal Server Error" });
	}
};

export const createProduct = async (req, res) => {
	const product = req.body;

	if (!product.name || !product.price || !product.image) {
		return res
			.status(404)
			.json({ status: false, message: "Please fill all fields" });
	}

	const newProduct = new Product(product);

	try {
		await newProduct.save();
		res
			.status(201)
			.json({ status: true, message: "Product created successfully" });
	} catch (error) {
		console.log(`Error crrating product ${error}`);
		res.status(404).json({ status: false, mesage: "Error creating Product" });
	}
};

export const updateProduct = async (req, res) => {
	const { id } = req.params;

	const product = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ status: false, message: "Invalid Product Id" });
	}
	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, {
			new: true,
		});
		res.status(200).json({
			status: true,
			data: updatedProduct,
			message: "Product updated successfully",
		});
	} catch (error) {
		console.log(`Error updating product ${error}`);
		res.status(500).json({ status: false, mesage: "Internal Server Error" });
	}
};

export const deleteProduct = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ status: false, message: "Invalid Product Id" });
	}

	try {
		await Product.findByIdAndDelete(id);
		res
			.status(200)
			.json({ status: true, message: "Product deleted successfully" });
	} catch (error) {
		console.log(`Error deleting product ${error}`);
		res.status(500).json({ status: false, mesage: "Internal Server Error" });
	}
};
