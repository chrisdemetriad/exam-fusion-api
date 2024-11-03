const TestAttempt = require("../models/accaTestAttempt");

async function getAllTests(request, reply) {
	try {
		reply.send("Not implemented yet");
	} catch (error) {
		reply.status(500).send(error);
	}
}

async function saveTest(request, reply) {
	try {
		console.log(`Request body: ${request.body}`);
		const { userId, testType, startTime, finishTime, wrongAnswers } =
			request.body;

		const testAttempt = new TestAttempt({
			userId,
			testType,
			startTime,
			finishTime,
			wrongAnswers,
		});

		await testAttempt.save();
		reply.send({ success: true, message: "Test saved" });
	} catch (error) {
		reply
			.status(500)
			.send({ success: false, message: "Couldn't save the test", error });
	}
}

module.exports = {
	getAllTests,
	saveTest,
};
