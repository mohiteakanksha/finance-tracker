import React, { useState } from "react";
import { X } from "lucide-react";
import api from "../axiosConfig";

const AddInvestmentModal = ({ onClose, reloadInvestments }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("Mutual Fund");
  const [invested, setInvested] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [date, setDate] = useState("");

  const token = localStorage.getItem("token");

  const handleAddInvestment = async () => {
  if (!token) return alert("Login again!");

  const investmentData = {
    name,
    type,
    amountInvested: Number(invested),
    currentValue: Number(currentValue),
    investmentDate: date,
  };

  try {
    const res = await api.post(
      "/investments/add",
      investmentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Investment Added!");
    reloadInvestments();
    onClose();
  } catch (error) {
    console.error(error);
    alert(
      error.response?.data?.message || "Server Error"
    );
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] p-6 rounded-xl shadow-xl">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">Add Investment</h2>
          <X className="cursor-pointer" onClick={onClose} />
        </div>

        <div className="space-y-4">
          <div>
            <label>Investment Name *</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label>Type *</label>
            <select
              className="w-full border rounded-lg px-3 py-2 mt-1"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option>Mutual Fund</option>
              <option>Stock</option>
              <option>Gold</option>
              <option>Crypto</option>
              <option>FD</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label>Amount Invested *</label>
            <input
              type="number"
              className="w-full border rounded-lg px-3 py-2 mt-1"
              value={invested}
              onChange={(e) => setInvested(e.target.value)}
            />
          </div>

          <div>
            <label>Current Value *</label>
            <input
              type="number"
              className="w-full border rounded-lg px-3 py-2 mt-1"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
            />
          </div>

          <div>
            <label>Date *</label>
            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2 mt-1"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>

          <button
           type="button"
            onClick={handleAddInvestment}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg"
          >
            Add Investment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddInvestmentModal;
