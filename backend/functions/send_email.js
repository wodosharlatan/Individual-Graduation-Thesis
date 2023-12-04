require("dotenv").config();

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

transporter.use("compile", hbs(handlebarOptions));

async function SendEmail(user, subject, template, context) {

	const mailOptions = {
		from: '"Dárky z pedigu" <darky_z_pedigu@gmail.com>',
		template: template,
		to: user,
		subject: subject,
		context: context,
	};

	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.log(error);
	}
}

module.exports = SendEmail;