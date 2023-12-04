require("dotenv/config");

const express = require("express");
const router = express.Router();
const Product = require("../models/product_model");

router.post("/", async (req, res) => {
    

    console.log(req.file);


});


router.get("/", async (req, res) => {

    res.json({message: "Hello World"});

});

module.exports = router;
