const fastify = require("fastify")({ logger: true });
const cors = require("@fastify/cors");
const mongoose = require("mongoose");
require("dotenv").config();
const testRoutes = require("./routes/test.routes");

fastify.register(cors, {
	origin: "http://localhost:4000",
	methods: ["GET", "POST"],
});

fastify.register(testRoutes);

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
