import React from "react";

const Navbar = () => {
  return (
    <div className="fixed left-64 top-0 right-0 h-16 bg-white shadow-sm border-b flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold">Personal Finance Tracker</h2>

      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
        A
      </div>
    </div>
  );
};

export default Navbar;
