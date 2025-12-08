import React, { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

const AddGoalModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async () => {
    if (!name || !targetAmount) {
      alert("Please fill required fields!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/goals/add", {
        name,
        targetAmount,
        deadline,
      });

      console.log(res.data);
      alert("Goal Saved!");
      onClose();
    } catch (err) {
      console.log("Save Error:", err.response?.data || err.message);
      alert("Failed to save goal");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-96 relative">

        <button className="absolute top-4 right-4" onClick={onClose}>
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Create Savings Goal</h2>

        <label className="text-sm">Goal Name*</label>
        <input
          className="w-full p-2 border rounded mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="text-sm">Target Amount*</label>
        <input
          type="number"
          className="w-full p-2 border rounded mb-3"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
        />

        <label className="text-sm">Deadline (optional)</label>
        <input
          type="date"
          className="w-full p-2 border rounded mb-3"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Create Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGoalModal;
