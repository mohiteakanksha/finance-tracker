import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AddSharedExpenseModal from "./AddSharedExpenseModal";

const SharedExpenses = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen w-screen flex bg-gradient-to-br from-white to-purple-100">

      {/* Sidebar Fixed */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow">
        <Sidebar />
      </div>

      {/* Right Side Content */}
      <div className="ml-64 flex-1 flex flex-col">

        {/* Navbar Fixed */}
        <div className="w-full fixed z-10">
          <Navbar />
        </div>

        {/* Page Content */}
        <div className="pt-24 px-10">

          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-[18px] font-semibold">Shared Expenses</h2>
              <p className="text-gray-500 text-sm">
                Split expenses with family or roommates
              </p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
            >
              <span className="text-lg">+</span> Add Expense
            </button>
          </div>

          {/* Empty Box */}
          <div className="bg-white border rounded-xl h-[320px] flex flex-col items-center justify-center text-center shadow-sm">
            <div className="text-gray-400 text-5xl mb-3">👥</div>
            <p className="text-gray-600 font-medium">No shared expenses</p>
            <p className="text-gray-500 text-sm">
              Add expenses to split with others
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && <AddSharedExpenseModal close={() => setOpen(false)} />}
    </div>
  );
};

export default SharedExpenses;
