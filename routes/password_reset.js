require("dotenv/config");

const express = require("express");
const router = express.Router();
const User = require("../models/user_model");
const SendEmail = require("../functions/send_email");

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

		if (password.trim().length <= 8 || password.trim().length >= 20) {
			return res.json({
				message: "Password must be at between 8 20 characters long",
			});
		}

		if (password != verification) {
			return res.json({ message: "Passwords are not the same" });
		}

        const email_user = {
            email: email
        }

        const context = {
            email: email,
            password: password
        }

       

		res.json({ message: "Email with password reset sent" });
	} catch (error) {
		return res.json({ message: error.toString() });
	}
});

module.exports = router;