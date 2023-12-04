require("dotenv/config");

const express = require("express");
const router = express.Router();
const Product = require("../../models/product_model");
const SaveImage = require("../../functions/save_image");



router.post('/', async (req, res) => {

    if(SaveImage(req.files, __dirname) != "image saved") {
        return res.json({ error: SaveImage(req.files, __dirname) });
    }
 
    return res.json({ message: "Image saved" });
    
    

});

router.get('/', (req, res) => {
	res.sendFile(__dirname + '/test.html');
});

module.exports = router;