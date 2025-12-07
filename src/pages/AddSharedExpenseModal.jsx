
import React from "react";

const AddSharedExpenseModal = ({ close }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">

      <div className="bg-white w-[480px] rounded-xl p-6 shadow-xl relative">

        {/* Close Icon */}
        <button
          onClick={close}
          className="absolute right-4 top-4 text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-[20px] font-semibold mb-1">Add Shared Expense</h2>
        <p className="text-gray-500 text-sm mb-5">
          Split an expense among multiple people
        </p>

        {/* Form */}
        <div className="space-y-4">

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description *</label>
            <input
              type="text"
              placeholder="e.g., Dinner, Groceries"
              className="w-full border rounded-lg p-2 text-sm mt-1 bg-gray-50"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="text-sm font-medium">Total Amount *</label>
            <input
              type="number"
              placeholder="0.00"
              className="w-full border rounded-lg p-2 text-sm mt-1 bg-gray-50"
            />
          </div>

          {/* Paid By */}
          <div>
            <label className="text-sm font-medium">Paid By *</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full border rounded-lg p-2 text-sm mt-1 bg-gray-50"
            />
          </div>

          {/* Members */}
          <div>
            <label className="text-sm font-medium">Other Members *</label>
            <input
              type="text"
              placeholder="Name1, Name2, Name3"
              className="w-full border rounded-lg p-2 text-sm mt-1 bg-gray-50"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate names with commas. The expense will be split equally.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={close}
            className="px-4 py-2 rounded-lg border text-sm"
          >
            Cancel
          </button>

          <button className="px-4 py-2 rounded-lg bg-black text-white text-sm">
            Add Expense
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddSharedExpenseModal;
