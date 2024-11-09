const mongoose = require("mongoose");
require("dotenv").config();

const TestAttempt = require("../models/accaTestAttempt");
const AccaTest = require("../models/acca.model.js");

async function getAllTests(request, reply) {
	try {
		const allTests = await AccaTest.find();
		reply.send(allTests);
	} catch (error) {
		reply.status(500).send(error);
	}
}

async function getAttemptedTests(request, reply) {
	try {
		const attemptedTests = await TestAttempt.find();
		reply.send(attemptedTests);
	} catch (error) {
		reply.status(500).send(error);
	}
}

async function getLeaderboard(request, reply) {
	try {
		const attemptedTests = await TestAttempt.find();
		reply.send(attemptedTests);
	} catch (error) {
		reply.status(500).send(error);
	}
}

async function saveTest(request, reply) {
	try {
		const { userId, testType, startTime, finishTime, wrongAnswers } =
			request.body;

		const newTestAttempt = new TestAttempt({
			userId,
			testType,
			startTime,
			finishTime,
			wrongAnswers,
		});

		await newTestAttempt.save();
		reply.send({ success: true, message: "Test saved" });
	} catch (error) {
		reply
			.status(500)
			.send({ success: false, message: "Couldn't save the test", error });
	}
}

module.exports = {
	getAttemptedTests,
	getAllTests,
	saveTest,
	getLeaderboard,
};
