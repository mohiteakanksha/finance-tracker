import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import AddTransactionModal from "./AddTransactionModal";
import { Navigate } from "react-router-dom";

const Transactions = () => {
  const [open, setOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;

  // Fetch Transactions
  useEffect(() => {
    fetch("http://localhost:5000/api/transactions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTransactions(data.data);
        } else {
          console.log("Error:", data.message);
        }
      })
      .catch((err) => console.log(err));
  }, [token]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-white to-purple-100 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        {/* MAIN CONTENT */}
        <div className="p-8 mt-2 h-[calc(100vh-4rem)] overflow-y-auto pt-16 pl-64 ml-6">

          {/* PAGE HEADER + BUTTON (OUTSIDE CARD) */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Transactions</h2>
              <p className="text-gray-500">
                Track all your income and expenses
              </p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              + Add Transaction
            </button>
          </div>

          {/* TRANSACTIONS CARD */}
          <div className="bg-white shadow-sm border rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-4">Transactions</h3>

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
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                        style={{
                          background:
                            t.type === "income" ? "#16a34a" : "#ef4444",
                        }}
                      >
                        {t.type === "income" ? "↓" : "↑"}
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg">
                          {t.category}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          {t.paymentMethod}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {formatDate(t.date)}
                        </p>
                      </div>
                    </div>

                    <p
                      className={`text-lg font-semibold ${
                        t.type === "expense"
                          ? "text-red-500"
                          : "text-green-600"
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
