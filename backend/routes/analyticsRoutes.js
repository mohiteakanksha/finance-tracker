const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");
const verifyToken = require("../middleware/authMiddleware");

/* ------------------------------------------------------
   1. OVERVIEW (Last 12 Months Income / Expense / Savings)
--------------------------------------------------------- */
router.get("/overview", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    const data = await Transaction.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          income: { $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] } },
          expense: { $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] } },
          savings: {
            $sum: {
              $cond: [
                { $eq: ["$type", "income"] },
                "$amount",
                { $multiply: ["$amount", -1] }
              ]
            }
          }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* ------------------------------------------------------
   2. EXPENSE CATEGORIES BREAKDOWN
--------------------------------------------------------- */
/* ------------------------------------------------------
   2. EXPENSE CATEGORIES BREAKDOWN (CURRENT MONTH ONLY)
--------------------------------------------------------- */
router.get("/categories", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const data = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          type: "expense",
          date: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
        },
      },
      { $sort: { totalAmount: -1 } },
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------------------------------------------
   3. INCOME SOURCE BREAKDOWN   (MISSING FROM YOUR BACKEND)
--------------------------------------------------------- */
/* ------------------------------------------------------
   3. INCOME SOURCE BREAKDOWN (CURRENT MONTH ONLY)
--------------------------------------------------------- */
router.get("/income-sources", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const data = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          type: "income",
          date: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
        },
      },
      { $sort: { totalAmount: -1 } },
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------------------------------------------
   4. MONTH-OVER-MONTH COMPARISON
--------------------------------------------------------- */
router.get("/comparison", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const now = new Date();

    const thisMonth = now.getMonth() + 1;
    const lastMonth = thisMonth === 1 ? 12 : thisMonth - 1;
    const thisYear = now.getFullYear();
    const lastMonthYear = lastMonth === 12 ? thisYear - 1 : thisYear;

    const data = await Transaction.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            type: "$type"
          },
          total: { $sum: "$amount" }
        }
      }
    ]);

    const getVal = (m, y, type) => {
      const f = data.find(
        (x) => x._id.month === m && x._id.year === y && x._id.type === type
      );
      return f ? f.total : 0;
    };

    res.json({
      income: {
        lastMonth: getVal(lastMonth, lastMonthYear, "income"),
        thisMonth: getVal(thisMonth, thisYear, "income"),
      },
      expense: {
        lastMonth: getVal(lastMonth, lastMonthYear, "expense"),
        thisMonth: getVal(thisMonth, thisYear, "expense"),
      },
      savings: {
        lastMonth:
          getVal(lastMonth, lastMonthYear, "income") -
          getVal(lastMonth, lastMonthYear, "expense"),
        thisMonth:
          getVal(thisMonth, thisYear, "income") -
          getVal(thisMonth, thisYear, "expense"),
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
