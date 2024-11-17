const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
	answer: String,
	isCorrect: { type: Boolean, default: false },
});

const questionSchema = new mongoose.Schema({
	id: { type: Number, required: true },
	question: { type: String, required: true },
	type: {
		type: String,
		enum: ["radio", "checkbox", "input", "boolean"],
		required: true,
	},
	answers: [answerSchema],
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
