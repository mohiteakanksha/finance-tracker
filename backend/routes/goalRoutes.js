const express = require("express");
const router = express.Router();
const {
  createGoal,
  getGoals,
  addMoneyToGoal
} = require("../controllers/goalController");

router.post("/", createGoal); // Save goal
router.get("/", getGoals); // Get all goals for a user
router.post("/add-money/:id", addMoneyToGoal); // Update savings

module.exports = router;
