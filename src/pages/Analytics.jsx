import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const months = [
  { name: "Jan", income: 0, expense: 0, savings: 0 },
  { name: "Feb", income: 0, expense: 0, savings: 0 },
  { name: "Mar", income: 0, expense: 0, savings: 0 },
  { name: "Apr", income: 0, expense: 0, savings: 0 },
  { name: "May", income: 0, expense: 0, savings: 0 },
  { name: "Jun", income: 0, expense: 0, savings: 0 },
  { name: "Jul", income: 0, expense: 0, savings: 0 },
  { name: "Aug", income: 0, expense: 0, savings: 0 },
  { name: "Sep", income: 0, expense: 0, savings: 0 },
  { name: "Oct", income: 0, expense: 0, savings: 0 },
  { name: "Nov", income: 0, expense: 0, savings: 0 },
  { name: "Dec", income: 0, expense: 0, savings: 0 },
];

const Analytics = () => {
  const [tab, setTab] = useState("overview");

  return (
    <div className="min-h-screen w-screen flex bg-gradient-to-br from-white to-purple-100">

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow">
        <Sidebar />
      </div>

      {/* Main Area */}
      <div className="ml-64 flex-1 flex flex-col">

        {/* NAVBAR */}
        <div className="fixed top-0 w-full z-10 bg-white shadow-sm">
          <Navbar />
        </div>

        {/* PAGE CONTENT */}
        <div className="pt-24 px-10 pb-10">

          {/* Title */}
          <h2 className="text-xl font-semibold">Analytics & Reports</h2>
          <p className="text-gray-500 mb-6">Detailed financial insights</p>

          {/* TABS */}
          <div className="flex items-center gap-4 bg-gray-100 p-1 rounded-full w-[600px]">
            {["overview", "trends", "categories", "comparison"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
                  tab === t ? "bg-white shadow" : "text-gray-600"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* Export CSV */}
          <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg float-right">
            Export CSV
          </button>

          <div className="mt-10 clear-both">
            {/* -------------------------------- Overview -------------------------------- */}
            {tab === "overview" && (
              <div className="space-y-8">

                {/* Annual Income vs Expense */}
                <div className="bg-white border rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">Annual Income vs Expense</h3>
                  <p className="text-gray-500 mb-4">Last 12 months trend</p>

                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={months}>
                        <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="expense" stroke="red" />
                        <Line type="monotone" dataKey="income" stroke="green" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Savings Trend */}
                <div className="bg-white border rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">Savings Trend</h3>
                  <p className="text-gray-500 mb-4">Monthly savings over time</p>

                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={months}>
                        <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="savings" stroke="blue" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------- Trends -------------------------------- */}
            {tab === "trends" && (
              <div className="grid grid-cols-2 gap-8">

                {/* Income Trend */}
                <div className="bg-white border rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold mb-2">Monthly Income Trend</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={months}>
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="income" stroke="green" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Expense Trend */}
                <div className="bg-white border rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold mb-2">Monthly Expense Trend</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={months}>
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="expense" stroke="red" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------- Categories -------------------------------- */}
            {tab === "categories" && (
              <div className="bg-white border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Category Breakdown</h3>

                {/* EMPTY STATE */}
                <p className="text-gray-500">No category data available.</p>
              </div>
            )}

            {/* -------------------------------- Comparison -------------------------------- */}
            {tab === "comparison" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Month-over-Month Comparison</h3>
                <p className="text-gray-500 mb-4">Compare this month with last month</p>

                {/* Income */}
                <div className="bg-white border rounded-xl p-5 shadow-sm">
                  <h4 className="font-semibold">Income</h4>
                  <div className="flex justify-between mt-2 text-sm">
                    <p>Last Month: ₹0</p>
                    <p>This Month: ₹0</p>
                    <p className="text-green-600">+0.0%</p>
                  </div>
                </div>

                {/* Expenses */}
                <div className="bg-white border rounded-xl p-5 shadow-sm">
                  <h4 className="font-semibold">Expenses</h4>
                  <div className="flex justify-between mt-2 text-sm">
                    <p>Last Month: ₹0</p>
                    <p>This Month: ₹0</p>
                    <p className="text-green-600">+0.0%</p>
                  </div>
                </div>

                {/* Savings */}
                <div className="bg-white border rounded-xl p-5 shadow-sm">
                  <h4 className="font-semibold">Savings</h4>
                  <div className="flex justify-between mt-2 text-sm">
                    <p>Last Month: ₹0</p>
                    <p>This Month: ₹0</p>
                    <p className="text-green-600">+0.0%</p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Analytics;
