const mongoose = require("mongoose");
const { questionBlockSchema } = require("./sharedSchemas");

const accaTestSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: String,
		questions: [questionBlockSchema],
	},
	{ timestamps: true },
);

module.exports = mongoose.model("AccaTest", accaTestSchema);
