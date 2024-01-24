require("dotenv/config");

const express = require("express");
const router = express.Router();
const Product = require("../../models/product_model");


router.get("/", async (req, res) => {
	try {
        const categories = await Product.distinct("productCategory");
        return res.status(200).json(categories);
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
});

router.get("/:category", async (req, res) => {
	try {
		const products = await Product.find({ productCategory: req.params.category });
		return res.status(200).json(products);
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
});



module.exports = router;
