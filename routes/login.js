const express = require("express");
const router = express.Router();
const User = require("../models/user_model");
const SHA256 = require("crypto-js/sha256");

// Import .env variables
require("dotenv/config");

// Save user to database
router.post("/", async (req, res) => {
    try {
        // Check if user already exists by email
        const user = await User.findOne({ Email: req.body.Email });

        console.log(user);

      
        // Declare all User Data fields
        const validPassword = req.body.Password;
        const validEmail = req.body.Email;


        const hashedPassword = SHA256(validPassword.trim());


        // await newUser.save();

        res.json({ message: "User created successfully" });
    } catch (error) {
        return res.json({ message: error.toString() });
    }
});

module.exports = router;
