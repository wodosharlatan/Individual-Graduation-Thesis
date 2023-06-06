const express = require("express");
const router = express.Router();
const User = require("../models/user_model");

// Import .env variables
require("dotenv/config");

// Save user to database
router.post("/", async (req, res) => {
	try {
		// Check if user already exists by email
		User.findOne({ Email: req.body.Email }, (user) => {
			if (user) {
				return res.json({ message: "User already exists" });
			}
		});

		// Check all User Data fields are provided and valid
		//Password - Email - Name - Surname - Telephone - StreetNumber - ZipCode - City - Country

		const validPassword = req.body.Password;
		if (validPassword.trim().length >= 8 || validPassword.trim().length <= 20) {
			return res.json({
				message: "Password must be at between 8 20 characters long",
			});
		}

		const validEmail = req.body.Email;
		if (validEmail.trim().length >= 8 || validEmail.trim().length <= 100) {
			return res.json({
				message: "Email must be between 8 and 100 characters long",
			});
		}

		// Check if email is valid using this regex [a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?
		// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
		const regexPattern =
			/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

		if (regexPattern.test(validEmail) !== true) {
			return res.json({ message: "Email is not valid" });
		}

		const validName = req.body.Name;
		if (validName.trim().length >= 2 || valideName.trim().length <= 100) {
			return res.json({
				message: "Name must be at between 2 and 100 characters long",
			});
		}

		const validSurname = req.body.Surname;
		if (validSurname.trim().length >= 2 || validSurname.trim().length <= 100) {
			return res.json({
				message: "Surname must be at between 2 and 100 characters long",
			});
		}

		const validTelephone = req.body.Telephone;
		if (validTelephone.trim().length >= 9) {
			return res.json({
				message: "Telephone must be at least 9 characters long",
			});
		}

		// Check if telephone is valid using this regex ^(\+420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$
		// https://www.regularnivyrazy.info/telefonni-cislo.html

		const regexPattern2 = /^(\+420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/;
		if (regexPattern2.test(validTelephone)) {
			return res.json({ message: "Telephone Number is not valid" });
		}

		const validStreetNumber = req.body.StreetNumber;
		if (validStreetNumber.trim().length >= 2) {
			return res.json({
				message: "Street Number must be at least 2 characters long",
			});
		}

		const validZipCode = req.body.ZipCode;
		if (validZipCode.trim().length >= 5 || validZipCode.trim().length <= 6) {
			return res.json({
				message: "Zip Code must be between 5 and 6 characters long",
			});
		}

		const validCity = req.body.City;
		if (validCity.trim().length >= 2) {
			return res.json({ message: "City must be at least 2 characters long" });
		}

		const validCountry = req.body.Country;
		if (validCountry.trim().length >= 2) {
			return res.json({
				message: "Country must be at least 2 characters long",
			});
		}

		// check if is empty or not
		let validGender = req.body.Gender;

		if (validGender.trim().length === 0) {
			validGender = "Not Specified";
		}

		let validBirthDate = req.body.BirthDate;
		// check if is empty or not AND if is valid date
		if (validBirthDate.trim().length === 0) {
			validBirthDate = "Not Specified";
		}

		// Create new user
		const newUser = new User({
			Password: validPassword.trim(),
			Email: validEmail.trim(),
			Name: validName.trim(),
			Surname: validSurname.trim(),
			Telephone: validTelephone.trim(),
			StreetNumber: validStreetNumber.trim(),
			ZipCode: validZipCode.trim(),
			City: validCity.trim(),
			Country: validCountry.trim(),
			DateOfBirth: validBirthDate.trim(),
			Gender: validGender.trim(),
		});

		await newUser.save();

		res.json({ message: "User created successfully" });
	} catch (error) {
		console.error("Error creating user:", error);
		return res.json({ error: "Failed to create user" });
	}
});

module.exports = router;
