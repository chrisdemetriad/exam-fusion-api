const testController = require("../controllers/test.controller");
const mongoose = require("mongoose");
const PREFIX = "/api/v1/tests";

const connectToDatabase = require("../mongo");

async function testRoutes(fastify, options) {
	fastify.get("/status", async (request, reply) => {
		try {
			if (mongoose.connection.readyState !== 1) {
				console.log("Mongo not connected, trying to reconnect");
				await connectToDatabase();
			}

			if (mongoose.connection.readyState === 1) {
				return reply.send({
					status: "API is running",
					dbStatus: "Connected",
				});
			}

			throw new Error("Database isn't really connected");
		} catch (error) {
			return reply.status(500).send({
				status: "Error",
				message: error.message,
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
