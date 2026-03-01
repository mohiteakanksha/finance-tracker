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

router.get("/count", auth, async (req, res) => {
  try {
    const userId = req.userId; // ✅ correct
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    const count = await Transaction.countDocuments({
      userId,
      date: {
        $gte: new Date(year, month, 1),
        $lte: new Date(year, month + 1, 0),
      },
    });

    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "Error counting transactions" });
  }
});
// ===========================
//     DELETE TRANSACTION
// ===========================
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    await transaction.deleteOne();

    res.json({
      success: true,
      message: "Transaction deleted successfully",
    });

  } catch (error) {
    console.log("Delete Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
