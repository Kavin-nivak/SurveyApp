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


router.get("/", auth, getSurveys);
router.post("/", auth, createSurvey);
router.post("/:id/response", submitResponse);
router.get("/:id/results", getResults);

router.delete("/:id", auth, deleteSurvey); 

module.exports = router;
