import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import api from "../axiosConfig";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const monthNames = [
  "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
];

const COLORS = [
  "#7C3AED", "#F97316", "#22C55E", "#EC4899", "#EAB308", "#3B82F6", "#8B5CF6",
  "#06B6D4", "#FB7185", "#10B981", "#F59E0B", "#6366F1"
];

export default function Analytics() {
  const [tab, setTab] = useState("overview");
  const [months, setMonths] = useState([]);
  const [categories, setCategories] = useState([]);
  const [incomeSources, setIncomeSources] = useState([]);
  const [comparison, setComparison] = useState(null);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/analytics/overview", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const updated = monthNames.map((m, i) => {
          const found = res.data.find((x) => x._id && x._id.month === i + 1);
          return {
            name: m,
            income: found?.income || 0,
            expense: found?.expense || 0,
            savings: found?.savings || 0,
          };
        });

        setMonths(updated);
      } catch (error) {
        console.log("fetchOverview error:", error);
      }
    };

    fetchOverview();
  }, []);

  useEffect(() => {
    if (tab !== "categories") return;
    const fetchCat = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/analytics/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(res.data || []);
      } catch (err) {
        console.log("fetch categories error:", err);
      }
    };
    fetchCat();
  }, [tab]);

  useEffect(() => {
    if (tab !== "categories") return;
    const fetchIncomeSources = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/analytics/income-sources", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIncomeSources(res.data || []);
      } catch (err) {
        console.log("fetch income sources error:", err);
      }
    };
    fetchIncomeSources();
  }, [tab]);

  useEffect(() => {
    if (tab !== "comparison") return;
    const fetchComparison = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/analytics/comparison", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComparison(res.data || null);
      } catch (err) {
        console.log("fetch comparison error:", err);
      }
    };
    fetchComparison();
  }, [tab]);

  const formatCurrency = (n) => {
    if (n === undefined || n === null) return "₹0";
    return "₹" + Number(n).toLocaleString();
  };

  const renderPieLabel = (entry) => {
    const percent = entry.percent * 100;
    return percent < 3 ? "" : `${Math.round(percent)}%`;
  };

  const exportCSV = () => {
    let csv = "Monthly Analytics\nMonth,Income,Expense,Savings\n";
    months.forEach((m) => {
      csv += `${m.name},${m.income},${m.expense},${m.savings}\n`;
    });

    csv += "\nCategories (Expense)\nCategory,Amount\n";
    categories.forEach((c) => {
      const name = c._id ?? c.category ?? "";
      csv += `${name},${c.totalAmount}\n`;
    });

    csv += "\nIncome Sources\nSource,Amount\n";
    incomeSources.forEach((s) => {
      const name = s._id ?? s.source ?? "";
      csv += `${name},${s.totalAmount}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "analytics_report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-white to-purple-100 flex">
      <Sidebar />

      <div className="flex-1 ml-10">
        <Navbar />

         <div className=" mt-16 overflow-y-auto pt-16 pl-64">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Analytics & Reports</h2>
            <button
              onClick={exportCSV}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              Export CSV
            </button>
          </div>
          <p className="text-gray-500 mb-6">Detailed financial insights</p>

          <div className="flex items-center gap-6 bg-purple-200 p-1 rounded-full ">
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

          {/* ------------------ OVERVIEW ------------------ */}
          {tab === "overview" && (
            <div className="mt-10 space-y-10">

              {/* ----------- Annual Income vs Expense ----------- */}
              <div className="bg-white border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold">Annual Income vs Expense</h3>
                <p className="text-gray-500 mb-3">Last 12 months trend</p>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={months}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                      <Bar dataKey="expense" fill="#EF4444" name="Expense" />
                      <Bar dataKey="income" fill="#22C55E" name="Income" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* ----------- Savings Trend (ADDED HERE) ----------- */}
              <div className="bg-white border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold">Savings Trend</h3>
                <p className="text-gray-500 mb-3">Monthly savings over time</p>

                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={months}>
                      <CartesianGrid strokeDasharray="5 5" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(v) => formatCurrency(v)} />
                      <Line
                        type="monotone"
                        dataKey="savings"
                        stroke="#3B82F6"
                        dot={true}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          )}

          {/* ------------------ TRENDS ------------------ */}
          {tab === "trends" && (
            <div className="mt-10 grid grid-cols-2 gap-10">
              <div className="bg-white border rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold mb-2">Monthly Income Trend</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={months}>
                      <CartesianGrid strokeDasharray="5 5" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Line type="monotone" dataKey="income" stroke="#22C55E" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold mb-2">Monthly Expense Trend</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={months}>
                      <CartesianGrid strokeDasharray="5 5" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Line type="monotone" dataKey="expense" stroke="#EF4444" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* ------------------ CATEGORIES ------------------ */}
          {tab === "categories" && (
            <div className="mt-10 grid grid-cols-2 gap-10">
              {/* Expense Pie */}
              <div className="bg-white border rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold">Expense by Category</h3>
                <p className="text-gray-500 text-sm mb-4">This month's breakdown</p>

                <div className="flex flex-col items-center">
                  <div style={{ width: "80%", height: 260 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categories}
                          dataKey="totalAmount"
                          nameKey="_id"
                          cx="50%"
                          cy="50%"
                          innerRadius={48}
                          outerRadius={90}
                          label={renderPieLabel}
                          labelLine={false}
                        >
                          {categories.map((_, idx) => (
                            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-6 w-full">
                    {categories.length === 0 ? (
                      <p className="text-gray-500 text-center">
                        No category data available.
                      </p>
                    ) : (
                      categories.map((c, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between mb-3 px-6"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              style={{
                                width: 12,
                                height: 12,
                                borderRadius: 6,
                                background: COLORS[idx % COLORS.length],
                                display: "inline-block",
                              }}
                            />
                            <span className="text-sm">
                              {c._id ?? c.category ?? "Unknown"}
                            </span>
                          </div>
                          <div className="text-sm">
                            {formatCurrency(c.totalAmount)}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Income Pie */}
              <div className="bg-white border rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold">Income by Source</h3>
                <p className="text-gray-500 text-sm mb-4">This month's breakdown</p>

                <div className="flex flex-col items-center">
                  <div style={{ width: "80%", height: 260 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={incomeSources}
                          dataKey="totalAmount"
                          nameKey="_id"
                          cx="50%"
                          cy="50%"
                          innerRadius={48}
                          outerRadius={90}
                          label={renderPieLabel}
                          labelLine={false}
                        >
                          {incomeSources.map((_, idx) => (
                            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-6 w-full">
                    {incomeSources.length === 0 ? (
                      <p className="text-gray-500 text-center">
                        No income source data.
                      </p>
                    ) : (
                      incomeSources.map((s, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between mb-3 px-6"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              style={{
                                width: 12,
                                height: 12,
                                borderRadius: 6,
                                background: COLORS[idx % COLORS.length],
                                display: "inline-block",
                              }}
                            />
                            <span className="text-sm">
                              {s._id ?? s.source ?? "Unknown"}
                            </span>
                          </div>
                          <div className="text-sm">
                            {formatCurrency(s.totalAmount)}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ------------------ COMPARISON ------------------ */}
          {tab === "comparison" && comparison && (
            <div className="mt-10 space-y-6 ">
              {[
                { label: "Income", key: "income", color: "text-green-600" },
                { label: "Expenses", key: "expense", color: "text-red-600" },
                { label: "Savings", key: "savings", color: "text-blue-600" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white border rounded-xl p-6 shadow-sm">
                  <h4 className="font-semibold">{item.label}</h4>
                  <div className="flex justify-between mt-3 text-sm">
                    <p>
                      Last Month:{" "}
                      {formatCurrency(comparison[item.key].lastMonth)}
                    </p>
                    <p>
                      This Month:{" "}
                      {formatCurrency(comparison[item.key].thisMonth)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
