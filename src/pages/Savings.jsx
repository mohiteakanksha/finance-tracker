import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import AddGoalModal from "./AddGoalModal";

const Savings = () => {
  const [open, setOpen] = useState(false);

  const goals = [
    {
      title: "New Bike",
      target: 80000,
      saved: 25000,
      color: "bg-purple-500",
    },
    {
      title: "Emergency Fund",
      target: 50000,
      saved: 20000,
      color: "bg-green-500",
    },
    {
      title: "Vacation Trip",
      target: 70000,
      saved: 30000,
      color: "bg-blue-500",
    },
  ];

  return (
     <div className="h-screen flex  w-screen bg-gradient-to-br from-white to-purple-100">
      <Sidebar />

      <div className=" flex-1">
        <Navbar />

        <div className="p-24">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold">Savings Goals</h1>
              <p className="text-gray-500">Track and manage your savings goals</p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="bg-purple-600 text-white px-5 py-2 rounded-xl shadow hover:bg-purple-700"
            >
              + Add New Goal
            </button>
          </div>

          {/* Goals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
            {goals.map((goal, index) => {
              const percent = Math.floor((goal.saved / goal.target) * 100);

              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow border hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-semibold">{goal.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    ₹{goal.saved.toLocaleString()} / ₹{goal.target.toLocaleString()}
                  </p>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div
                      className={`${goal.color} h-3`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>

                  <p className="text-right text-sm font-medium mt-1 text-gray-700">
                    {percent}% Saved
                  </p>

                  <button className="mt-4 w-full bg-black text-white py-2 rounded-xl">
                    Add Money
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {open && <AddGoalModal onClose={() => setOpen(false)} />}
    </div>
  );
};

export default Savings;
