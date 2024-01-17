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
const fileUpload = require('express-fileupload');
const path = require("path");

// SSL
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));

// CORS
app.use(cors());

// Parse JSON
app.use(bodyParser.json());

// File upload
app.use(
    fileUpload({
        limits: {
            fileSize: 10000000, // Around 10MB
        },
        abortOnLimit: true,
    })
);

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// Import routes
const userRoute = require("./routes/user/user");
const passwordResetRoute = require("./routes/password_reset/password_reset");
const verificationRoute = require("./routes/verification/verify");
const ProductRoute = require("./routes/new_product/new_product");


// Use routes
app.use("/API/users", userRoute);
app.use("/API/verify", verificationRoute);
app.use("/API/password-reset", passwordResetRoute);
app.use("/API/products", ProductRoute);

// Home route
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// 404 route
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "dist", "index.html"));
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
