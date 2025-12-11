const express = require("express");
const Subscription = require("../models/Subscription");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// ADD subscription
router.post("/add", auth, async (req, res) => {
  try {
    const newSub = new Subscription({
      name: req.body.name,
      cost: req.body.cost,
      frequency: req.body.frequency,
      nextRenewal: req.body.nextRenewal,
      category: req.body.category,
      userId: req.userId  // 🔥 logged-in user
    });

    await newSub.save();
    return res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET logged-in user's subscriptions
router.get("/", auth, async (req, res) => {
  try {
    const subs = await Subscription.find({ userId: req.userId }); // 🔥 Filter by user ID
    res.json(subs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE subscription (user-specific)
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Subscription.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!deleted) {
      return res.status(404).json({ msg: "Subscription not found" });
    }

    res.json({ msg: "Subscription deleted", id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
