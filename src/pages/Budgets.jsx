import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Trash2 } from "lucide-react";
import CreateBudgetModal from "./CreateBudgetModal";

const Budgets = () => {
  const [open, setOpen] = useState(false);
  const [budgets, setBudgets] = useState([]);

  const token = localStorage.getItem("token");

const fetchBudgets = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/budgets", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setBudgets(res.data);
  } catch (err) {
    console.log("Error fetching budgets:", err);
  }
};


  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <div className="min-h-screen w-screen flex bg-gradient-to-br from-white to-purple-100">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Navbar />

      
        <div className="p-8 mt-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <h2 className="text-xl font-semibold">Budget Management</h2>
          <p className="text-gray-500 mb-6">Set and track category-wise budgets</p>

     
          <div className="bg-white shadow-sm border rounded-xl p-6">

            <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg ">Budgets</h3>

            <button
              onClick={() => setOpen(true)}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              + Add Budget
            </button>
          </div>

          {/* Budgets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {budgets.map((b) => {
              const spent = 0; 
              const percentUsed = (spent / b.amount) * 100;
              const remaining = b.amount - spent;

              return (
                <div
                  key={b._id}
                  className="bg-white shadow-sm border rounded-xl p-6 relative"
                >
                  <button className="absolute top-4 right-4 text-red-500">
                    <Trash2 size={18} />
                  </button>

                  <h3 className="text-lg font-semibold">{b.category}</h3>
                  <p className="text-gray-500">{b.period}</p>

                  <p className="mt-4 text-gray-700">
                    Spent <span className="float-right font-semibold">₹{spent} / ₹{b.amount}</span>
                  </p>

                  <div className="w-full bg-gray-200 h-2 rounded-lg mt-2">
                    <div
                      className="h-2 bg-black rounded-lg"
                      style={{ width: `${percentUsed}%` }}
                    ></div>
                  </div>

                  <p className="text-gray-500 text-sm mt-1">{percentUsed.toFixed(0)}% used</p>

                  <div className="bg-green-100 text-green-700 mt-4 p-3 rounded-lg">
                    ₹{remaining} remaining
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>

      {open && (
        <CreateBudgetModal
          onClose={() => {
            setOpen(false);
            fetchBudgets();
          }}
        />
      )}
    </div>
  );
};

export default Budgets;
