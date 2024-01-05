require("dotenv/config");

const path = require("path");   
const express = require("express");
const router = express.Router();
const Products = require("../../models/product_model");
const SaveImage = require("../../functions/save_image");

router.post("/", async (req, res) => {
	try {
        const result = SaveImage(req.files, path.join(__dirname + "/../../"))

		if (result.status != "image saved") {
			return res.json({ error: result.status });
		}
       
        const ImagePath = result.path.split("/backend")[1];

        const webImagePath  = req.protocol + "://" + req.get("host") + "/API" + ImagePath;

        const productName = req.body.productName;
        const productDescription = req.body.productDescription;
        const productPrice = req.body.productPrice;
        const productCategory = req.body.productCategory;
        const productQuantity = req.body.productQuantity;
        const productRating = req.body.productRating;
        const productReviews = req.body.productReviews;
        const productStatus = req.body.productStatus;
        const productImagePath = webImagePath;

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

		return res.json({ message: savedProduct });
	} catch (error) {
		return res.json({ message: error.toString() });
	}
});

router.get("/", (req, res) => {
	res.sendFile(__dirname + "/test.html");
});


module.exports = router;
