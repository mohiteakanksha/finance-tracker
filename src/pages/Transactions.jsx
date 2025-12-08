import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Search, ChevronDown } from "lucide-react";
import AddTransactionModal from "./AddTransactionModal";

const Transactions = () => {
  const [open, setOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);

  // Fetch from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.log(err));
  }, []);

  // format date
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-white to-purple-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-8 mt-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <h2 className="text-xl font-semibold">Transactions</h2>
          <p className="text-gray-500 mb-6">Track all your income and expenses</p>

          {/* Outer Card */}
          <div className="bg-white shadow-sm border rounded-xl p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Transactions</h3>

              <button
                onClick={() => setOpen(true)}
                className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                + Add Transaction
              </button>
            </div>

            {/* Search + Filters */}
            <div className="flex gap-4 mb-4 flex-wrap">
              <div className="flex items-center px-3 py-2 border rounded-lg w-full md:w-1/2">
                <Search size={18} className="text-gray-500" />
                <input
                  placeholder="Search transactions..."
                  className="ml-2 outline-none w-full"
                />
              </div>

              <button className="border px-4 py-2 rounded-lg flex items-center gap-2">
                All Types <ChevronDown size={16} />
              </button>

              <button className="border px-4 py-2 rounded-lg flex items-center gap-2">
                All Categories <ChevronDown size={16} />
              </button>
            </div>

            {/* If No Data */}
            {transactions.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <p className="text-lg font-medium">No transactions found</p>
                <p>Add your first transaction to get started</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {transactions.map((t) => (
                  <div
                    key={t._id}
                    className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition"
                  >
                    {/* Left Side */}
                    <div className="flex items-center gap-4">
                      {/* Circular Icon */}
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                        style={{
                          background: t.type === "income" ? "#16a34a" : "#ef4444",
                        }}
                      >
                        {t.type === "income" ? "↓" : "↑"}
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg">{t.title}</h4>
                        <p className="text-gray-500 text-sm">{t.category}</p>
                        <p className="text-gray-400 text-xs">{formatDate(t.date)}</p>
                      </div>
                    </div>

                    {/* Amount */}
                    <p
                      className={`text-lg font-semibold ${
                        t.type === "expense" ? "text-red-500" : "text-green-600"
                      }`}
                    >
                      {t.type === "expense" ? "-" : "+"}₹{t.amount}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {open && <AddTransactionModal onClose={() => setOpen(false)} />}
    </div>
  );
};

export default Transactions;
