const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
	answerText: String,
	isCorrect: { type: Boolean, default: false },
});

const questionSchema = new mongoose.Schema({
	id: { type: Number, required: true },
	questionText: { type: String, required: true },
	answerType: {
		type: String,
		enum: ["radio", "checkbox", "input", "boolean"],
		required: true,
	},
	possibleAnswers: [answerSchema],
});

const testSchema = new mongoose.Schema(
	{
		provider: { type: String, required: true },
		level: { type: String, required: true },
		title: { type: String, required: true },
		description: String,
		questions: [questionSchema],
	},
	{ timestamps: true },
);

module.exports = mongoose.model("Test", testSchema);
