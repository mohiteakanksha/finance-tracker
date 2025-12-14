import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "../axiosConfig";

const AddEMIModal = ({ onClose, reloadEMIs }) => {
  const [formData, setFormData] = useState({
    loanName: "",
    principalAmount: "",
    interestRate: "",
    tenureMonths: "",
    startDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/emi/add",
        {
          loanName: formData.loanName,
          principalAmount: Number(formData.principalAmount),
          interestRate: Number(formData.interestRate),
          tenureMonths: Number(formData.tenureMonths),
          startDate: formData.startDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      reloadEMIs(); // refresh EMI list on main page
      onClose();
    } catch (error) {
      console.error("Error adding EMI:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[999]">
      <div className="bg-white w-[480px] rounded-xl shadow-lg p-6 animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add EMI/Loan</h2>
          <X
            size={20}
            className="cursor-pointer text-gray-600 hover:text-black"
            onClick={onClose}
          />
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Track your loan and EMI details
        </p>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium">Loan Name *</label>
            <input
              type="text"
              name="loanName"
              placeholder="e.g., Home Loan, Car Loan"
              value={formData.loanName}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Principal Amount *</label>
            <input
              type="number"
              name="principalAmount"
              placeholder="0.00"
              value={formData.principalAmount}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Interest Rate (% p.a.) *</label>
            <input
              type="number"
              name="interestRate"
              placeholder="e.g., 10.5"
              value={formData.interestRate}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Tenure (Months) *</label>
            <input
              type="number"
              name="tenureMonths"
              placeholder="e.g., 24"
              value={formData.tenureMonths}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
          >
            Add EMI
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEMIModal;
