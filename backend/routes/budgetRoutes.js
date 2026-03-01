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
/* =========================
   GET BUDGETS + AUTO SPENT (MONTHLY RESET FIXED)
========================= */
/* =========================
   GET BUDGETS + AUTO SPENT (MONTHLY RESET WORKING)
========================= */
router.get("/", auth, async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.userId });

    const result = [];

    const now = new Date();

    // Start of month (00:00:00)
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
      0, 0, 0
    );

    // End of month (23:59:59)
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23, 59, 59
    );

    for (const budget of budgets) {
      const spentAgg = await Transaction.aggregate([
        {
          $match: {
            userId: budget.userId,
            category: budget.category,
            type: "expense",
            date: {
              $gte: startOfMonth,
              $lte: endOfMonth,
            },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" },
          },
        },
      ]);

      result.push({
        ...budget.toObject(),
        spent: spentAgg.length > 0 ? spentAgg[0].total : 0,
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
