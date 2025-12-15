import React, { useState } from "react";
import { X } from "lucide-react";
import api from "../axiosConfig";

const AddEMIModal = ({ onClose, reloadEMIs }) => {
  const [formData, setFormData] = useState({
    loanName: "",
    principalAmount: "",
    interestRate: "",
    tenureMonths: "",
    startDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    console.log("ADD EMI CLICKED"); 
    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
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

      console.log("EMI Added:", response.data);

      reloadEMIs(); // refresh list
      onClose();     // close modal
    } catch (error) {
      console.error(
        "Error adding EMI:",
        error.response?.data || error.message
      );
      alert("Failed to add EMI");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[999]">
      <div className="bg-white w-[480px] rounded-xl shadow-lg p-6 animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add EMI / Loan</h2>
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
          <input
            type="text"
            name="loanName"
            placeholder="Loan Name"
            value={formData.loanName}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />

          <input
            type="number"
            name="principalAmount"
            placeholder="Principal Amount"
            value={formData.principalAmount}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />

          <input
            type="number"
            name="interestRate"
            placeholder="Interest Rate (%)"
            value={formData.interestRate}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />

          <input
            type="number"
            name="tenureMonths"
            placeholder="Tenure (Months)"
            value={formData.tenureMonths}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
          type="button" 
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
