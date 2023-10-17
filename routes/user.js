require("dotenv/config");

const express = require("express");
const router = express.Router();
const User = require("../models/user_model");
const SHA256 = require("crypto-js/sha256");
const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");

let transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.GMAIL_ADD,
		pass: process.env.NODE_MAILER_PASSWORD,
	},
});

const handlebarOptions = {
	viewEngine: {
		partialsDir: path.resolve("./email_templates"),
		defaultLayout: false,
	},
	viewPath: path.resolve("./email_templates"),
};

// use a template file with nodemailer
transporter.use("compile", hbs(handlebarOptions));

async function SendMail(user) {
	const mailOptions = {
		from: '"Moje Drevarstvi" <mojedrevarstvi@gmail.com>',
		template: "verification",
		to: user.email,
		subject: `Vitej ${user.name}`,
		context: {
			name: user.name,
			company: "my company",
		},
	};

	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.log(error);
	}
}

// Save user to database
router.post("/", async (req, res) => {
	try {
		// Check if user already exists by email
		const user = await User.findOne({ Email: req.body.Email });
		if (user) {
			return res.json({ message: "User already exists" });
		}

		// Declare all User Data fields
		const validPassword = req.body.Password;
		const validEmail = req.body.Email;
		const validName = req.body.Name;
		const validSurname = req.body.Surname;
		const validTelephone = req.body.Telephone;
		const validStreetNumber = req.body.StreetNumber;
		const validZipCode = req.body.ZipCode;
		const validCity = req.body.City;
		let validBirthDate = req.body.BirthDate;
		let validGender = req.body.Gender;

		// Check all User Data fields are provided and valid

		if (
			validPassword == undefined ||
			validPassword.trim().length <= 8 ||
			validPassword.trim().length >= 20
		) {
			return res.json({
				message: "Password must be at between 8 20 characters long",
			});
		}

		if (
			validEmail == undefined ||
			validEmail.trim().length <= 8 ||
			validEmail.trim().length >= 100
		) {
			return res.json({
				message: "Email must be between 8 and 100 characters long",
			});
		}

		// Check if email is valid using this regex [a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?
		// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
		const regexPattern =
			/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

		if (regexPattern.test(validEmail.trim()) !== true) {
			return res.json({ message: "Email is not valid" });
		}

		if (
			validName == undefined ||
			validName.trim().length <= 2 ||
			validName.trim().length >= 100
		) {
			return res.json({
				message: "Name must be at between 2 and 100 characters long",
			});
		}

		if (
			validSurname == undefined ||
			validSurname.trim().length <= 2 ||
			validSurname.trim().length >= 100
		) {
			return res.json({
				message: "Surname must be at between 2 and 100 characters long",
			});
		}

		if (validTelephone == undefined || validTelephone.trim().length <= 9) {
			return res.json({
				message: "Telephone must be at least 9 characters long",
			});
		}

		// ACCEPTS ONLY FORMAT +420-123-456-789 OR 420-123-456-789 OR 123-456-789
		// Check if telephone is valid using this regex ^(\+420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$
		// https://www.regularnivyrazy.info/telefonni-cislo.html

		const regexPattern2 = /^(\+420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/;
		if (regexPattern2.test(validTelephone.trim())) {
			return res.json({ message: "Telephone Number is not valid" });
		}

		if (
			validStreetNumber == undefined ||
			validStreetNumber.trim().length <= 2
		) {
			return res.json({
				message: "Street Number must be at least 2 characters long",
			});
		}

		if (
			validZipCode == undefined ||
			validZipCode.trim().length <= 5 ||
			validZipCode.trim().length >= 7
		) {
			return res.json({
				message: "Zip Code must be between 5 and 7 characters long",
			});
		}

		if (validCity == undefined || validCity.trim().length <= 2) {
			return res.json({ message: "City must be at least 2 characters long" });
		}

		// check if is empty or not
		if (validGender === undefined) {
			validGender = "Not Specified";
		}

		// check if is empty or not AND if is valid date
		if (validBirthDate === undefined) {
			validBirthDate = "Not Specified";
		}

		const hashedPassword = SHA256(validPassword.trim());

		// Create new user
		const newUser = new User({
			Password: hashedPassword,
			Email: validEmail.trim(),
			Name: validName.trim(),
			Surname: validSurname.trim(),
			Telephone: validTelephone.trim(),
			StreetNumber: validStreetNumber.trim(),
			ZipCode: validZipCode.trim(),
			City: validCity.trim(),
			DateOfBirth: validBirthDate.trim(),
			Gender: validGender.trim(),
		});

		const emailTemplate = {
			name: validName,
			email: validEmail,
			verification: SHA256(Math.floor(Math.random() * 10)).toString(),
			URL: "http://localhost:3000/verify",
		};

		// await newUser.save();
		await SendMail(emailTemplate);

		res.json({ message: "User created successfully, Check your email" });
	} catch (error) {
		return res.json({ message: error.toString() });
	}
});

router.post("/login", async (req, res) => {
	try {
		// Check if user exists by email
		if (req.body.Email == undefined || req.body.Password == undefined) {
			return res.json({ message: "Email or Password is not provided" });
		}
		const user = await User.findOne({ Email: req.body.Email });
		if (!user) {
			return res.json({ message: "User does not exist" });
		}

		// Check if password is correct
		if (SHA256(req.body.Password.trim()) != user.Password) {
			return res.json({ message: "Password is not correct" });
		}

		// Generate new token
		const newToken = SHA256(Math.floor(Math.random() * 1000)).toString();

		// Update user token
		await User.updateOne({ Email: req.body.Email }, { UserToken: newToken });

		res.json({ token: newToken });
	} catch (error) {
		return res.json({ message: error.toString() });
	}
});

module.exports = router;
