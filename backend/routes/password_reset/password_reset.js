require("dotenv/config");

const express = require("express");
const router = express.Router();
const User = require("../../models/user_model");
const SendEmail = require("../../functions/send_email");
const GenerateHash = require("../../functions/generate_hash");
const path = require("path");
const SHA256 = require("crypto-js/sha256");

router.post("/", async (req, res) => {
	try {
		const email = req.body.Email;
		const validPassword = req.body.Password;
		const verification = req.body.VerificationPassword;

		if (
			email == undefined ||
			validPassword == undefined ||
			verification == undefined
		) {
			return res.status(400).json({
				message: "Email or Password is not provided",
			});
		}

		const user = await User.findOne({ Email: email });

		if (!user) {
			return res.status(400).json({ message: "User does not exist" });
		}
		if (user.Verified == false) {
			return res.status(400).json({ message: "User is not verified" });
		}

		if (
			validPassword == undefined ||
			validPassword.trim().length < 8 ||
			validPassword.trim().length > 20
		) {
			return res.status(400).json({
				message: "Password must be at between 8 20 characters long",
			});
		}

		if (verification == undefined || verification.trim().length < 8) {
			return res.status(400).json({
				message: "Verification must be at least 8 characters long",
			});
		}

		if (verification != validPassword) {
			return res.status(400).json({ message: "Passwords do not match" });
		}

		const verificationCode = GenerateHash();

		await User.updateMany(
			{ Email: email },
			{
				$set: {
					VerificationCode: verificationCode,
					TemporaryPassword: validPassword,
				},
			}
		);

		const fullUrl = req.protocol + "://" + req.get("host");

		const context = {
			URL: `${fullUrl}/API/password-reseted/${verificationCode}`,
		};

		SendEmail(email, "Password reset", "password_reset", context);

		res.json({ message: "Email with password reset sent", status: 200 });
	} catch (error) {
		return res.json({ message: error.toString() });
	}
});

router.get("/:CODE", async (req, res) => {
	try {
		const user = await User.findOne({ VerificationCode: req.params.CODE });
		if (!user) {
			return res.status(400).json({ message: "User does not exist" });
		}
		if (user.Verified == false) {
			return res.status(400).json({ message: "User is not verified" });
		}
		if (user.TemporaryPassword == "") {
			return res.status(400).json({
				message: "User does not have temporary password",
			});
		}

		const validPassword = SHA256(user.TemporaryPassword).toString();

		await User.updateMany(
			{ VerificationCode: req.params.CODE },
			{
				$set: {
					Password: validPassword,
					TemporaryPassword: "",
				},
			}
		);

		res.sendFile(path.join(__dirname, "..", "..", "dist", "index.html"));
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
});

module.exports = router;
