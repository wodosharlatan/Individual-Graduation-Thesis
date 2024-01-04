require("dotenv/config");

const express = require("express");
const router = express.Router();
const path = require('path');

router.get("/:IMAGE_CODE", (req, res) => {
    try {
        // Assuming rootPath is the root directory of your project
        const rootPath = path.join(__dirname, '../../');

        res.sendFile(path.join(rootPath, 'images', req.params.IMAGE_CODE));
    } catch (error) {
        res.json({ message: error.toString() });
    }
});


module.exports = router;
