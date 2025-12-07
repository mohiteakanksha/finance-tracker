import React from "react";
import { X } from "lucide-react";

const AddSubscriptionModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-[520px] rounded-xl p-6 shadow-lg relative">

        {/* CLOSE WITH X BUTTON */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-1">Add Subscription</h2>
        <p className="text-gray-500 text-sm mb-4">
          Track your recurring subscriptions
        </p>

        {/* FORM FIELDS */}
        <div className="flex flex-col gap-4">

          <div>
            <label className="text-sm font-medium">Subscription Name *</label>
            <input
              type="text"
              placeholder="e.g., Netflix, Spotify"
              className="w-full mt-1 p-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Cost *</label>
            <input
              type="number"
              placeholder="0.00"
              className="w-full mt-1 p-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Billing Frequency *</label>
            <select className="w-full mt-1 p-2 border rounded-lg bg-gray-100">
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Yearly</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Next Renewal Date *</label>
            <input
              type="date"
              className="w-full mt-1 p-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Category</label>
            <select className="w-full mt-1 p-2 border rounded-lg bg-gray-100">
              <option>Entertainment</option>
              <option>Education</option>
              <option>Productivity</option>
              <option>Utilities</option>
            </select>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">

          {/* CANCEL BUTTON → CLOSE MODAL */}
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button className="bg-black text-white px-4 py-2 rounded-lg">
            Add Subscription
          </button>

        </div>

      </div>
    </div>
  );
};

export default AddSubscriptionModal;
