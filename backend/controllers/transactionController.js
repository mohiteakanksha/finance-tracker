const Transaction = require("../models/Transaction");

// ================================
// CREATE NEW TRANSACTION
// ================================
exports.addTransaction = async (req, res) => {
  try {
    // userId comes from middleware (JWT decoded)
    const userId = req.userId;

    const { type, amount, category, date, paymentMethod, notes } = req.body;

    if (!type || !amount || !category) {
      return res.status(400).json({
        success: false,
        message: "Type, amount & category are required",
      });
    }

    const newTransaction = new Transaction({
      userId,
      type,
      amount,
      category,
      date,
      paymentMethod,
      notes,
    });

    await newTransaction.save();

    res.status(201).json({
      success: true,
      message: "Transaction added successfully",
      transaction: newTransaction,
    });

  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ================================
// GET ALL TRANSACTIONS (User Only)
// ================================
exports.getTransactions = async (req, res) => {
  try {
    const userId = req.userId;

    const transactions = await Transaction.find({ userId }).sort({ date: -1 });

    res.json(transactions);

  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
