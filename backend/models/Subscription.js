const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  frequency: { type: String, required: true },
  nextRenewal: { type: String, required: true },
  category: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // 🔥 USER ID
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);
