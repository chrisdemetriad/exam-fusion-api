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
				questionText: { type: String, required: true },
				correctAnswer: [String],
			},
		],
	},
	{ timestamps: true },
);

module.exports = mongoose.model("TestAttempt", testAttemptSchema);
