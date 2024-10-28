const mongoose = require("mongoose");
const { questionSchema } = require("./sharedSchemas");

const dvlaTestSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: String,
		questions: [questionSchema],
	},
	{ timestamps: true },
);

module.exports = mongoose.model("DvlaTest", dvlaTestSchema);
