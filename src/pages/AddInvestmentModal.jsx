import React, { useState } from "react";
import { X } from "lucide-react";

const AddInvestmentModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("Mutual Fund");
  const [invested, setInvested] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] p-6 rounded-xl shadow-xl relative">

        {/* Modal Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">Add Investment</h2>
          <X className="cursor-pointer" onClick={onClose} />
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-gray-600 text-sm">Investment Name *</label>
            <input
              type="text"
              placeholder="e.g., HDFC Mutual Fund"
              className="w-full border rounded-lg px-3 py-2 mt-1 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Type *</label>
            <select
              className="w-full border rounded-lg px-3 py-2 mt-1 outline-none bg-gray-50"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option>Mutual Fund</option>
              <option>Stock</option>
              <option>Gold</option>
              <option>Crypto</option>
              <option>Fixed Deposit</option>
            </select>
          </div>

          <div>
            <label className="text-gray-600 text-sm">Amount Invested *</label>
            <input
              type="number"
              className="w-full border rounded-lg px-3 py-2 mt-1 outline-none"
              value={invested}
              onChange={(e) => setInvested(e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Current Value *</label>
            <input
              type="number"
              className="w-full border rounded-lg px-3 py-2 mt-1 outline-none"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Investment Date</label>
            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2 mt-1 outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button className="px-4 py-2 bg-black text-white rounded-lg">
            Add Investment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddInvestmentModal;
