const mongoose = require("mongoose");

const testAttemptSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		testType: { type: String, required: true },
		startTime: { type: Date, required: true },
		finishTime: { type: Date, required: true },
		wrongAnswers: [
			{
				questionId: { type: Number, required: true },
				question: { type: String, required: true },
				answer: [String],
			},
		],
	},
	{ timestamps: true },
);

module.exports = mongoose.model("TestAttempt", testAttemptSchema);
