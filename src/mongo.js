const mongoose = require("mongoose");

let isMongoConnected = false;

const connectToDatabase = async () => {
	if (isMongoConnected) {
		console.log("MongoDB is already connected");
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverSelectionTimeoutMS: 5000,
		});

		mongoose.connection.once("connected", () => {
			console.log("MongoDB connected successfully");
		});

		mongoose.connection.on("error", (error) => {
			console.error("MongoDB connection error:", error);
			isMongoConnected = false;
		});

		isMongoConnected = true;
	} catch (error) {
		console.error("Failed to connect to MongoDB:", error);
		throw new Error("Database connection failed");
	}
};

const closeMongoConnection = async () => {
	if (isMongoConnected) {
		try {
			await mongoose.disconnect();
			isMongoConnected = false;
			console.log("DB connection closed");
		} catch (error) {
			console.error("Error closing MongoDB connection:", error);
		}
	} else {
		console.log("No active MongoDB connection to close");
	}
};

module.exports = {
	connectToDatabase,
	closeMongoConnection,
};
