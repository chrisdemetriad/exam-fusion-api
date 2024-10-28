const dvlaController = require("../controllers/dvla.controller");

async function dvlaRoutes(fastify, options) {
	fastify.get("/", dvlaController.getAllTests);
}

module.exports = dvlaRoutes;
