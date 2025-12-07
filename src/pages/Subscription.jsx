import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AddSubscriptionModal from "./AddSubscriptionModal";

const Subscriptions = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen w-screen flex bg-gradient-to-br from-white to-purple-100">

      {/* FIXED SIDEBAR */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow">
        <Sidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="ml-64 flex-1 flex flex-col">

        {/* FIXED NAVBAR */}
        <div className="w-full fixed z-10 bg-white">
          <Navbar />
        </div>

        {/* PAGE CONTENT */}
        <div className="pt-24 px-12">

          {/* TITLE + BUTTON */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-[18px] font-semibold">Subscription Tracker</h2>
              <p className="text-gray-500 text-sm">
                Manage recurring subscriptions
              </p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
            >
              <span className="text-lg">+</span> Add Subscription
            </button>
          </div>

          {/* MONTHLY OVERVIEW BOX */}
          <div className="bg-white border rounded-xl p-6 mb-6 shadow-sm">
            <h3 className="font-medium text-[16px] mb-1">Monthly Overview</h3>
            <p className="text-gray-500 text-sm">Total recurring costs</p>

            <h1 className="text-[32px] font-semibold mt-4">₹0</h1>
            <p className="text-gray-500 text-sm mt-1">0 active subscriptions</p>
          </div>

          {/* EMPTY STATE */}
          <div className="bg-white border rounded-xl h-[300px] flex flex-col items-center justify-center text-center shadow-sm">
            <div className="text-gray-400 text-5xl mb-4">📺</div>
            <p className="text-gray-600 font-medium">No subscriptions tracked</p>
            <p className="text-gray-500 text-sm">
              Add your subscriptions to track renewals
            </p>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {open && <AddSubscriptionModal onClose={() => setOpen(false)} />}
    </div>
  );
};

export default Subscriptions;
