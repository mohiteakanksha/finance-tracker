const express = require("express");
const Budget = require("../models/Budget");

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    console.log("Received:", req.body);

    const newBudget = new Budget({
      category: req.body.category,
      amount: req.body.amount,
      period: req.body.period,
      userId: req.body.userId || null,
    });

    await newBudget.save();
    return res.json({ success: true });

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
