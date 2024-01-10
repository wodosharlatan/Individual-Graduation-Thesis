require("dotenv/config");

const express = require("express");
const router = express.Router();
const Products = require("../../models/product_model");

router.get("/:IMAGE_CODE", async (req, res) => {
	try {
		const params = req.params.IMAGE_CODE;
		const fullUrl =
			req.protocol + "://" + req.get("host") + "/API/images/" + params;

		const result = await Products.findOne({ productImagePath: fullUrl });
		if (!result) {
			return res.status(400).json({ message: "No image found" });
		}

        const image = result.productImage.toString('base64');

        res.render('image', {image: image});

	} catch (error) {
		res.status(500).json({ message: error.toString() });
	}
});

module.exports = router;
