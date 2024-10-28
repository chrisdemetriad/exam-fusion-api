const accaController = require("../controllers/acca.controller");

async function accaRoutes(fastify, options) {
	fastify.get("/", accaController.getAllTests);
}

module.exports = accaRoutes;
