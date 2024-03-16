require("dotenv/config");

const express = require("express");
const router = express.Router();
const Products = require("../../models/product_model");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const fs = require("fs");
const verify = require("../../functions/verify");
const isNull = require("../../functions/is_empty");
const mongoose = require("mongoose");
const {SendEmail} = require("../../functions/send_email");
const Users = require("../../models/user_model");

const projectId = process.env.GCLOUD_PROJECT_ID;
const bucketName = process.env.GCLOUD_STORAGE_BUCKET_NAME;
const keyFilename = process.env.GCLOUD_APPLICATION_CREDENTIALS;

const parsedCredentials = JSON.parse(keyFilename);

const storage = new Storage({
	projectId: projectId,
	credentials: parsedCredentials,
});

async function deleteFile(fileName) {
	await storage.bucket(bucketName).file(fileName).delete();

	console.log(`gs://${bucketName}/${fileName} deleted`);
}

 

router.post("/", async (req, res) => {
	const session = await mongoose.startSession();
	session.startTransaction();
	try {

		if ((await verify(req.body.UserToken)) !== true) {
			return res.status(400).json({ message: "User not authorized" });
		}

		const productName = req.body.productName;

		if (isNull(productName)) {
			await session.abortTransaction();
			session.endSession();
			return res.status(400).json({ message: "Product name cannot be empty" });
		}

		const existingProduct = await Products.findOne({
			productName: productName,
		});

		if (existingProduct) {
			await session.abortTransaction();
			session.endSession();
			return res.status(400).json({ message: "Product already exists" });
		}

		const { image } = req.files;
		if (!image) {
			await session.abortTransaction();
			session.endSession();
			return res.status(400).json({ status: "No image found" });
		}

		if (!/^image/.test(image.mimetype))
			return res.status(400).json({ status: "Wrong file type" });

		const destinationPath = path.join(__dirname, "images", image.name);
		const gcsFileName = `${Date.now()}-${image.name}`;

		const finalURL = `https://storage.cloud.google.com/${bucketName}/${gcsFileName}`;

		const productDescription = req.body.productDescription;

		if (isNull(productDescription)) {
			await session.abortTransaction();
			session.endSession();
			return res
				.status(400)
				.json({ message: "Product description is required" });
		}

		const productPrice = req.body.productPrice;

		if (isNull(productPrice)) {
			await session.abortTransaction();
			session.endSession();
			return res.status(400).json({ message: "Price Not Specified" });
		}

		const productCategory = req.body.productCategory;

		if (isNull(productCategory)) {
			await session.abortTransaction();
			session.endSession();
			return res.status(400).json({ message: "Category Not Specified" });
		}

		const productQuantity = req.body.productQuantity;

		if (isNull(productCategory)) {
			await session.abortTransaction();
			session.endSession();
			return res.status(400).json({ message: "Category Not Specified" });
		}

		let productStatus = "";

		if (productQuantity > 0) {
			productStatus = "Dostupne";
		} else {
			productStatus = "Nedostupne";
		}

		const productImagePath = finalURL;

		const product = new Products({
			productName: productName,
			productDescription: productDescription,
			productPrice: productPrice,
			productCategory: productCategory,
			productQuantity: productQuantity,
			productStatus: productStatus,
			productImagePath: productImagePath,
			productFileName: gcsFileName,
		});

		const savedProduct = await product.save();

		image.mv(destinationPath, (err) => {
			if (err) return res.status(500).json({ status: "Error saving file" });
			const bucket = storage.bucket(bucketName);
			const file = bucket.file(gcsFileName);

			fs.createReadStream(destinationPath)
				.pipe(file.createWriteStream())
				.on("error", (err) => {
					console.log("Error uploading image to GCS", err);
					console.log();
					return res.status(500).json({ status: "Error uploading image" });
				})
				.on("finish", () => {
					console.log(finalURL);
				});
		});

		const users = await Users.find();

		const validEmails = users.filter((user) => user.Newsletter === true);

		const context = { URL: productImagePath };

		validEmails.forEach(async (user) => {
			await SendEmail(
				user.Email,
				`Novy Produkt! - ${productName}`,
				"new_product",
				context
			);
		});

		return res.json(savedProduct);
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		return res.status(500).json({ message: error.toString() });
	}
});

