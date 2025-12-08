const express = require("express");
const router = express.Router();

const Transaction = require("../models/Transaction");

router.post("/add", async (req, res) => {
  try {
    console.log("Body Received:", req.body);

    const transaction = new Transaction(req.body);
    await transaction.save();

    res.status(201).json({
      success: true,
      message: "Transaction added successfully",
      data: transaction,
    });
  } catch (error) {
    console.log("Add Transaction Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});
// GET ALL TRANSACTIONS
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
