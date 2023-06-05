const express = require("express");
const router = express.Router();
const User = require("../models/user_model");

// Import .env variables
require("dotenv/config");


// Get all users
router.get("/", async (req, res) => {
    res.json({ message: "Users route" });
});


module.exports = router;
