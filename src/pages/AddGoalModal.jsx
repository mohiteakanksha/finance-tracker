import React, { useState } from "react";
import { X } from "lucide-react";

const AddGoalModal = ({ onClose }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("Monthly");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      
      {/* MODAL */}
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border p-6 relative">

        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold">Create Budget</h2>
        <p className="text-gray-500 text-sm mb-6">
          Set spending limits for categories
        </p>

        {/* Category */}
        <div className="mb-4">
          <label className="text-sm font-medium">Category *</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-xl p-3 mt-1 text-gray-700 bg-gray-50 outline-none"
          >
            <option value="">Select category</option>
            <option value="Food">Food & Dining</option>
            <option value="Shopping">Shopping</option>
            <option value="Travel">Travel</option>
            <option value="Bills">Bills & Utilities</option>
          </select>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label className="text-sm font-medium">Budget Amount *</label>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded-xl p-3 mt-1 bg-gray-50 outline-none"
          />
        </div>

        {/* Period */}
        <div className="mb-4">
          <label className="text-sm font-medium">Period</label>
          <select 
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full border rounded-xl p-3 mt-1 bg-gray-50 outline-none"
          >
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Yearly</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-xl"
          >
            Cancel
          </button>

          <button
            className="px-6 py-2 bg-black text-white rounded-xl hover:bg-gray-900"
          >
            Create Budget
          </button>
        </div>
      </div>

    </div>
  );
};

export default AddGoalModal;
