const Survey = require("../models/Survey");
const Response = require("../models/Response");

//  --> CREATE SURVEY
exports.createSurvey = async (req, res) => {
  try {
    console.log("USER:", req.user);   // 🔥 ADD THIS

    const survey = new Survey({
      title: req.body.title,
      questions: req.body.questions,
      createdBy: req.user.id
    });

    await survey.save();
    res.json({ message: "Survey created" });

  } catch (err) {
    console.error("CREATE SURVEY ERROR:", err); // 🔥 ADD THIS
    res.status(500).json({ message: err.message });
  }
};


// --> GET ALL SURVEYS
exports.getSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.json(surveys);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch surveys" });
  }
};

// --> SUBMIT RESPONSE (with Socket.io emit)
exports.submitResponse = async (req, res) => {
  try {
    const response = new Response({
      surveyId: req.params.id,
      answers: req.body.answers
    });

    await response.save();

    // --> REAL-TIME UPDATE
    const io = req.app.get("io");
    io.emit("refresh", req.params.id);

    res.json({ message: "Response submitted" });
  } catch (err) {
    res.status(500).json({ message: "Error submitting response" });
  }
};



// --> GET SURVEY RESULTS
exports.getResults = async (req, res) => {
  try {
    const results = await Response.find({
      surveyId: req.params.id
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch results" });
  }
};

exports.deleteSurvey = async (req, res) => {
  try {
    const { id } = req.params;

    await Survey.findByIdAndDelete(id);
    await Response.deleteMany({ surveyId: id }); // optional: clean responses

    res.json({ message: "Survey deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete survey" });
  }
};