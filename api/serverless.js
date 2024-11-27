import * as dotenv from "dotenv";
dotenv.config();

import Fastify from "fastify";
import cors from "@fastify/cors";
import testRoutes from "../src/routes/test.routes";
import { connectToDatabase } from "../src/mongo";

const app = Fastify({
	logger: true,
});

app.register(cors, {
	origin: ["http://localhost:4000", "https://exam-fusion.vercel.app"],
	methods: ["GET", "POST"],
});

app.register(testRoutes);

export default async (req, res) => {
	try {
		console.log("Serverless Mongo connection");
		await connectToDatabase();
	} catch (error) {
		console.error("Couldn't connect to Mongo", error);
		res.statusCode = 500;
		return res.end(JSON.stringify({ error: "Couldn't connect to Mongo" }));
	}

	await app.ready();
	app.server.emit("request", req, res);
};
