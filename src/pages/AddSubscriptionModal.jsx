import React, { useState } from "react";
import { X } from "lucide-react";
import api from "../axiosConfig";

const AddSubscriptionModal = ({ onClose, reload }) => {
  const [form, setForm] = useState({
    name: "",
    cost: "",
    frequency: "Monthly",
    nextRenewal: "",
    category: "Entertainment",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveSubscription = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post("/subscriptions/add", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      reload();   // refresh list
      onClose();  // close modal
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-[520px] p-6 rounded-xl shadow-xl">

        {/* HEADER (same as Investment modal) */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">Add Subscription</h2>
          <X className="cursor-pointer" onClick={onClose} />
        </div>

        {/* FORM */}
        <div className="space-y-4">

          <div>
            <label className="text-sm font-medium">Subscription Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Cost *</label>
            <input
              type="number"
              name="cost"
              value={form.cost}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Billing Frequency *</label>
            <select
              name="frequency"
              value={form.frequency}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            >
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Yearly</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Next Renewal *</label>
            <input
              type="date"
              name="nextRenewal"
              value={form.nextRenewal}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            >
              <option>Entertainment</option>
              <option>Education</option>
              <option>Productivity</option>
              <option>Utilities</option>
            </select>
          </div>

        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>

          <button
            onClick={saveSubscription}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg"
          >
            Add Subscription
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddSubscriptionModal;
