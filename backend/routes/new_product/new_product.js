require("dotenv/config");

const path = require("path");   
const express = require("express");
const router = express.Router();
const SaveImage = require("../../functions/save_image");

router.post("/", async (req, res) => {
	try {
        const result = SaveImage(req.files, path.join(__dirname + "/../../"))

		if (result.status != "image saved") {
			return res.json({ error: result.status });
		}
       
        const ImagePath = result.path;

        console.log(ImagePath)
        
		

		return res.json({ message: result.status });
	} catch (error) {
		return res.json({ message: error.toString() });
	}
});

router.get("/", (req, res) => {
	res.sendFile(__dirname + "/test.html");
});

module.exports = router;
