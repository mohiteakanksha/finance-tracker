const Goal = require("../models/Goal");

// Create New Goal
const createGoal = async (req, res) => {
  try {
    const { name, targetAmount, deadline } = req.body;

    const newGoal = await Goal.create({
      name,
      targetAmount,
      deadline,
      userId: req.userId,
      currentAmount: 0
    });

    res.json(newGoal);
  } catch (err) {
    console.log("Create Goal Error:", err);
    res.status(500).json({ msg: "Failed to save goal" });
  }
};

// Get All Goals
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.userId });
    res.json(goals);
  } catch (err) {
    console.log("Get Goals Error:", err);
    res.status(500).json({ msg: "Failed to fetch goals" });
  }
};

// Add Money to Goal
const addMoneyToGoal = async (req, res) => {
  try {
    const { amount } = req.body;

    const goal = await Goal.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!goal) return res.status(404).json({ msg: "Goal not found" });

    goal.currentAmount += Number(amount);
    await goal.save();

    res.json(goal);
  } catch (err) {
    console.log("Add Money Error:", err);
    res.status(500).json({ msg: "Failed to update goal" });
  }
};

module.exports = { createGoal, getGoals, addMoneyToGoal };
