const mongoose = require("mongoose");

const testAttemptSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		testId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Test",
			required: true,
		},
		startTime: { type: Date, required: true },
		finishTime: { type: Date, required: true },
		score: { type: Number, required: true },
		number: { type: Number, required: true },
		wrong: [
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
