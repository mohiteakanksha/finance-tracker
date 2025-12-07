import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Search, ChevronDown } from "lucide-react";
import AddTransactionModal from "./AddTransactionModal";

const Transactions = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-white to-purple-100 flex">

      {/* ---- FIXED SIDEBAR ---- */}
      <Sidebar />

      {/* ---- MAIN AREA ---- */}
      <div className="flex-1 flex flex-col">

        {/* ---- FIXED NAVBAR ---- */}
        <Navbar />

        {/* ---- CONTENT (SCROLLABLE) ---- */}
        <div className="p-8 mt-16 h-[calc(100vh-4rem)] overflow-y-auto">

          {/* Page Title */}
          <h2 className="text-xl font-semibold">Transactions</h2>
          <p className="text-gray-500 mb-6">Track all your income and expenses</p>

          {/* Outer Card */}
          <div className="bg-white shadow-sm border rounded-xl p-6">

            {/* Heading + Add Button */}
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

            {/* Empty State */}
            <div className="text-center text-gray-500 py-12">
              <p className="text-lg font-medium">No transactions found</p>
              <p>Add your first transaction to get started</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---- ADD MODAL ---- */}
      {open && <AddTransactionModal onClose={() => setOpen(false)} />}
    </div>
  );
};

export default Transactions;
