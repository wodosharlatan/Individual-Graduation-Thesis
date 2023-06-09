// Import .env variables
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

// SSL
app.use(express.urlencoded({ extended: true, limit: "3mb" }));
app.use(express.json({ limit: "3mb" }));

// CORS
app.use(cors());

// Parse JSON
app.use(bodyParser.json());


// Check API key 
app.use((req, res, next) => {
	const providedApiKey = req.headers["x-api-key"];
	if (!providedApiKey || providedApiKey !== process.env.API_KEY) {
		return res.status(401).json({ message: "Invalid API key" });
	}
	next();
});


// Import routes
const userRoute = require("./routes/user");

// Use routes
app.use("/users", userRoute);


// Handle invalid URL
app.get("/*", (req, res) => {
	res.json({ message: "Invalid URL" });
});

// Start server Based on environment
const environment = process.env.NODE_ENV || "production";

// Check if SSL is enabled based on environment
if (environment === "production") {
	app.listen(PORT, HOST, () => {
		console.log(`Server is running on https://${HOST}:${PORT}`);
	});

	mongoose
		.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
		.then(() => console.log("Connected to MongoDB!"))
		.catch((error) => console.error("Error connecting to MongoDB", error));
}

// Check if SSL is enabled based on environment
else {
	// SSL
	const options = {
		key: fs.readFileSync("./key.pem"),
		cert: fs.readFileSync("./cert.pem"),
	};

	// Create HTTPS server
	const server = https.createServer(options, app);

	// Start server
	server.listen(PORT, HOST, () => {
		console.log(`Server is running on https://${HOST}:${PORT}`);
	});

	// Connect to MongoDB based on environment
	mongoose
		.connect(process.env.DB_CONNECTION_DEV, { useNewUrlParser: true })
		.then(() => console.log("Connected to MongoDB!"))
		.catch((error) => console.error("Error connecting to MongoDB", error));
}
