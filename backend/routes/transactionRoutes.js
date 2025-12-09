const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const auth = require("../middleware/authMiddleware");

// ===========================
//     ADD TRANSACTION
// ===========================
router.post("/add", auth, async (req, res) => {
  try {
    console.log("Body Received:", req.body);
    console.log("User ID From Token:", req.userId);

    const transaction = new Transaction({
      ...req.body,
      userId: req.userId,
    });

    await transaction.save();

    res.status(201).json({
      success: true,
      message: "Transaction added successfully",
      data: transaction,
    });

  } catch (error) {
    console.log("Add Transaction Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ===========================
//     GET USER TRANSACTIONS
// ===========================
router.get("/", auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId }).sort({ date: -1 });

    res.json({
      success: true,
      count: transactions.length,
      data: transactions,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
