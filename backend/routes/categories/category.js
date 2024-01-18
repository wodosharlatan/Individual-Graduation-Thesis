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



module.exports = router;
