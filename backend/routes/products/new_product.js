require("dotenv/config");

const express = require("express");
const router = express.Router();
const Products = require("../../models/product_model");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const fs = require("fs");
const verify = require("../../functions/verify");

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
		const gcsFileName = `${Date.now()}-${image.name}`;

		const finalURL = `https://storage.cloud.google.com/${bucketName}/${gcsFileName}`;

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

		const productDescription = req.body.productDescription;

		if (!productDescription) {
			return res
				.status(400)
				.json({ message: "Product description is required" });
		}

		const productPrice = req.body.productPrice;
		const productCategory = req.body.productCategory;
		const productQuantity = req.body.productQuantity;
		const productStatus = req.body.productStatus;
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

		return res.json(savedProduct);
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
});

router.get("/", async (req, res) => {
	return res.json(await Products.find());
});

router.get("/:CODE", async (req, res) => {
	try {
		const result = await Products.find({productName: req.params.CODE});
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
});

router.delete("/:CODE/:PRODUCT_NAME", async (req, res) => {
	if ((await verify(req.params.CODE)) !== true) {
		return res.status(400).json({ message: "User not authorized" });
	}
	try {
		const product = await Products.findOneAndDelete({
			productName: req.params.PRODUCT_NAME,
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

module.exports = router;
