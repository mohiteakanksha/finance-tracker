import React, { useState, useRef, useEffect } from "react";
import { Wallet } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  let storedUser = null;
  try {
    storedUser = JSON.parse(localStorage.getItem("user"));
  } catch {}

  const username =
    storedUser?.username ||
    storedUser?.email?.split("@")[0] ||
    "User";

  const initial = username.charAt(0).toUpperCase();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm border-b flex items-center justify-between px-6 z-50">

      {/* 🔹 LEFT: Logo + App Name */}
      <div className="flex items-center gap-3">
        <div className="bg-purple-600 p-2 rounded-xl">
          <Wallet className="text-white w-6 h-6" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">
          Personal Finance Tracker
        </h2>
      </div>

      {/* 🔹 RIGHT: User Avatar */}
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setOpen(!open)}
          className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer"
        >
          <span className="text-white font-semibold text-lg">
            {initial}
          </span>
        </div>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
            <div className="px-4 py-2 text-gray-700 font-medium text-sm text-center">
              {username}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
