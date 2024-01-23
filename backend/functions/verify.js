const User =  require("../models/user_model");

async function verify(code) {
	try {
		const user = await User.findOne({ VerificationCode: code });

		if (!user) {
			return { message: "User not found" }
		}

		if (user.IsAdmin == false) {
			return { message: "User is not an admin" }
		}

		return true;
	} catch (error) {
		return { message: error.toString() };
	}
}

module.exports = verify;

