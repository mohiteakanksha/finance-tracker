const mongoose = require("mongoose");

const emiSchema = new mongoose.Schema({
  loanName: { type: String, required: true },
  principalAmount: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  tenureMonths: { type: Number, required: true },
  startDate: { type: Date, required: false },

  paidEmis: {
    type: Number,
    default: 0, // ⭐ REQUIRED FOR PROGRESS BAR + REMAINING
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("EMI", emiSchema);
