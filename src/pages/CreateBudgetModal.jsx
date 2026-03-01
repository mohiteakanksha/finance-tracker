import React, { useState } from "react";
import {
  X,
  ChevronDown,
  Utensils,
  Home,
  ShoppingCart,
  HeartPulse,
  GraduationCap,
  CreditCard,
  Car,
  Tv,
  Plane,
  Receipt,
  Wallet,
} from "lucide-react";

import api from "../axiosConfig";

const CreateBudgetModal = ({ onClose }) => {
  const [category, setCategory] = useState("");
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("Monthly");
  const [showPeriodList, setShowPeriodList] = useState(false);

  // ✅ Categories with Icons
  const categories = [
    { name: "Food", icon: <Utensils size={16} /> },
    { name: "Groceries", icon: <ShoppingCart size={16} /> },
    { name: "Rent", icon: <Home size={16} /> },
    { name: "Travel", icon: <Plane size={16} /> },
    { name: "Subscriptions", icon: <Tv size={16} /> },
    { name: "Education", icon: <GraduationCap size={16} /> },
    { name: "EMI", icon: <CreditCard size={16} /> },
    { name: "Transport", icon: <Car size={16} /> },
    { name: "Health", icon: <HeartPulse size={16} /> },
    { name: "Shopping", icon: <ShoppingCart size={16} /> },
    { name: "Bills", icon: <Receipt size={16} /> },
    { name: "Others", icon: <Wallet size={16} /> },
  ];

  const periods = ["Monthly", "Weekly", "Yearly"];

  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    if (!category || !amount) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.post(
        "/budgets/add",
        { category, amount: Number(amount), period },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Budget added successfully");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error adding budget");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-[450px] rounded-xl shadow-xl p-6 relative">

        {/* Close */}
        <button className="absolute top-4 right-4" onClick={onClose}>
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold">Create Budget</h2>
        <p className="text-gray-500 text-sm">
          Set spending limits for categories
        </p>

        <div className="mt-5 flex flex-col gap-4">

          {/* Category */}
          <div className="relative">
            <label className="text-sm font-medium">Category *</label>

            <div
              className="border rounded-lg px-4 py-2 flex justify-between items-center mt-1 cursor-pointer"
              onClick={() => setShowCategoryList(!showCategoryList)}
            >
              {category || "Select category"}
              <ChevronDown size={18} />
            </div>

            {showCategoryList && (
              <div className="absolute bg-white border rounded-lg w-full mt-1 shadow-md max-h-48 overflow-y-auto z-10">
                {categories.map((cat) => (
                  <div
                    key={cat.name}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    onClick={() => {
                      setCategory(cat.name);
                      setShowCategoryList(false);
                    }}
                  >
                    {cat.icon}
                    {cat.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="text-sm font-medium">Budget Amount *</label>
            <input
              type="number"
              placeholder="0.00"
              className="border rounded-lg px-4 py-2 mt-1 w-full"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Period */}
          <div className="relative">
            <label className="text-sm font-medium">Period</label>

            <div
              className="border rounded-lg px-4 py-2 flex justify-between items-center mt-1 cursor-pointer"
              onClick={() => setShowPeriodList(!showPeriodList)}
            >
              {period}
              <ChevronDown size={18} />
            </div>

            {showPeriodList && (
              <div className="absolute bg-white border rounded-lg w-full mt-1 shadow-md z-10">
                {periods.map((per) => (
                  <div
                    key={per}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setPeriod(per);
                      setShowPeriodList(false);
                    }}
                  >
                    {per}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button onClick={onClose} className="px-4 py-2 rounded-lg border">
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
            >
              Create Budget
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreateBudgetModal;