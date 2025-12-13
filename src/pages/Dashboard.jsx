// Dashboard.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import {
  TrendingUp,
  CreditCard,
  PiggyBank,
  Wallet
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import api from "../axiosConfig";

const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const COLORS = [
  "#7C3AED", "#F97316", "#22C55E", "#EC4899", "#EAB308", "#3B82F6",
  "#8B5CF6", "#06B6D4", "#FB7185", "#10B981", "#F59E0B", "#6366F1"
];

export default function Dashboard() {
  const [months, setMonths] = useState(() =>
    monthNames.map((m) => ({ name: m, income: 0, expense: 0, savings: 0 }))
  );
  const [categories, setCategories] = useState([]); // includes type
  const [incomeSources, setIncomeSources] = useState([]);
  const [comparison, setComparison] = useState(null);
  const [txCount, setTxCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch overview (monthly aggregates)
  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/analytics/overview", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // res.data expected array with { _id: { month, year }, income, expense, savings }
        const updated = monthNames.map((m, i) => {
          const found = (res.data || []).find(
            (x) => x._id && Number(x._id.month) === i + 1
          );
          return {
            name: m,
            income: found?.income || 0,
            expense: found?.expense || 0,
            savings: found?.savings || 0,
          };
        });
        setMonths(updated);
      } catch (err) {
        console.error("fetchOverview error:", err);
      }
    };

    fetchOverview();
  }, []);

  // Fetch categories (expense + maybe income category rows)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/analytics/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Expecting [{ _id: 'Food', totalAmount: 2000, type: 'expense' }, ...]
        setCategories(res.data || []);
      } catch (err) {
        console.error("fetch categories error:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch income sources
  useEffect(() => {
    const fetchIncomeSources = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/analytics/income-sources", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIncomeSources(res.data || []);
      } catch (err) {
        console.error("fetch income sources error:", err);
      }
    };
    fetchIncomeSources();
  }, []);

  // Fetch comparison
  useEffect(() => {
    const fetchComparison = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/analytics/comparison", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComparison(res.data || null);
      } catch (err) {
        console.error("fetch comparison error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchComparison();
  }, []);

  // Fetch transaction count (try /transactions/count then fallback)
 useEffect(() => {
  const fetchTxCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/transactions/count", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTxCount(res.data?.count || 0);
    } catch (err) {
      console.error("Transaction count error:", err);
      setTxCount(0);
    }
  };

  fetchTxCount();
}, []);


  // Helpers
  const sumArr = (arr = [], key = "totalAmount") =>
    (arr || []).reduce((s, it) => s + (Number(it[key] || 0)), 0);

  const formatCurrency = (n) => {
    const num = Number(n || 0);
    return "₹" + num.toLocaleString();
  };

  // Totals for stat cards
  const totalIncome = sumArr(incomeSources, "totalAmount");
  // categories may include both income and expense; filter expense
  const expenseCategories = categories.filter((c) => !c.type || c.type === "expense");
  const totalExpense = sumArr(expenseCategories, "totalAmount");
  const savings = totalIncome - totalExpense;

  // Insights helpers
  const highestCategory = expenseCategories.length
    ? expenseCategories.reduce((a, b) => (a.totalAmount > b.totalAmount ? a : b))
    : null;

  const expenseChangePercent = (() => {
    if (!comparison?.expense) return null;
    const last = Number(comparison.expense.lastMonth || 0);
    const cur = Number(comparison.expense.thisMonth || 0);
    if (last === 0) {
      if (cur === 0) return 0;
      return 100; // from zero to some value => 100% increase (conservative)
    }
    return ((cur - last) / Math.abs(last)) * 100;
  })();

  // Chart data: show last 6 months around current month for the "Last 6 months overview"
  // We'll take last 6 elements from months array (which is Jan..Dec). If you want sliding window by current month, you can adjust.
  const last6Months = (() => {
    // find current month index (1-12)
    const now = new Date();
    const curMonthIndex = now.getMonth(); // 0 based
    // produce a 6-month window ending at current month index
    const data = [];
    for (let i = 5; i >= 0; i--) {
      const idx = (curMonthIndex - i + 12) % 12;
      data.push(months[idx]);
    }
    return data;
  })();

  // Pie data: show top categories (expense) sorted descending; show top 6
  const pieExpenseData = expenseCategories
    .slice()
    .sort((a,b)=> b.totalAmount - a.totalAmount)
    .slice(0, 8) // up to 8 slices
    .map((c) => ({ name: c._id || "Unknown", value: c.totalAmount }));

  // Income pie
  const pieIncomeData = (incomeSources || []).slice(0, 8).map((s)=> ({ name: s._id || s.source || "Income", value: s.totalAmount }));

  // Smart insights strings
  const insights = [
    highestCategory
      ? `Your highest spending category is ${highestCategory._id} with ${formatCurrency(highestCategory.totalAmount)}.`
      : "No expenses recorded yet.",
    expenseChangePercent !== null
      ? (expenseChangePercent > 0
          ? `You spent ${Math.abs(expenseChangePercent).toFixed(1)}% more than last month.`
          : `Great — your expenses decreased by ${Math.abs(expenseChangePercent).toFixed(1)}% vs last month.`)
      : "No comparison data available.",
    `Great job! You saved ${formatCurrency(savings)} this month.`
  ];

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-white to-purple-100 flex flex-col">

      {/* TOP NAVBAR */}
      <Navbar />

      {/* LAYOUT */}
      <div className="flex flex-1 ">

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT  */}
        <main className="flex-1 mt-2 p-12 overflow-y-auto pt-16 pl-64 ml-6">

          {/* HEADER CARD */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-semibold">Good Morning!</h2>
            <p className="opacity-90">Here's your financial overview for today</p>
          </div>

          {/* STAT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            <StatCard
              title="Total Income"
              amount={formatCurrency(totalIncome)}
              meta={comparison?.income ? (
                <span className="text-sm text-green-600">
                  {comparison.income.thisMonth > comparison.income.lastMonth ? "▲ " : "▼ "}
                  {((comparison.income.thisMonth - comparison.income.lastMonth) / (comparison.income.lastMonth || 1) * 100).toFixed(1)}% from last month
                </span>
              ) : <span className="text-sm text-gray-400">—</span>}
              icon={<TrendingUp size={26} />}
            />

            <StatCard
              title="Total Expenses"
              amount={formatCurrency(totalExpense)}
              meta={comparison?.expense ? (
                <span className={`text-sm ${expenseChangePercent > 0 ? "text-red-500" : "text-green-600"}`}>
                  {expenseChangePercent > 0 ? "▲ " : "▼ "}
                  {Math.abs(expenseChangePercent || 0).toFixed(1)}% from last month
                </span>
              ) : <span className="text-sm text-gray-400">—</span>}
              icon={<CreditCard size={26} />}
            />

            <StatCard
              title="Savings"
              amount={formatCurrency(savings)}
              meta={<span className="text-sm text-gray-500">{totalIncome ? `${((savings / totalIncome) * 100).toFixed(1)}% of income` : "—"}</span>}
              icon={<PiggyBank size={26} />}
            />

            <StatCard
              title="Transactions"
              amount={txCount}
              meta={<span className="text-sm text-gray-500">This month</span>}
              icon={<Wallet size={26} />}
            />
          </div>

          {/* CHART SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

            {/* Income vs Expense Chart */}
            <div className="bg-white rounded-2xl p-6 shadow h-96">
              <h3 className="font-semibold">Income vs Expense Trend</h3>
              <p className="text-gray-500 text-sm mb-2">Last 6 months overview</p>

              <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={last6Months}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(v) => formatCurrency(v)} />
                    <Legend verticalAlign="bottom" height={36} />
                    <Line type="monotone" dataKey="expense" name="Expense" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="income" name="Income" stroke="#22C55E" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Spending Category Chart */}
            {/* Spending Category Chart */}
