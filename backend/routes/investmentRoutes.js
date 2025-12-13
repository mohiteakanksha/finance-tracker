const express = require("express");
const Investment = require("../models/Investment");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// ADD investment
router.post("/add", auth, async (req, res) => {
  try {
    const { name, type, amountInvested, currentValue, investmentDate } = req.body;

    const investment = new Investment({
      userId: req.userId,   // ⭐ Only user from token
      name,
      type,
      amountInvested,
      currentValue,
      investmentDate,
    });

    await investment.save();

    res.status(200).json({ message: "Investment added", investment });
  } catch (err) {
    res.status(500).json({ message: "Error adding investment", err });
  }
});

// GET investments for logged in user only
router.get("/", auth, async (req, res) => {
  try {
    const investments = await Investment.find({ userId: req.userId }); // ⭐ ONLY USER'S DATA
    res.status(200).json(investments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching investments" });
  }
});


/* ================= DELETE INVESTMENT ================= */
router.delete("/:id", auth, async (req, res) => {
  try {
    const investment = await Investment.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId, // ⭐ user safety check
    });

    if (!investment) {
      return res.status(404).json({
        success: false,
        message: "Investment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Investment deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting investment",
      error: err.message,
    });
  }
});

module.exports = router;
