const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  surveyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Survey"
  },
  answers: [String]
});

module.exports = mongoose.model("Response", responseSchema);
