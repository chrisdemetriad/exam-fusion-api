const mongoose = require("mongoose");

let mongooseConnectionPromise = null;

async function connectToDatabase() {
	console.log("connectToDatabase();");
	if (!mongooseConnectionPromise) {
		mongoose.set("debug", true);
		mongooseConnectionPromise = mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 20000,
			maxPoolSize: 10,
		});

		mongoose.connection.once("connected", () => {
			console.log("Mongo connected");
		});

		mongoose.connection.on("error", (error) => {
			console.error("Mongo connection error: ", error);
			mongooseConnectionPromise = null;
		});
	}

	try {
		await mongooseConnectionPromise;

		if (mongoose.connection.readyState !== 1) {
			throw new Error("Mongo connection isn't ready");
		}
	} catch (error) {
		console.error("Couldn't connect to Mongo: ", error);
		throw new Error("Mongo connection failed");
	}
}

module.exports = connectToDatabase;
