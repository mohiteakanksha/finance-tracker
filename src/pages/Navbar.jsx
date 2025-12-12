import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed left-64 top-0 right-0 h-16 bg-white shadow-sm border-b flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold">Personal Finance Tracker</h2>

      {/* Profile Icon */}
      <div
        onClick={() => navigate("/profile")}
        className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-700 transition"
      >
        <User size={20} className="text-white" />
      </div>
    </div>
  );
};

export default Navbar;
