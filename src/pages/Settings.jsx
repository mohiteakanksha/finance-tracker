import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen w-screen flex bg-white">

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 flex flex-col">

        {/* Navbar */}
        <div className="w-full fixed z-10">
          <Navbar />
        </div>

        {/* Page Content */}
        <div className="pt-24 px-10">

          {/* Title */}
          <h2 className="text-[18px] font-semibold mb-1">Settings</h2>
          <p className="text-gray-500 text-sm mb-6">
            Manage your app preferences
          </p>

          {/* GRID 2x2 */}
          <div className="grid grid-cols-2 gap-6">

            {/* Appearance */}
            <div className="border rounded-xl p-6 shadow-sm bg-white">
              <h3 className="text-[16px] font-medium mb-1 flex items-center gap-2">
                <span className="text-xl">✨</span> Appearance
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Customize the app’s appearance
              </p>

              <div className="flex items-center justify-between mt-2">
                <p className="text-sm font-medium">Dark Mode</p>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-gray-300 peer-focus:ring-2 peer-focus:ring-purple-400 rounded-full peer peer-checked:bg-black transition-all"></div>
                  <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transform peer-checked:translate-x-5 transition-all"></span>
                </label>
              </div>
            </div>

            {/* Currency */}
            <div className="border rounded-xl p-6 shadow-sm bg-white">
              <h3 className="text-[16px] font-medium mb-1 flex items-center gap-2">
                <span className="text-xl">🌍</span> Currency
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Set your preferred currency
              </p>

              <label className="text-sm font-medium">Default Currency</label>
              <select className="w-full border rounded-lg p-2 text-sm mt-1 bg-gray-50">
                <option>₹ INR</option>
                <option>$ USD</option>
                <option>€ EUR</option>
                <option>£ GBP</option>
              </select>
            </div>

            {/* Notifications */}
            <div className="border rounded-xl p-6 shadow-sm bg-white">
              <h3 className="text-[16px] font-medium mb-1 flex items-center gap-2">
                <span className="text-xl">🔔</span> Notifications
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Manage notification preferences
              </p>

              <div className="flex items-center justify-between mt-2">
                <p className="text-sm font-medium">Enable Notifications</p>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-gray-300 peer-focus:ring-2 peer-focus:ring-purple-400 rounded-full peer peer-checked:bg-black transition-all"></div>
                  <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transform peer-checked:translate-x-5 transition-all"></span>
                </label>
              </div>
            </div>

            {/* Data Management */}
            <div className="border rounded-xl p-6 shadow-sm bg-white">
              <h3 className="text-[16px] font-medium mb-1 flex items-center gap-2">
                <span className="text-xl">📦</span> Data Management
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Manage your financial data
              </p>

              <div className="bg-gray-50 border rounded-lg p-4 text-sm text-gray-600 leading-6">
                <p>• Data is automatically saved</p>
                <p>• Stored securely in your browser</p>
                <p>• Available offline</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
