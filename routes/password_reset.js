require("dotenv/config");

const express = require("express");
const router = express.Router();
const User = require("../models/user_model");
const SendEmail = require("../functions/send_email");
const GenerateHash = require("../functions/generate_hash");

router.post("/", async (req, res) => {
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

		const user = await User.findOne({ Email: email });

		if (!user) {
			return res.json({ message: "User does not exist" });
		}
		if (user.Verified == false) {
			return res.json({ message: "User is not verified" });
		}

		if (password.trim().length < 8 || password.trim().length > 20) {
			return res.json({
				message: "Password must be at between 8 20 characters long",
			});
		}

		if (password != verification) {
			return res.json({ message: "Passwords are not the same" });
		}

		const verificationCode = GenerateHash();

		await User.updateOne(
			{ Email: email },
			{ VerificationCode: verificationCode }
		);

		console.log(verificationCode);

		const fullUrl = req.protocol + "://" + req.get("host");

		const context = {
			URL: `${fullUrl}/password-reset/${verificationCode}`,
		};

		SendEmail(email, "Password reset", "password_reset", context);

		res.json({ message: "Email with password reset sent" });
	} catch (error) {
		return res.json({ message: error.toString() });
	}
});

module.exports = router;
