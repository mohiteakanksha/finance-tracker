import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Plus, TrendingUp } from "lucide-react";
import AddInvestmentModal from "./AddInvestmentModal";

const Investments = () => {
  const [open, setOpen] = useState(false);

  return (
     <div className="min-h-screen w-screen flex bg-gradient-to-br from-white to-purple-100">


      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* Navbar */}
        <Navbar />

        {/* Actual Page Content */}
        <div className="p-28">

          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-semibold">Investment Portfolio</h2>
              <p className="text-gray-500 text-sm">
                Track your investments and returns
              </p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus size={18} /> Add Investment
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {/* Total Invested */}
            <div className="border rounded-xl p-5 bg-white">
              <p className="text-gray-500 text-sm">Total Invested</p>
              <h3 className="text-2xl font-semibold mt-2">₹0</h3>
            </div>

            {/* Current Value */}
            <div className="border rounded-xl p-5 bg-white">
              <p className="text-gray-500 text-sm">Current Value</p>
              <h3 className="text-2xl font-semibold mt-2">₹0</h3>
            </div>

            {/* Returns */}
            <div className="border rounded-xl p-5 bg-white">
              <p className="text-gray-500 text-sm">Total Returns</p>
              <h3 className="text-2xl font-semibold text-green-600 mt-2">
                +₹0
              </h3>
              <p className="text-green-500 text-xs">+0.00%</p>
            </div>
          </div>

          {/* Empty State Box */}
          <div className="border bg-white rounded-xl h-[350px] flex items-center justify-center text-center">
            <div>
              <TrendingUp size={40} className="mx-auto text-gray-400" />
              <p className="text-gray-600 mt-4 font-medium">
                No investments tracked
              </p>
              <p className="text-gray-500 text-sm">
                Add your first investment to start tracking
              </p>
            </div>
          </div>

        </div>
      </div>

      {open && <AddInvestmentModal onClose={() => setOpen(false)} />}
    </div>
  );
};

export default Investments;
