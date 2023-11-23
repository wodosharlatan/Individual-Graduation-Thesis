const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	// User fields
	Email: {
		type: String,
		required: true,
	},
	Password: {
		type: String,
		required: true,
	},
	DateOfBirth: {
		type: String,
		required: false,
	},
	Gender: {
		type: String,
		required: false,
	},
	Name: {
		type: String,
		required: true,
	},
	Telephone: {
		type: String,
		required: true,
	},
	StreetNumber: {
		type: String,
		required: true,
	},
	ZipCode: {
		type: String,
		required: true,
	}, 
	City: {
		type: String,
		required: true,
	},

	// System fields
	VerificationCode: {
		type: String,
	},
	Verified: {
		type: Boolean,
		default: false,
	},
	TemporaryPassword: {
		type: String,
		default: "",
	},
});

module.exports = mongoose.model("Users", userSchema);
