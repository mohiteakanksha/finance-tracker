import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Plus } from "lucide-react";
import AddEMIModal from "./AddEMIModal";

const EMILoans = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-white to-purple-100 flex">

      {/* FIXED SIDEBAR */}
      <div className="fixed left-0 top-0 h-screen">
        <Sidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen">

        {/* NAVBAR */}
        <Navbar />

        <div className="p-24">
          {/* PAGE HEADER */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">EMI & Loan Tracker</h2>
              <p className="text-gray-500 text-sm">
                Manage your loans and EMI payments
              </p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus size={18} /> Add EMI/Loan
            </button>
          </div>

          {/* EMPTY STATE */}
          <div className="bg-white border rounded-xl p-10 flex flex-col items-center justify-center text-center h-80">
            <div className="text-3xl text-gray-400 mb-2">▭</div>
            <p className="font-medium text-gray-700 mb-1">
              No EMIs or loans tracked
            </p>
            <p className="text-sm text-gray-500">
              Add your first loan to start tracking
            </p>
          </div>
        </div>
      </div>

      {open && <AddEMIModal onClose={() => setOpen(false)} />}
    </div>
  );
};

export default EMILoans;
