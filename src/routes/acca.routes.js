const accaController = require("../controllers/acca.controller");

async function accaRoutes(fastify, options) {
	fastify.get("/", accaController.getAllTests);
	fastify.get("/attempted", accaController.getAttemptedTests);
	fastify.get("/leaderboard", accaController.getLeaderboard);
	fastify.post("/save", accaController.saveTest);
}

module.exports = accaRoutes;
