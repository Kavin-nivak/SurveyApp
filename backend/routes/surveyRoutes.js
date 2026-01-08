const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  createSurvey,
  getSurveys,
  submitResponse,
  deleteSurvey ,
  getResults
} = require("../controllers/surveyController");

const router = express.Router();


router.get("/", getSurveys);
router.get("/:id/results", getResults);
router.post("/:id/response", submitResponse);
router.post("/", auth, createSurvey);
router.delete("/:id", auth, deleteSurvey); 

module.exports = router;
