import * as dotenv from "dotenv";
dotenv.config();

import Fastify from "fastify";
import testRoutes from "../src/routes/test.routes";
import connectToDatabase from "../src/createDbConnection";

const app = Fastify({
	logger: true,
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
