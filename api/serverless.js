import * as dotenv from "dotenv";
dotenv.config();

import Fastify from "fastify";
import testRoutes from "../src/routes/test.routes";

const app = Fastify({
	logger: true,
});

app.register(testRoutes);

export default async (req, res) => {
	await app.ready();
	app.server.emit("request", req, res);
};
