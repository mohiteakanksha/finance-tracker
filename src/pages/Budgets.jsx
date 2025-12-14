import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Trash2 } from "lucide-react";
import CreateBudgetModal from "./CreateBudgetModal";
import api from "../axiosConfig";

const Budgets = () => {
  const [open, setOpen] = useState(false);
  const [budgets, setBudgets] = useState([]);

  const token = localStorage.getItem("token");

  /* ================= FETCH budgets ================= */
  const fetchBudgets = async () => {
    try {
      const res = await axios.get("/budgets", {
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

  /* ================= DELETE budget ================= */
  const deleteBudget = async (id) => {
    try {
      await axios.delete(`/budgets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBudgets((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.log("Delete budget error:", err);
    }
  };

  return (
    <div className="min-h-screen w-screen flex bg-gradient-to-br from-white to-purple-100">
      {/* ================= SIDEBAR ================= */}
      <Sidebar />

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex flex-col flex-1">
        <Navbar />

        <div className="p-8 mt-10 h-[calc(100vh-4rem)] overflow-y-auto pl-64 pr-6 ml-6">
          
          {/* ================= PAGE HEADER (BUTTON MOVED HERE) ================= */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Budget Management</h2>
              <p className="text-gray-500">
                Set and track category-wise budgets
              </p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-5 py-2 rounded-lg"
            >
              + Add Budget
            </button>
          </div>

          {/* ================= MAIN CARD ================= */}
          <div className="bg-white shadow-sm border rounded-xl p-6">

            {budgets.length === 0 ? (
              /* ================= EMPTY STATE ================= */
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-lg font-medium text-gray-600">
                  No budgets set
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Create your first budget to track spending
                </p>
              </div>
            ) : (
              /* ================= BUDGET GRID ================= */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {budgets.map((b) => {
                  const spent = b.spent || 0;
                  const percentUsed =
                    b.amount > 0
                      ? Math.min((spent / b.amount) * 100, 100)
                      : 0;
                  const remaining = b.amount - spent;

                  return (
                    <div
                      key={b._id}
                      className="bg-white shadow-sm border rounded-xl p-6 relative"
                    >
                      <button
                        onClick={() => deleteBudget(b._id)}
                        className="absolute top-4 right-4 text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>

                      <h3 className="text-lg font-semibold">{b.category}</h3>
                      <p className="text-gray-500">{b.period}</p>

                      <p className="mt-4 text-gray-700">
                        Spent
                        <span className="float-right font-semibold">
                          ₹{spent} / ₹{b.amount}
                        </span>
                      </p>

                      <div className="w-full bg-gray-200 h-2 rounded-lg mt-2">
                        <div
                          className="h-2 bg-purple-700 rounded-lg"
                          style={{ width: `${percentUsed}%` }}
                        ></div>
                      </div>

                      <p className="text-gray-500 text-sm mt-1">
                        {percentUsed.toFixed(0)}% used
                      </p>

                      <div className="bg-green-100 text-green-700 mt-4 p-3 rounded-lg">
                        ₹{remaining} remaining
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
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
