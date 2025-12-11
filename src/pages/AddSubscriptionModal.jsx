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

      reload();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-[520px] rounded-xl p-6 shadow-lg relative">

        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-1">Add Subscription</h2>

        <div className="flex flex-col gap-4">

          <div>
            <label className="text-sm font-medium">Subscription Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Cost *</label>
            <input
              type="number"
              name="cost"
              value={form.cost}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Billing Frequency *</label>
            <select
              name="frequency"
              value={form.frequency}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg bg-gray-100"
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
              className="w-full mt-1 p-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg bg-gray-100"
            >
              <option>Entertainment</option>
              <option>Education</option>
              <option>Productivity</option>
              <option>Utilities</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>

          <button
            onClick={saveSubscription}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Add Subscription
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddSubscriptionModal;
