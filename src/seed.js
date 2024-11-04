const mongoose = require("mongoose");
require("dotenv").config();

const AccaTest = require("./models/acca.model");

const accaTestData = [
	{
		title: "ACCA Test 1",
		description: "Description for ACCA Test 1",
		questions: [
			{
				questionText: "What is management?",
				answerType: "radio",
				possibleAnswers: [
					{ answerText: "Planning", isCorrect: true },
					{ answerText: "Organising" },
					{ answerText: "Leading" },
					{ answerText: "Controlling" },
				],
			},
			{
				questionText: "Explain this scenario:",
				answerType: "textInput",
				keywords: ["management", "planning", "organization"],
			},
		],
	},
];

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
