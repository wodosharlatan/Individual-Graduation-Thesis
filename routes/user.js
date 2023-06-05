const express = require("express");
const router = express.Router();
const User = require("../models/user_model");

// Import .env variables
require("dotenv/config");

// Get all users
router.post("/", async (req, res) => {
	try {
		const userData = req.body;

		const newUser = new User(userData);

		const createdUser = await newUser.save();

		res.json(createdUser);
        res.redirect("/");
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).json({ error: "Failed to create user" });
	}
});

module.exports = router;
