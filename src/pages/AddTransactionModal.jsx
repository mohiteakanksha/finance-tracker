import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const AddTransactionModal = ({ onClose }) => {
  // --- STATES ---
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [notes, setNotes] = useState("");

  // --- SUBMIT ---
  const handleSubmit = async () => {
    if (!amount || !category) {
      alert("Amount & Category are required!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/transactions/add", {
        type,
        amount: Number(amount),
        category,
        date,
        paymentMethod,
        notes,
      });

      alert("Transaction Added Successfully!");
      onClose();
    } catch (err) {
      console.log(err.response?.data || err);
      alert("Failed to add transaction");
    }
  };

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
                name="type"
                checked={type === "expense"}
                onChange={() => setType("expense")}
              />
              Expense
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                checked={type === "income"}
                onChange={() => setType("income")}
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

        {/* Category */}
        <div className="mb-4">
          <label className="font-medium">Category *</label>
          <select
            className="border px-3 py-2 rounded-lg w-full mt-1"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Select category</option>
            <option>Food</option>
            <option>Shopping</option>
            <option>Travel</option>
            <option>Salary</option>
            <option>Entertainment</option>
            <option>Others</option>
          </select>
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
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            Add Transaction
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddTransactionModal;
