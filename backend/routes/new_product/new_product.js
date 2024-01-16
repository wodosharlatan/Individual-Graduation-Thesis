require("dotenv/config");

const express = require("express");
const router = express.Router();
const Products = require("../../models/product_model");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

router.post("/", async (req, res) => {
	try {
		const productName = req.body.productName;

		const existingProduct = await Products.findOne({
			productName: productName,
		});

		if (existingProduct) {
			return res.status(400).json({ message: "Product already exists" });
		}

		const { image } = req.files;
		if (!image) return res.status(400).json({ status: "No image found" });

		if (!/^image/.test(image.mimetype))
			return res.status(400).json({ status: "Wrong file type" });

		const destinationPath = path.join(__dirname, "images", image.name);

		const buffer = await fs.promises.readFile(destinationPath);

		await image.mv(destinationPath);
		await fetch("http://localhost:3001/API/upload", {
			method: "POST",
			body: "22",
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
			})
			.catch((err) => {
				console.log(err);
			});

		const productDescription = req.body.productDescription;

		if (!productDescription) {
			return res
				.status(400)
				.json({ message: "Product description is required" });
		}

		const productPrice = req.body.productPrice;
		const productCategory = req.body.productCategory;
		const productQuantity = req.body.productQuantity;
		const productRating = req.body.productRating;
		const productReviews = req.body.productReviews;
		const productStatus = req.body.productStatus;
		const productImagePath = "binary data";

		const product = new Products({
			productName: productName,
			productDescription: productDescription,
			productPrice: productPrice,
			productCategory: productCategory,
			productQuantity: productQuantity,
			productRating: productRating,
			productReviews: productReviews,
			productStatus: productStatus,
			productImagePath: productImagePath,
		});

		const savedProduct = await product.save();

		return res.json(savedProduct);
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
});

router.get("/", async (req, res) => {
	return res.json(await Products.find());
});

module.exports = router;
