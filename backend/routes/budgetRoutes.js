const express = require("express");
const Budget = require("../models/Budget");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// ADD budget (user-specific)
router.post("/add", auth, async (req, res) => {
  try {
    const newBudget = new Budget({
      category: req.body.category,
      amount: req.body.amount,
      period: req.body.period,
      userId: req.userId, // 🔥 Real logged-in user ID
    });

    await newBudget.save();
    return res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET budgets of logged in user
router.get("/", auth, async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.userId }); // 🔥 Filter by user
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Budget.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    res.json({ success: true, deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
