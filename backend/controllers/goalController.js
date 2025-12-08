const Goal = require("../models/Goal");

// Create New Goal

// Get All Goals for a user
exports.getGoals = async (req, res) => {
  try {
    const { userId } = req.query; // frontend must send userId in URL query

    const goals = await Goal.find({ userId });
    res.json(goals);
  } catch (err) {
    console.log("Get Goals Error:", err);
    res.status(500).json({ msg: "Failed to fetch goals" });
  }
};

// Add Money to a goal
exports.addMoneyToGoal = async (req, res) => {
  try {
    const { amount } = req.body;

    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ msg: "Goal not found" });

    goal.currentAmount += Number(amount);
    await goal.save();

    res.json(goal);
  } catch (err) {
    console.log("Add Money Error:", err);
    res.status(500).json({ msg: "Failed to update goal" });
  }
};
