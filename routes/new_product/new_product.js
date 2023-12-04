require("dotenv/config");

const express = require("express");
const router = express.Router();
const Product = require("../../models/product_model");

router.post('/', (req, res) => {
    const { image } = req.files;

    if (!image) return res.sendStatus(400);

    // If does not have image mime type prevent from uploading
    if (!/^image/.test(image.mimetype)) return res.sendStatus(400);

    image.mv(__dirname + '/images/' + image.name);

    res.sendStatus(200);
});

router.get('/', (req, res) => {
	res.sendFile(__dirname + '/test.html');
});

module.exports = router;