// import dotenv
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

// SSL options
const options = {
	key: fs.readFileSync("key.pem"),
	cert: fs.readFileSync("cert.pem"),
};

// CORS
app.use(cors());

// Parse JSON
app.use(bodyParser.json());

// import routes
const userRoute = require("./routes/user");

// Use routes
app.use("/users", userRoute);

// Routes
app.get("/*", (req, res) => {
	res.json({ message: "Invalid URL" });
	res.redirect("/");
});

https.createServer(options, app).listen(PORT, HOST, () => {
	console.log(`Server running on http://${HOST}:${PORT}`);
});

// Connect to MongoDB
mongoose
	.connect(process.env.DB_CONNECTION_DEV, { useNewUrlParser: true })
	.then(() => console.log("Connected To MongoDB !"))
	.catch((error) => console.error("Error Connecting To MongoDB", error));
// Connect to MongoDB
