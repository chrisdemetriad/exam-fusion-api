const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");
require("dotenv").config();
const accaRoutes = require("./routes/acca.routes");
const dvlaRoutes = require("./routes/dvla.routes");

fastify.register(accaRoutes, { prefix: "/api/v1/tests/acca" });
fastify.register(dvlaRoutes, { prefix: "/api/v1/tests/dvla" });

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("\x1b[32mDB connected\x1b[0m");
		const start = async () => {
			try {
				await fastify.listen({ port: process.env.PORT ?? 5000 });
				fastify.log.info(`API running on ${fastify.server.address().port}`);
			} catch (error) {
				fastify.log.error(error.err);
				process.exit(1);
			}
		};
		start();
	})
	.catch((error) => {
		console.error("DB connection error:", error);
		process.exit(1);
	});
