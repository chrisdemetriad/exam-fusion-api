const testController = require("../controllers/test.controller");
const mongoose = require("mongoose");
const PREFIX = "/api/v1/tests";

async function testRoutes(fastify, options) {
	fastify.get("/status", async (request, reply) => {
		try {
			const mongoStatus = mongoose.connection.readyState;

			if (mongoStatus !== 1) {
				return reply.status(500).send({
					status: "Error",
					message: "Database isn't really connected - duh",
				});
			}

			return reply.send({
				status: "API is running",
				mongoStatus: "Connected",
			});
		} catch (error) {
			return reply.status(500).send({
				status: "Error",
				message: "Test check failed",
				error: error.message,
			});
		}
	});

	fastify.get(`${PREFIX}/all`, testController.getAllProviders);
	fastify.get(`${PREFIX}/:provider`, testController.getTestsByProvider);
	fastify.get(`${PREFIX}/:provider/:id`, testController.getTestById);
	fastify.post(
		`${PREFIX}/:provider/:id/attempt`,
		testController.saveTestAttempt,
	);
	fastify.get(`${PREFIX}/progress/:userId`, testController.getUserProgress);
	fastify.get(`${PREFIX}/leaderboard`, testController.getLeaderboard);

	fastify.get("/", testController.getStatus);
}

module.exports = testRoutes;
