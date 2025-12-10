const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const EMI = require("../models/emiModel");

// ➤ ADD EMI
router.post("/add", auth, async (req, res) => {
  try {
    const newEmi = await EMI.create({
      loanName: req.body.loanName,
      principalAmount: req.body.principalAmount,
      interestRate: req.body.interestRate,
      tenureMonths: req.body.tenureMonths,
      startDate: req.body.startDate,
      userId: req.userId,
      paidEmis: 0
    });

    res.status(201).json({ success: true, emi: newEmi });
  } catch (err) {
    console.log("EMI ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ➤ GET EMIs only for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const emis = await EMI.find({ userId: req.userId });
    res.json(emis);
  } catch (error) {
    res.status(500).json({ error: "Server error fetching EMIs" });
  }
});

// ➤ MARK EMI AS PAID
router.patch("/mark-paid/:id", auth, async (req, res) => {
  try {
    const emi = await EMI.findById(req.params.id);

    if (!emi) {
      return res.status(404).json({ message: "EMI not found" });
    }

    if (emi.paidEmis < emi.tenureMonths) {
      emi.paidEmis += 1;
    }

    await emi.save();

    res.json({ success: true, emi });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ➤ DELETE EMI
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const deleted = await EMI.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "EMI not found" });
    }

    res.json({ success: true, message: "EMI deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
