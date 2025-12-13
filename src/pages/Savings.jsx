import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import AddGoalModal from "./AddGoalModal";
import axios from "axios";
import { Trash2 } from "lucide-react";

const Savings = () => {
  const [openAddGoal, setOpenAddGoal] = useState(false);
  const [openAddMoney, setOpenAddMoney] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [amountToAdd, setAmountToAdd] = useState("");

  const [goals, setGoals] = useState([]);

  // ================= FETCH GOALS =================
  const fetchGoals = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/goals", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setGoals(res.data);
      console.log("GOALS:", res.data);
    } catch (err) {
      console.log("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  // ================= ADD MONEY =================
  const saveAddedMoney = async () => {
    if (!amountToAdd || amountToAdd <= 0) {
      alert("Enter a valid amount");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/goals/add-money/${selectedGoal._id}`,
        { amount: Number(amountToAdd) },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setOpenAddMoney(false);
      setAmountToAdd("");
      fetchGoals();
    } catch (err) {
      console.log("Add Money Error:", err);
      alert("Failed to update goal");
    }
  };

  // ================= DELETE GOAL =================
  const deleteGoal = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/goals/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setGoals((prev) => prev.filter((g) => g._id !== id));
    } catch (err) {
      console.log("Delete Goal Error:", err);
      alert("Failed to delete goal");
    }
  };

  return (
    <div className="h-screen flex w-screen bg-gradient-to-br from-white to-purple-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8 mt-16 h-[calc(100vh-4rem)] overflow-y-auto pt-2 pl-64 ml-6 ">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold">Savings Goals</h1>
              <p className="text-gray-500">
                Track and manage your savings goals
              </p>
            </div>

            <button
              onClick={() => setOpenAddGoal(true)}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-5 py-2 rounded-xl shadow hover:bg-purple-700"
            >
              + Add New Goal
            </button>
          </div>

          {/* ================= GOALS GRID ================= */}
         {/* ================= GOALS CONTAINER ================= */}
<div className="bg-white shadow-sm border rounded-xl p-6 mt-8">
  <h3 className="font-semibold text-lg mb-4">Goals</h3>

  {goals.length === 0 ? (
    <div className="text-gray-500 text-center py-12">
      No goals yet. Add your first goal!
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {goals.map((goal) => {
        const percent = Math.floor(
          (goal.currentAmount / goal.targetAmount) * 100
        );

        return (
          <div
            key={goal._id}
            className="bg-white p-6 rounded-2xl shadow border hover:shadow-lg transition relative"
          >
            {/* DELETE BUTTON */}
            <button
              onClick={() => deleteGoal(goal._id)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>

            <h3 className="text-lg font-semibold">{goal.name}</h3>

            <p className="text-gray-600 text-sm mb-3">
              ₹{goal.currentAmount.toLocaleString()} / ₹
              {goal.targetAmount.toLocaleString()}
            </p>

            {/* PROGRESS BAR */}
            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
              <div
                className="bg-purple-600 h-3"
                style={{ width: `${percent}%` }}
              ></div>
            </div>

            <p className="text-right text-sm font-medium mt-1 text-gray-700">
              {percent}% Saved
            </p>

            <button
              onClick={() => {
                setSelectedGoal(goal);
                setOpenAddMoney(true);
              }}
              className="mt-4 w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 rounded-xl"
            >
              Add Money
            </button>
          </div>
        );
      })}
    </div>
  )}
</div>
</div>
</div>

      {/* ADD GOAL MODAL */}
      {openAddGoal && (
        <AddGoalModal
          onClose={() => {
            setOpenAddGoal(false);
            fetchGoals();
          }}
        />
      )}

      {/* ADD MONEY MODAL */}
      {openAddMoney && selectedGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              Add Money to {selectedGoal.name}
            </h2>

            <label className="text-sm font-medium">Amount *</label>
            <input
              type="number"
              value={amountToAdd}
              onChange={(e) => setAmountToAdd(e.target.value)}
              className="w-full border p-3 rounded-xl mt-1 bg-gray-50 outline-none"
              placeholder="Enter amount"
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpenAddMoney(false)}
                className="px-4 py-2 bg-gray-200 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={saveAddedMoney}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl"
              >
                Add Savings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Savings;
