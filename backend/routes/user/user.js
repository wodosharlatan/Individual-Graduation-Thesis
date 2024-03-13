require("dotenv/config");

const express = require("express");
const router = express.Router();
const User = require("../../models/user_model");
const SHA256 = require("crypto-js/sha256");
const SendEmail = require("../../functions/send_email");
const GenerateHash = require("../../functions/generate_hash");
const verify = require("../../functions/verify");
const isNull = require("../../functions/is_empty");

// Save user to database
router.post("/", async (req, res) => {
	try {
		// Check if user already exists by email
		const user = await User.findOne({ Email: req.body.Email });
		if (user) {
			return res.status(400).json({ message: "User already exists" });
		}
		

		// Declare all User Data fields
		const validPassword = req.body.Password;
		const verification = req.body.Verification;
		const validEmail = req.body.Email;
		const validName = req.body.Name;
		const validTelephone = req.body.Telephone;
		const validStreetNumber = req.body.StreetNumber;
		const validZipCode = req.body.ZipCode;
		const validCity = req.body.City;
		let newsletter = req.body.Newsletter;
		let validBirthDate = req.body.BirthDate;
		let validGender = req.body.Gender;

		// Check all User Data fields are provided and valid

		if (
			isNull(validPassword) ||
			validPassword.trim().length < 8 ||
			validPassword.trim().length > 20
		) {
			return res.status(400).json({
				message: "Password must be at between 8 and 20 characters long",
			});
		}

		if (isNull(verification) || verification.trim().length < 8) {
			return res.status(400).json({
				message: "Verification must be at least 8 characters long",
			});
		}

		if (verification != validPassword) {
			return res.status(400).json({ message: "Passwords do not match" });
		}

		if (
			isNull(validEmail) ||
			validEmail.trim().length < 8 ||
			validEmail.trim().length > 100
		) {
			return res.status(400).json({
				message: "Email must be between 8 and 100 characters long",
			});
		}

		// Check if email is valid using this regex [a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?
		// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
		const regexPattern =
			/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

		if (regexPattern.test(validEmail.trim()) !== true) {
			return res.status(400).json({ message: "Email is not valid" });
		}

		if (
			isNull(validName) ||
			validName.trim().length < 2 ||
			validName.trim().length > 100
		) {
			return res.status(400).json({
				message: "Name must be at between 2 and 100 characters long",
			});
		}

		if (isNull(validTelephone) || validTelephone.trim().length < 9) {
			return res.status(400).json({
				message: "Telephone must be at least 9 characters long",
			});
		}

		if (isNull(validStreetNumber) || validStreetNumber.trim().length < 2) {
			return res.status(400).json({
				message: "Street Number must be at least 2 characters long",
			});
		}

		if (
			isNull(validZipCode) ||
			validZipCode.trim().length < 5 ||
			validZipCode.trim().length > 7
		) {
			return res.status(400).json({
				message: "Zip Code must be between 5 and 7 characters long",
			});
		}

		if (isNull(validCity) || validCity.trim().length < 2) {
			return res.status(400).json({
				message: "City must be at least 2 characters long",
			});
		}

		if(isNull(newsletter)){
			newsletter = false;
		}
		else{
			newsletter = true;
		}

		// check if is empty or not
		if (isNull(validGender)){
			validGender = "Not Specified";
		}

		// check if is empty or not AND if is valid date
		if (isNull(validBirthDate)) {
			validBirthDate = "Not Specified";
		}

		const hashedPassword = SHA256(validPassword.trim()).toString();
		const verificationCode = GenerateHash();

		// Create new user
		const newUser = new User({
			Password: hashedPassword,
			Email: validEmail.trim(),
			Name: validName.trim(),
			Telephone: validTelephone.trim(),
			StreetNumber: validStreetNumber.trim(),
			ZipCode: validZipCode.trim(),
			City: validCity.trim(),
			DateOfBirth: validBirthDate.trim(),
			VerificationCode: verificationCode,
			Gender: validGender.trim(),
			Newsletter: newsletter,
		});

		const fullUrl = req.protocol + "://" + req.get("host");

		const context = { URL: `${fullUrl}/API/verify/${verificationCode}` };

		await newUser.save();
		await SendEmail(validEmail, `Ahoj ${validName}`, "verification", context);
		
		res.json({
			message: "User created successfully, Check your email",
		});
	} catch (error) {
		return res.status(500).json({ message: error.toString()});
	}
});

