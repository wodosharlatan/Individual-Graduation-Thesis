require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const config = require("./config");
let server;

// SSL
app.use(express.urlencoded({ extended: true, limit: "3mb" }));
app.use(express.json({ limit: "3mb" }));

// CORS
app.use(cors());

// Parse JSON
app.use(bodyParser.json());

// Import routes
const userRoute = require("./routes/user");

// Use routes
app.use("/users", userRoute);

// Routes
app.get("/*", (req, res) => {
	res.json({ message: "Invalid URL" });
});

// Start server Based on environment
const environment = process.env.NODE_ENV || "production";

if (environment === "production") {
	const options = config.production.sslOptions;
	server = https.createServer(options, app);
}

else {
	const options = {
		key: fs.readFileSync("./key.pem"),
		cert: fs.readFileSync("./cert.pem"),
	};
	server = https.createServer(options, app);
}


server.listen(PORT, HOST, () => {
	console.log(`Server running on https://${HOST}:${PORT}`);
});

// Connect to MongoDB
const dbConnection =
	environment === "production"
		? config.production.dbConnection
		: config.development.dbConnection;

mongoose
	.connect(dbConnection, { useNewUrlParser: true })
	.then(() => console.log("Connected to MongoDB!"))
	.catch((error) => console.error("Error connecting to MongoDB", error));
