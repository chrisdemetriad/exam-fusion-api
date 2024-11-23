const testController = require("../controllers/test.controller");

const PREFIX = "/api/v1/tests";

async function testRoutes(fastify, options) {
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