router.get("/", async (req, res) => {
	try {
		const result = await Products.find();

		const filtredResults = [];

		result.forEach((element) => {
			if (element.productQuantity != 0) {
				filtredResults.push(element);
			}

			let counter = 0;
			let stars = 0;

			element.productReviews.forEach((rating) => {
				stars += rating.stars;
				counter++;
			});

			const rating = stars / counter;

			element.productRating = rating.toFixed(2);
		});

		return res.status(200).json(filtredResults);
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
});

router.get("/:PRODUCT_NAME", async (req, res) => {
	try {
		const result = await Products.find({
			productName: req.params.PRODUCT_NAME,
		});

		const reviews = result[0].productReviews;

		let stars = 0;
		let count = 0;

		reviews.forEach((element) => {
			count++;
			stars += element.stars;
		});

		const rating = stars / count;

		result[0].productRating = rating.toFixed(2);

		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
});

router.post("/delete/:CODE", async (req, res) => {
	try {
		if ((await verify(req.params.CODE)) !== true) {
			return res.status(400).json({ message: "User not authorized" });
		}

		const product = await Products.findOneAndDelete({
			productName: req.body.productName,
		});

		if (!product) {
			return res.status(400).json({ message: "Product does not exist" });
		}

		deleteFile(`${product.productFileName}`).catch(console.error);

		return res.json({ message: "Product deleted from SGC" });
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
});

router.put("/:CODE", async (req, res) => {
	const session = await mongoose.startSession();
	session.startTransaction();
	try {
		if ((await verify(req.params.CODE)) !== true) {
			return res.status(400).json({ message: "User not authorized" });
		}

		const product = await Products.findOne({
			productName: req.body.productNameOld,
		});

		if (!product) {
			return res.status(400).json({ message: "Product does not exist" });
		}

		let finalURL = product.productImagePath;
		let gcsFileName = product.productFileName;

		if (req.files != null) {
			const { image } = req.files;

			if (!/^image/.test(image.mimetype))
				return res.status(400).json({ status: "Wrong file type" });

			const destinationPath = path.join(__dirname, "images", image.name);
			gcsFileName = `${Date.now()}-${image.name}`;

			finalURL = `https://storage.cloud.google.com/${bucketName}/${gcsFileName}`;

			image.mv(destinationPath, (err) => {
				if (err) return res.status(500).json({ status: "Error saving file" });
				const bucket = storage.bucket(bucketName);
				const file = bucket.file(gcsFileName);

				fs.createReadStream(destinationPath)
					.pipe(file.createWriteStream())
					.on("error", (err) => {
						console.log("Error uploading image to GCS", err);
						return res.status(500).json({ status: "Error uploading image" });
					})
					.on("finish", () => {
						deleteFile(`${product.productFileName}`).catch(console.error);
					});
			});
		}

		const productImagePath = finalURL;

		const productName = req.body.productNameNew;

		if (isNull(productName)) {
			await session.abortTransaction();
			session.endSession();
			return res.status(400).json({ message: "Product name cannot be empty" });
		}

		const productDescription = req.body.productDescription;

		if (isNull(productDescription)) {
			await session.abortTransaction();
			session.endSession();
			return res
				.status(400)
				.json({ message: "Product description is required" });
		}

		const productPrice = req.body.productPrice;

		if (isNull(productPrice)) {
			await session.abortTransaction();
			session.endSession();
			return res.status(400).json({ message: "Price Not Specified" });
		}

		const productCategory = req.body.productCategory;

		if (isNull(productCategory)) {
			await session.abortTransaction();
			session.endSession();
			return res.status(400).json({ message: "Category Not Specified" });
		}

		const productQuantity = req.body.productQuantity;

		if (isNull(productCategory)) {
			await session.abortTransaction();
			session.endSession();
			return res.status(400).json({ message: "Category Not Specified" });
		}

		let productStatus = "";

		if (productQuantity > 0) {
			productStatus = "Dostupne";
		} else {
			productStatus = "Nedostupne";
		}

		await Products.findOneAndUpdate(
			{ productName: req.body.productNameOld },
			{
				$set: {
					productName: productName,
					productDescription: productDescription,
					productPrice: productPrice,
					productCategory: productCategory,
					productQuantity: productQuantity,
					productImagePath: productImagePath,
					productFileName: gcsFileName,
				},
			}
		);

		return res.json({ message: "Product updated successfully" });
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		return res.status(500).json({ message: error.toString() });
	}
});

module.exports = router;
