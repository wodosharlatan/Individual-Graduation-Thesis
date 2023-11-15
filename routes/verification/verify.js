require("dotenv/config");

const express = require("express");
const router = express.Router();
const User = require("../../models/user_model");
const path = require("path");

router.get("/:CODE", async (req, res) => {
	try {
		const user = await User.findOne({ VerificationCode: req.params.CODE });
		if (!user) {
			return res.status(404).sendFile(
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

module.exports = router;
