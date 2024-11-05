const mongoose = require("mongoose");
const fs = require("node:fs");
require("dotenv").config({ path: `${__dirname}/../../.env` });

const AccaTest = require("./../models/acca.model");

const loadTestData = () => {
	try {
		const data = fs.readFileSync(`${__dirname}/accaAllQuestions.json`, "utf8");
		return JSON.parse(data);
	} catch (error) {
		console.error("Can't read the JSON file", error);
		process.exit(1);
	}
};

const accaTestData = loadTestData();

const seedDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		await AccaTest.deleteMany({});
		await AccaTest.insertMany(accaTestData);
		console.log("\x1b[32mTest data seeded successfully!\x1b[0m");
	} catch (error) {
		console.error("\x1b[31mError seeding data:\x1b[0m", error);
	} finally {
		mongoose.connection.close();
	}
};

seedDB();
