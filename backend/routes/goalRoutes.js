const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const Goal = require("../models/Goal"); // 🔥 MISSING LINE (FIX)
const {
  createGoal,
  getGoals,
  addMoneyToGoal,
} = require("../controllers/goalController");

router.post("/", auth, createGoal);
router.get("/", auth, getGoals);
router.post("/add-money/:id", auth, addMoneyToGoal);

// =====================
// DELETE goal
// =====================
router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedGoal = await Goal.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!deletedGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Delete Goal Error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
