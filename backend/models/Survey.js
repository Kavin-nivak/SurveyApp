const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: String,
  type: String,
  options: [String]
});

const surveySchema = new mongoose.Schema({
  title: String,
  questions: [questionSchema], 
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Survey", surveySchema);
