require("dotenv/config");

const express = require("express");
const router = express.Router();
const path = require('path');

router.get("/:IMAGE_CODE", (req, res) => {
    try {
        return res.json(req.params.IMAGE_CODE)
        
       
    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
});


module.exports = router;
