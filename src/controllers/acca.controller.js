async function getAllTests(request, reply) {
	try {
		reply.send("Not implemented yet");
	} catch (error) {
		reply.status(500).send(error);
	}
}

module.exports = {
	getAllTests,
};
