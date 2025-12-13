import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Plus, Trash2 } from "lucide-react";
import AddSubscriptionModal from "./AddSubscriptionModal";
import api from "../axiosConfig";

import getSubscriptionIcon from "../utils/subscriptionIcons";

export default function Subscriptions() {
  const [open, setOpen] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  // Fetch logged-in user's subscriptions
  const loadSubscriptions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/subscriptions", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSubscriptions(res.data);

      // Calculate monthly total
      const total = res.data.reduce((acc, s) => acc + Number(s.cost), 0);
      setTotalCost(total);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadSubscriptions();
  }, []);

 

  // Delete subscription
 const deleteSubscription = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await api.delete(`/subscriptions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    loadSubscriptions();
  } catch (err) {
    console.log("Delete Error:", err.response?.data || err);
  }
};


  return (
    <div className="h-screen w-screen bg-gradient-to-br from-white to-purple-100 flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <Navbar />

        {/* HEADER + BUTTON */}
        <div className="flex justify-between items-center p-8 pt-16 pl-64">
          <div>
            <h1 className="text-xl font-semibold">Subscription Tracker</h1>
            <p className="text-gray-500">Manage recurring subscriptions</p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            <Plus size={18} /> Add Subscription
          </button>
        </div>

        {/* MONTHLY OVERVIEW CARD */}
        <div className="bg-white p-4  rounded-xl shadow-sm border pt-16 pl-64 ml-6 mt-6  pr-6 ">
          <h2 className="text-lg font-semibold">Monthly Overview</h2>
          <p className="text-gray-500">Total recurring costs</p>

          <p className="text-4xl font-bold mt-3">₹{totalCost.toFixed(2)}</p>
          <p className="text-gray-500 mt-1">
            {subscriptions.length} active subscriptions
          </p>
        </div>

        {/* SUBSCRIPTION LIST */}
        <div className="mt-6 space-y-4 pl-64 ">
          {subscriptions.map((s) => {
            const Icon = getSubscriptionIcon(s.name);

            return (
              <div
                key={s._id}
                className="bg-white p-5 rounded-xl border shadow-sm flex justify-between items-center"
              >
                {/* LEFT SIDE */}
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Icon className="text-purple-600" size={22} />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">{s.name}</h3>
                    <p className="text-gray-500">
                      {s.frequency} • Next:{" "}
                      {new Date(s.nextRenewal).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-6">
                  {/* COST */}
                  <div className="text-lg font-semibold">₹{s.cost}</div>

                  
                  {/* DELETE BUTTON */}
                  <Trash2
                    className="text-red-500 cursor-pointer"
                    onClick={() => deleteSubscription(s._id)}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* MODAL */}
        {open && (
          <AddSubscriptionModal
            onClose={() => setOpen(false)}
            reload={loadSubscriptions}
          />
        )}
      </div>
    </div>
  );
}
