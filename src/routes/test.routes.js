const testController = require("../controllers/test.controller");

async function testRoutes(fastify, options) {
	fastify.get("/", testController.getAllProviders);
	fastify.get("/:provider", testController.getTestsByProvider);
	fastify.get("/:provider/:id", testController.getTestById);
	fastify.post("/:provider/:id/attempt", testController.saveTestAttempt);
	fastify.get("/progress/:userId", testController.getUserProgress);
	fastify.get("/leaderboard", testController.getLeaderboard);
}

module.exports = testRoutes;
