const mongoose = require("mongoose");
const fs = require("node:fs");
require("dotenv").config();

const Test = require("./../models/test.model");
const TestAttempt = require("./../models/testAttempt.model");

const loadTestData = (fileName) => {
	try {
		const data = fs.readFileSync(`${__dirname}/${fileName}`, "utf8");
		return JSON.parse(data);
	} catch (error) {
		console.error(`Can't read the JSON file from ${fileName}`, error);
		process.exit(1);
	}
};

const seedDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		await Test.deleteMany({});
		await TestAttempt.deleteMany({});

		const accaTestData = loadTestData("accaTests.json");
		const cimaTestData = loadTestData("cimaTests.json");
		const acaTestData = loadTestData("acaTests.json");
		const aatTestData = loadTestData("aatTests.json");

		await Test.insertMany([
			...accaTestData,
			...cimaTestData,
			...acaTestData,
			...aatTestData,
		]);

		console.log("\x1b[32mTest data seeded successfully!\x1b[0m");
	} catch (error) {
		console.error("\x1b[31mError seeding data:\x1b[0m", error);
	} finally {
		mongoose.connection.close();
	}
};

seedDB();
