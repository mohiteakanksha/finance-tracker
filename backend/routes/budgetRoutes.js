const express = require("express");
const Budget = require("../models/Budget");
const Transaction = require("../models/Transaction"); // ✅ just import
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* =========================
   ADD BUDGET
========================= */
router.post("/add", auth, async (req, res) => {
  try {
    const newBudget = new Budget({
      category: req.body.category,
      amount: req.body.amount,
      period: req.body.period,
      userId: req.userId,
    });

    await newBudget.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   GET BUDGETS + AUTO SPENT
========================= */
router.get("/", auth, async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.userId });

    const result = [];

    for (const budget of budgets) {
      const spentAgg = await Transaction.aggregate([
        {
          $match: {
            userId: budget.userId, // 🔥 ObjectId-safe
            category: budget.category,
          },
        },
        {
          $group: {
            _id: "$type",
            total: { $sum: "$amount" },
          },
        },
      ]);

      // extract only expense total
      const expenseGroup = spentAgg.find(
        (g) => g._id === "expense"
      );

      result.push({
        ...budget.toObject(),
        spent: expenseGroup ? expenseGroup.total : 0,
      });
    }

    res.json(result);
  } catch (err) {
    console.error("BUDGET ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


/* =========================
   DELETE BUDGET
========================= */
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
