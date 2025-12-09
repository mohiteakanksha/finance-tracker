const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { createGoal, getGoals, addMoneyToGoal } = require("../controllers/goalController");

router.post("/", auth, createGoal);
router.get("/", auth, getGoals);
router.post("/add-money/:id", auth, addMoneyToGoal);

module.exports = router;
