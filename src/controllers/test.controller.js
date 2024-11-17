require("dotenv").config();

const TestAttempt = require("../models/testAttempt.model");
const Test = require("../models/test.model");

async function getAllProviders(request, reply) {
	try {
		const tests = await Test.find({}, "provider level title description");
		reply.send(tests);
	} catch (error) {
		reply.status(500).send(error);
	}
}

async function getTestsByProvider(request, reply) {
	try {
		const { provider } = request.params;
		const tests = await Test.find({ provider });
		reply.send(tests);
	} catch (error) {
		reply.status(500).send(error);
	}
}

async function getTestById(request, reply) {
	try {
		const { provider, id } = request.params;
		const test = await Test.findOne({ provider, _id: id });
		if (test) {
			reply.send(test);
		} else {
			reply.status(404).send({ message: "Could not find test" });
		}
	} catch (error) {
		reply.status(500).send(error);
	}
}

async function saveTestAttempt(request, reply) {
	try {
		const { userId, testType, startTime, finishTime, wrong } = request.body;

		const newTestAttempt = new TestAttempt({
			userId,
			testType,
			startTime,
			finishTime,
			wrong,
		});

		await newTestAttempt.save();
		reply.send({ success: true, message: "Test attempt saved" });
	} catch (error) {
		reply.status(500).send({
			success: false,
			message: "Couldn't save the test attempt",
			error,
		});
	}
}

module.exports = {
	getAllProviders,
	getTestsByProvider,
	getTestById,
	saveTestAttempt,
};
