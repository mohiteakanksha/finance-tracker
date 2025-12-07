import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import {
  TrendingUp,
  CreditCard,
  PiggyBank,
  Wallet
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-white to-purple-100 flex flex-col">

      {/* TOP NAVBAR */}
      <Navbar />

      {/* LAYOUT */}
      <div className="flex flex-1 ">

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT  p-8 mt-16 h-[calc(100vh-4rem)] overflow-y-auto */}
        <main className="flex-1 mt-14 p-12 overflow-y-auto">

          {/* HEADER CARD */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-semibold">Good Evening!</h2>
            <p className="opacity-80">Here's your financial overview for today</p>
          </div>

          {/* STAT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            <StatCard title="Total Income" amount="₹0" icon={<TrendingUp size={26} />} />
            <StatCard title="Total Expenses" amount="₹0" icon={<CreditCard size={26} />} />
            <StatCard title="Savings" amount="₹0" icon={<PiggyBank size={26} />} />
            <StatCard title="Transactions" amount="0" icon={<Wallet size={26} />} />
          </div>

          {/* CHART SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

            {/* Income vs Expense Chart */}
            <div className="bg-white rounded-2xl p-6 shadow h-96">
              <h3 className="font-semibold">Income vs Expense Trend</h3>
              <p className="text-gray-500 text-sm mb-2">Last 6 months overview</p>

              <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
                Chart Placeholder
              </div>
            </div>

            {/* Spending Category Chart */}
            <div className="bg-white rounded-2xl p-6 shadow h-96">
              <h3 className="font-semibold">Spending by Category</h3>
              <p className="text-gray-500 text-sm mb-2">Top categories this month</p>

              <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
                Category Chart Placeholder
              </div>
            </div>
          </div>

          {/* INSIGHTS */}
          <div className="bg-white rounded-2xl p-6 shadow mt-6">
            <h3 className="font-semibold text-lg">Smart Insights</h3>
            <p className="text-gray-600 text-sm mt-1">AI-powered financial insights</p>

            <div className="w-full h-32 bg-gray-200 rounded-xl mt-4 flex items-center justify-center text-gray-500">
              AI Insights Placeholder
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

/* COMPONENTS */
const StatCard = ({ title, amount, icon }) => (
  <div className="bg-white rounded-2xl p-6 shadow flex justify-between items-center">
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-2xl font-semibold mt-1">{amount}</h3>
    </div>
    <div className="bg-purple-100 text-purple-600 p-3 rounded-full">{icon}</div>
  </div>
);

export default Dashboard;