<div className="bg-white rounded-2xl p-6 shadow h-96">
  <h3 className="font-semibold">Spending by Category</h3>
  <p className="text-gray-500 text-sm mb-2">Top categories this month</p>

   <div className="flex flex-col items-center justify-center h-full">
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
  <PieChart>
    <Pie
      data={pieExpenseData}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={110}
      innerRadius={70}
      labelLine
      label={({ name, value }) => {
        const total = pieExpenseData.reduce((a, b) => a + b.value, 0);
        const percent = Math.round((value / total) * 100);
        return `${name} - ${percent}%`;
      }}
    >
      {pieExpenseData.map((_, i) => (
        <Cell key={i} fill={COLORS[i % COLORS.length]} />
      ))}
    </Pie>
  </PieChart>
</ResponsiveContainer>

    </div>

    {/* Legend under chart */}
    
  </div>
</div>

          </div>

          {/* INSIGHTS */}
          <div className="bg-white rounded-2xl p-6 shadow mt-6">
            <h3 className="font-semibold text-lg">Smart Insights</h3>
            <p className="text-gray-600 text-sm mt-1">AI-powered financial insights</p>

            <div className="mt-4 space-y-3">
              {insights.map((s, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm">
                    {/* small icon - simple bullet */}
                    <span className="text-gray-500 text-sm">✓</span>
                  </div>
                  <div className="text-gray-700">{s}</div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

/* Small presentational stat card */
const StatCard = ({ title, amount, meta, icon }) => (
  <div className="bg-white rounded-2xl p-6 shadow flex justify-between items-center">
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-2xl font-semibold mt-1">{amount}</h3>
      <div className="mt-1">{meta}</div>
    </div>
    <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
      {icon}
    </div>
  </div>
);
