import React, { useState } from "react";
import {
  X,
  ChevronDown,
  Utensils,
  Home,
  ShoppingCart,
  HeartPulse,
  GraduationCap,
  CreditCard,
  Plane,
  Tv,
  Wallet,
  Briefcase,
  TrendingUp,
  Gift,
} from "lucide-react";

import api from "../axiosConfig";

const AddTransactionModal = ({ onClose }) => {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [notes, setNotes] = useState("");

  const token = localStorage.getItem("token");

  // 🔥 Expense Categories with Icons
  const expenseCategories = [
    { name: "Food", icon: <Utensils size={16} /> },
    { name: "Groceries", icon: <ShoppingCart size={16} /> },
    { name: "Rent", icon: <Home size={16} /> },
    { name: "Travel", icon: <Plane size={16} /> },
    { name: "Health", icon: <HeartPulse size={16} /> },
    { name: "Bills", icon: <Wallet size={16} /> },
    { name: "Shopping", icon: <ShoppingCart size={16} /> },
    { name: "Entertainment", icon: <Tv size={16} /> },
    { name: "Education", icon: <GraduationCap size={16} /> },
    { name: "Subscriptions", icon: <Tv size={16} /> },
    { name: "EMI", icon: <CreditCard size={16} /> },
    { name: "Investment", icon: <TrendingUp size={16} /> },
    { name: "Others", icon: <Wallet size={16} /> },
  ];

  // 💰 Income Categories with Icons
  const incomeCategories = [
    { name: "Salary", icon: <Briefcase size={16} /> },
    { name: "Freelance", icon: <TrendingUp size={16} /> },
    { name: "Business", icon: <TrendingUp size={16} /> },
    { name: "Investments", icon: <TrendingUp size={16} /> },
    { name: "Bonus", icon: <Gift size={16} /> },
    { name: "Family/Friends", icon: <Home size={16} /> },
    { name: "Other Income", icon: <Wallet size={16} /> },
  ];

  const handleSubmit = async () => {
    if (!amount || !category) {
      alert("Amount & Category are required!");
      return;
    }

    try {
      await api.post(
        "/transactions/add",
        {
          type,
          amount: Number(amount),
          category,
          date,
          paymentMethod,
          notes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Transaction Added Successfully!");
      onClose();
    } catch (err) {
      console.log(err.response?.data);
      alert("Failed to add transaction");
    }
  };

  const currentCategories =
    type === "expense" ? expenseCategories : incomeCategories;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Add Transaction</h2>
          <button onClick={onClose}>
            <X size={22} className="text-gray-600" />
          </button>
        </div>

        {/* Type */}
        <div className="mb-4">
          <label className="font-medium">Type</label>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={type === "expense"}
                onChange={() => {
                  setType("expense");
                  setCategory("");
                }}
              />
              Expense
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={type === "income"}
                onChange={() => {
                  setType("income");
                  setCategory("");
                }}
              />
              Income
            </label>
          </div>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label className="font-medium">Amount *</label>
          <input
            type="number"
            placeholder="0.00"
            className="border px-3 py-2 rounded-lg w-full mt-1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Category with Icons */}
        <div className="mb-4 relative">
          <label className="font-medium">Category *</label>

          <div
            className="border px-3 py-2 rounded-lg w-full mt-1 flex justify-between items-center cursor-pointer"
            onClick={() => setShowCategoryList(!showCategoryList)}
          >
            {category || "Select category"}
            <ChevronDown size={18} />
          </div>

          {showCategoryList && (
            <div className="absolute bg-white border rounded-lg w-full mt-1 shadow-md max-h-48 overflow-y-auto z-10">
              {currentCategories.map((cat) => (
                <div
                  key={cat.name}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                  onClick={() => {
                    setCategory(cat.name);
                    setShowCategoryList(false);
                  }}
                >
                  {cat.icon}
                  {cat.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="font-medium">Date</label>
          <input
            type="date"
            className="border px-3 py-2 rounded-lg w-full mt-1"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <label className="font-medium">Payment Method</label>
          <select
            className="border px-3 py-2 rounded-lg w-full mt-1"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option>Cash</option>
            <option>Card</option>
            <option>UPI</option>
          </select>
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="font-medium">Notes</label>
          <textarea
            className="border px-3 py-2 rounded-lg w-full mt-1"
            placeholder="Add any additional notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg"
          >
            Add Transaction
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddTransactionModal;