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
		const { limit } = request.query;

		const test = await Test.findById(id);

		if (test && test.provider === provider) {
			if (limit) {
				test.questions = test.questions.sort(() => Math.random() - 0.5);
				test.questions = test.questions.slice(0, Number.parseInt(limit, 10));
			}
			reply.send(test);
		} else if (test) {
			reply
				.status(400)
				.send({ message: "It doesn't belong to requested provider" });
		} else {
			reply.status(404).send({ message: "Couldn't find test" });
		}
	} catch (error) {
		console.error("Can't fetch test by id", error);
		reply.status(500).send({ message: "Internal server error", error });
	}
}

async function getUserProgress(request, reply) {
	try {
		const { userId } = request.params;

		const progressData = await TestAttempt.find({ userId })
			.populate("testId", "provider title")
			.lean();

		if (progressData.length === 0) {
			reply
				.status(404)
				.send({ message: "Couldn't find any progress data for you" });
			return;
		}

		reply.send(progressData);
	} catch (error) {
		console.error("Couldn't fetch user progress", error);
		reply.status(500).send({ message: "Couldn't fetch user progress", error });
	}
}

async function saveTestAttempt(request, reply) {
	try {
		const { userId, startTime, finishTime, score, number, wrong } =
			request.body;
		const { id: testId } = request.params;

		const newTestAttempt = new TestAttempt({
			userId,
			testId,
			startTime,
			finishTime,
			score,
			number,
			wrong,
		});

		await newTestAttempt.save();
		reply.send({ success: true, message: "Test attempt saved" });
	} catch (error) {
		console.error("Couldn't save the test attempt", error);
		reply.status(500).send({
			success: false,
			message: "Couldn't save the test attempt",
			error: error.message,
		});
	}
}

module.exports = {
	getAllProviders,
	getTestsByProvider,
	getUserProgress,
	getTestById,
	saveTestAttempt,
};
