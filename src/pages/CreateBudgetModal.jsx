import React from "react";
import { X, ChevronDown } from "lucide-react";

const CreateBudgetModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

      <div className="bg-white w-[450px] rounded-xl shadow-xl p-6 relative">

        {/* Close Button */}
        <button className="absolute top-4 right-4" onClick={onClose}>
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold">Create Budget</h2>
        <p className="text-gray-500 text-sm">Set spending limits for categories</p>

        {/* Form */}
        <div className="mt-5 flex flex-col gap-4">

          {/* Category */}
          <div>
            <label className="text-sm font-medium">Category *</label>
            <div className="border rounded-lg px-4 py-2 flex justify-between items-center mt-1 text-gray-600">
              Select category
              <ChevronDown size={18} />
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="text-sm font-medium">Budget Amount *</label>
            <input
              type="number"
              placeholder="0.00"
              className="border rounded-lg px-4 py-2 mt-1 w-full outline-none"
            />
          </div>

          {/* Period */}
          <div>
            <label className="text-sm font-medium">Period</label>
            <div className="border rounded-lg px-4 py-2 flex justify-between items-center mt-1 text-gray-600">
              Monthly
              <ChevronDown size={18} />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button className="px-4 py-2 rounded-lg bg-black text-white">
              Create Budget
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBudgetModal;
