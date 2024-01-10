require("dotenv/config");

const express = require("express");
const router = express.Router();
const Products = require("../../models/product_model");
const fs = require("fs");
const path = require("path");

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
		if (!image) return { status: "No image found" };
		if (!/^image/.test(image.mimetype)) return { status: "Wrong file type" };

		const destinationPath = path.join(__dirname, "images", image.name);
		await image.mv(destinationPath)
		const fileData =  await fs.promises.readFile(destinationPath);
		const binary = new Buffer.from(fileData);

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
		const productImage = binary;

		const product = new Products({
			productName: productName,
			productDescription: productDescription,
			productPrice: productPrice,
			productCategory: productCategory,
			productQuantity: productQuantity,
			productRating: productRating,
			productReviews: productReviews,
			productStatus: productStatus,
			productImage: productImage,
		});

		const savedProduct = await product.save();
		
		// Delete image from server
		await fs.unlink(destinationPath);


		return res.json(savedProduct);
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
});

router.get("/", async (req, res) => {
	return res.json(await Products.find());
});

module.exports = router;
