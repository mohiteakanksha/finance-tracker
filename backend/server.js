const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const budgetRoutes = require("./routes/budgetRoutes");   
const goalRoutes = require("./routes/goalRoutes");
const investmentRoutes = require("./routes/investmentRoutes");
const emiRoutes = require("./routes/emiRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");


const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://finance-tracker-drab-seven.vercel.app/", // or your Vercel URL
  credentials: true,
}));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);   
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/investments", investmentRoutes);
app.use("/api/emi", require("./routes/emiRoutes"));
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/analytics", analyticsRoutes);






mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
