const fastify = require("fastify")({ logger: true });
const cors = require("@fastify/cors");
const mongoose = require("mongoose");
require("dotenv").config();
const testRoutes = require("./routes/test.routes");

fastify.register(cors, {
	origin: ["http://localhost:4000", "https://exam-fusion-api.vercel.app"],
	methods: ["GET", "POST"],
});

fastify.register(testRoutes);

let isMongoConnected = false;

const connectToMongo = async () => {
	if (isMongoConnected) return;

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		isMongoConnected = true;
		console.log("DB connected");
	} catch (error) {
		console.error("DB connection error:", error);
		process.exit(1);
	}
};

const closeMongoConnection = async () => {
	if (isMongoConnected) {
		await mongoose.disconnect();
		console.log("DB connection closed");
	}
};

fastify.addHook("onRequest", async (request, reply) => {
	await connectToMongo();
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
	await closeMongoConnection();
	process.exit(0);
};

process.on("SIGINT", handleExit);
process.on("SIGTERM", handleExit);
