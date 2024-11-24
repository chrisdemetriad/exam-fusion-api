const fastify = require("fastify")({ logger: true });
const cors = require("@fastify/cors");
require("dotenv").config();
const testRoutes = require("./routes/test.routes");
const { connectToDatabase, closeMongoConnection } = require("./mongo");

fastify.register(cors, {
	origin: ["http://localhost:4000", "https://exam-fusion-api.vercel.app"],
	methods: ["GET", "POST"],
});

fastify.register(testRoutes);

fastify.addHook("onRequest", async (request, reply) => {
	try {
		await connectToDatabase();
	} catch (error) {
		console.error("Mongo connection issue during request: ", error);
		reply.status(500).send({ error: "Mongo connection failed" });
	}
});

const startFastify = async () => {
	try {
		const port = process.env.PORT ?? 5000;
		await fastify.listen({ port });
		fastify.log.info(`API running on port ${port}`);
	} catch (error) {
		fastify.log.error(error);
		process.exit(1);
	}
};

startFastify();

const handleExit = async (signal) => {
	console.log(`Received ${signal}. Closing MongoDB connection...`);
	await closeMongoConnection();
	process.exit(0);
};

process.on("SIGINT", handleExit);
process.on("SIGTERM", handleExit);
