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
       
        const ImagePath = result.path.split("/backend")[1];

        const webImagePath  = req.protocol + "://" + req.get("host") + "/API" + ImagePath;

        console.log(req.body);
        
        
		

		return res.json({ message: webImagePath });
	} catch (error) {
		return res.json({ message: error.toString() });
	}
});

router.get("/", (req, res) => {
	res.sendFile(__dirname + "/test.html");
});


module.exports = router;
