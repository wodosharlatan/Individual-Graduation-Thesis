require("dotenv/config");

const express = require("express");
const router = express.Router();
const User = require("../../models/user_model");
const path = require("path");

router.get("/:CODE", async (req, res) => {
	try {
		const user = await User.findOne({ VerificationCode: req.params.CODE });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		await User.updateMany(
			{ VerificationCode: req.params.CODE },
			{
			  $set: {
				Verified: "true",
			  }
			}
		  );

		res.sendFile(path.join(__dirname, "..", "..", "dist", "index.html"));
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
});

module.exports = router;
