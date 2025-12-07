import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { ChevronDown } from "lucide-react";
import CreateBudgetModal from "./CreateBudgetModal";

const Budgets = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen w-screen flex bg-gradient-to-br from-white to-purple-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex flex-col flex-1">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="p-16">

          {/* Title */}
          <h2 className="text-xl font-semibold">Budget Management</h2>
          <p className="text-gray-500 mb-6">Set and track category-wise budgets</p>

          {/* White Card */}
          <div className="bg-white shadow-sm border rounded-xl p-6">

            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Budgets</h3>

              <button
                onClick={() => setOpen(true)}
                className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                + Add Budget
              </button>
            </div>

            {/* Empty state */}
            <div className="text-center text-gray-500 py-12">
              <p className="text-lg font-medium">No budgets set</p>
              <p>Create your first budget to track spending</p>
            </div>

          </div>
        </div>
      </div>

      {/* Modal */}
      {open && <CreateBudgetModal onClose={() => setOpen(false)} />}
    </div>
  );
};

export default Budgets;
