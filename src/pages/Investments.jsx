import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Plus, TrendingUp, Trash2 } from "lucide-react";
import AddInvestmentModal from "./AddInvestmentModal";

const Investments = () => {
  const [open, setOpen] = useState(false);
  const [investments, setInvestments] = useState([]);

  // Calculate totals
  const totalInvested = investments.reduce(
    (sum, i) => sum + i.amountInvested,
    0
  );
  const totalCurrent = investments.reduce(
    (sum, i) => sum + i.currentValue,
    0
  );
  const totalReturns = totalCurrent - totalInvested;
  const totalReturnPercent =
    totalInvested > 0
      ? ((totalReturns / totalInvested) * 100).toFixed(2)
      : 0;

  const loadInvestments = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch("http://localhost:5000/api/investments", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setInvestments(data);
  };

  const deleteInvestment = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Delete this investment?")) return;

    const res = await fetch(`http://localhost:5000/api/investments/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) loadInvestments();
  };

  useEffect(() => {
    loadInvestments();
  }, []);

  return (
    <div className="min-h-screen w-screen flex bg-gradient-to-br from-white to-purple-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-8 mt-16 h-[calc(100vh-4rem)] overflow-y-auto pl-64">
          {/* ================= HEADER ================= */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-2xl font-semibold">Investment Portfolio</h2>
              <p className="text-gray-500 text-sm">
                Track your investments and returns
              </p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus size={18} /> Add Investment
            </button>
          </div>

          {/* ================= SUMMARY CARDS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="border rounded-xl p-6 bg-white shadow-md">
              <p className="text-gray-500 text-sm">Total Invested</p>
              <h3 className="text-3xl font-semibold mt-2">
                ₹{totalInvested.toLocaleString()}
              </h3>
            </div>

            <div className="border rounded-xl p-6 bg-white shadow-md">
              <p className="text-gray-500 text-sm">Current Value</p>
              <h3 className="text-3xl font-semibold mt-2">
                ₹{totalCurrent.toLocaleString()}
              </h3>
            </div>

            <div className="border rounded-xl p-6 bg-white shadow-md">
              <p className="text-gray-500 text-sm">Total Returns</p>
              <h3 className="text-3xl font-semibold text-green-600 mt-2">
                +₹{totalReturns.toLocaleString()}
              </h3>
              <p className="text-green-500 text-xs">
                +{totalReturnPercent}%
              </p>
            </div>
          </div>

          {/* ================= INVESTMENT LIST ================= */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Your Investments</h3>

            {investments.length === 0 ? (
              /* ===== EMPTY STATE ===== */
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <TrendingUp size={48} className="text-gray-300" />
                <p className="mt-4 text-lg font-medium text-gray-600">
                  No investments yet
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Add your first investment to start tracking returns
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {investments.map((inv) => {
                  const returns =
                    inv.currentValue - inv.amountInvested;
                  const returnPercent =
                    ((returns / inv.amountInvested) * 100).toFixed(2);

                  return (
                    <div
                      key={inv._id}
                      className="flex justify-between items-center border rounded-xl p-5 bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-green-100 p-3 rounded-full">
                          <TrendingUp className="text-green-700" />
                        </div>

                        <div>
                          <p className="text-lg font-semibold">
                            {inv.name}
                          </p>
                          <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                            {inv.type}
                          </span>
                          <p className="text-gray-600 text-sm mt-1">
                            Invested: ₹
                            {inv.amountInvested.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold">
                          ₹{inv.currentValue.toLocaleString()}
                        </p>
                        <p
                          className={`text-sm ${
                            returns >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {returns >= 0 ? "+" : ""}
                          {returnPercent}%
                        </p>
                      </div>

                      <Trash2
                        size={20}
                        className="text-red-500 cursor-pointer"
                        onClick={() => deleteInvestment(inv._id)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {open && (
        <AddInvestmentModal
          onClose={() => setOpen(false)}
          reloadInvestments={loadInvestments}
        />
      )}
    </div>
  );
};

export default Investments;