router.post("/login", async (req, res) => {
	try {
		// Check if user exists by email
		if (isNull(req.body.Email) || isNull(req.body.Password)) {
			return res.status(400).json({
				message: "Email or Password is not provided",

			});
		}
		const user = await User.findOne({ Email: req.body.Email });
		if (!user) {
			return res.status(400).json({ message: "User does not exist" });
		}

		// Check if password is correct
		if (SHA256(req.body.Password.trim()).toString() != user.Password) {
			return res.status(400).json({ message: "Password is not correct" });
		}

		// Generate new token
		const newToken = GenerateHash();

		// Update user token
		await User.updateOne(
			{ Email: req.body.Email },
			{ VerificationCode: newToken }
		);

		res.json({ VerificationCode: newToken });
	} catch (error) {
		return res.status(500).json({ message: error.toString()});
	}
});

router.post("/get-all/:CODE", async (req, res) => {
	try {
		const result = await verify(req.params.CODE);
		if(result !== true) {
			return res.status(400).json(result);
		}
		else{
			const users = await User.find();
			users.forEach(element => {
				if(element.IsAdmin){
					users.splice(users.indexOf(element), 1);
				}
			});

			return res.status(200).json(users);

		}
	}catch (error) {
		return res.status(500).json({ message: error.toString()});
	}
});

router.delete("/:CODE", async (req, res) => {
	try {
		const result = await verify(req.params.CODE);
		if(result !== true) {
			return res.status(400).json(result);
		}
		else{
			const user = await User.findOneAndDelete(req.body.userID);
			if (!user) {
				return res.status(400).json({ message: "User does not exist" });
			}
			return res.status(200).json({ message: "User deleted successfully" });
		}
	}
	catch (error) {
		return res.status(500).json({ message: error.toString()});
	}
});


router.get("/zmena-udaju/:CODE", async (req, res) => {
	try {
		const user = await User.findOne({ VerificationCode: req.params.CODE });
		return res.status(200).json(user);
	}
	catch (error) {
		return res.status(500).json({ message: error.toString()});
	}
});

router.post("/zmena-udaju", async (req, res) => {
	try {
		// Check if user already exists by email
		const user = await User.findOne({ VerificationCode: req.body.UserToken });
		if (!user) {
			return res.status(400).json({ message: "User does not exist" });
		}
		

		// Declare all User Data fields
		const validName = req.body.Name;
		const validTelephone = req.body.Telephone;
		const validStreetNumber = req.body.StreetNumber;
		const validZipCode = req.body.ZipCode;
		const validCity = req.body.City;

		// Check all User Data fields are provided and valid

		if (
			isNull(validName) ||
			validName.trim().length < 2 ||
			validName.trim().length > 100
		) {
			return res.status(400).json({
				message: "Name must be at between 2 and 100 characters long",
			});
		}

		if (isNull(validTelephone) || validTelephone.trim().length < 9) {
			return res.status(400).json({
				message: "Telephone must be at least 9 characters long",
			});
		}

		if (isNull(validStreetNumber) || validStreetNumber.trim().length < 2) {
			return res.status(400).json({
				message: "Street Number must be at least 2 characters long",
			});
		}

		if (
			isNull(validZipCode) ||
			validZipCode.trim().length < 5 ||
			validZipCode.trim().length > 7
		) {
			return res.status(400).json({
				message: "Zip Code must be between 5 and 7 characters long",
			});
		}

		if (isNull(validCity) || validCity.trim().length < 2) {
			return res.status(400).json({
				message: "City must be at least 2 characters long",
			});
		}

		const verificationCode = GenerateHash();


		console.log(user)

		// Update The User
		await User.findOneAndUpdate(
			{
				Email: user.Email
			},
			{
				Name: validName.trim(),
				Telephone: validTelephone.trim(),
				StreetNumber: validStreetNumber.trim(),
				ZipCode: validZipCode.trim(),
				City: validCity.trim(),
				VerificationCode: verificationCode,
			}
		);

		return res.json({message: verificationCode});
	
	} catch (error) {
		return res.status(500).json({ message: error.toString()});
	}
});

module.exports = router;
