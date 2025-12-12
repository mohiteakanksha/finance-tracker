import React, { useState } from "react";
import {
  Home,
  Wallet,
  CreditCard,
  PiggyBank,
  TrendingUp,
  PieChart,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  // ⭐ Track which menu is active
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
    { name: "Transactions", icon: <Wallet size={20} />, path: "/transactions" },
    { name: "Budgets", icon: <CreditCard size={20} />, path: "/budgets" },
    { name: "Savings Goals", icon: <PiggyBank size={20} />, path: "/savings" },
    { name: "Investments", icon: <TrendingUp size={20} />, path: "/investments" },
    { name: "EMI & Loans", icon: <CreditCard size={20} />, path: "/emi" },
    { name: "Subscription", icon: <Wallet size={20} />, path: "/subscription" },
    { name: "Analytics", icon: <BarChart3 size={20} />, path: "/analytics" },

  ];

  return (
    <aside className="w-64 bg-white border-r flex flex-col p-6 h-screen sticky top-0">

      <nav className="flex flex-col gap-3 flex-1 mt-4">
        {menuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => {
              setActive(item.name);       // ⭐ Set active item
              navigate(item.path);        // ⭐ Navigate to page
            }}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition
              ${active === item.name 
                ? "bg-purple-500 text-white"        // ACTIVE STYLE
                : "text-gray-700 hover:bg-gray-200" // NORMAL STYLE
              }`}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.name}</span>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-3 p-3 rounded-xl cursor-pointer text-gray-700 hover:bg-gray-200"
      >
        <LogOut size={20} />
        <span className="text-sm font-medium">Logout</span>
      </div>
    </aside>
  );
};

export default Sidebar;
