const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
	answerText: String,
	answerImage: String,
	isCorrect: { type: Boolean, default: false },
});

const questionBlockSchema = new mongoose.Schema({
	id: { type: Number, required: true },
	questionText: { type: String, required: true },
	questionImage: String,
	answerType: {
		type: String,
		enum: ["radio", "checkbox", "dropdown", "textInput", "image", "trueFalse"],
		required: true,
	},
	possibleAnswers: [answerSchema],
});

const questionSchema = new mongoose.Schema({
	questionText: { type: String, required: true },
	questionImage: String,
	answerType: {
		type: String,
		enum: ["radio", "checkbox", "textInput"],
		required: true,
	},
	possibleAnswers: [answerSchema],
	correctAnswer: String,
});

module.exports = { answerSchema, questionBlockSchema, questionSchema };
