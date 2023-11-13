require("dotenv/config");

const express = require("express");
const router = express.Router();
const User = require("../../models/user_model");
const path = require("path");

router.get("/:CODE", async (req, res) => {
	try {
		const user = await User.findOne({ VerificationCode: req.params.CODE });
		if (!user) {
			return res.sendFile(
				path.join(__dirname, "public", "user_does_not_exist.html")
			);
		}

		if (user.Verified) {
			return res.sendFile(
				path.join(__dirname, "public", "user_already_verified.html")
			);
		}

		await User.updateOne(
			{ VerificationCode: req.params.CODE },
			{ Verified: true }
		);

		res.sendFile(path.join(__dirname, "public", "user_verified.html"));
	} catch (error) {
		return res.json({ message: error.toString() });
	}
});

router.post("/reset-password", async (req, res) => {
	try {
		const email = req.body.Email;
		const password = req.body.Password;
		const verification = req.body.VerificationPassword;

		if (
			email == undefined ||
			password == undefined ||
			verification == undefined
		) {
			return res.json({ message: "Email or Password is not provided" });
		}

		if (password.trim().length <= 8 || password.trim().length >= 20) {
			return res.json({
				message: "Password must be at between 8 20 characters long",
			});
		}

		if (password != verification) {
			return res.json({ message: "Passwords are not the same" });
		}

		res.json({ message: "Email with password reset sent" });
	} catch (error) {
		return res.json({ message: error.toString() });
	}
});

module.exports = router;
