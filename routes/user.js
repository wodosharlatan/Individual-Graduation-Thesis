const express = require("express");
const router = express.Router();
const User = require("../models/user_model");

// Import .env variables
require("dotenv/config");

// Save user ( This is just a test )
router.post("/", async (req, res) => {
	try {
		const userData = req.body;

		const newUser = new User(userData);

		const createdUser = await newUser.save();

		res.json(createdUser);
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).json({ error: "Failed to create user" });
	}
});

module.exports = router;
