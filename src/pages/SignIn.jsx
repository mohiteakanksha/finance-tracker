// src/pages/Signup.jsx
import { Mail, Lock, User, Wallet } from "lucide-react";
import { useState } from "react";
import { TrendingUp, PiggyBank, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 added

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const res = await api.post("https://finance-tracker-v8r3.onrender.com/api/auth/signup", {
        name,
        email,
        password,
      });

      if (res.data.success) {
        alert("Account created! Please login.");
        navigate("/");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-white to-purple-100">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-10 border border-gray-100">

        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 rounded-2xl shadow-md">
            <Wallet className="text-white w-10 h-10" />
          </div>
        </div>

        <h1 className="text-center text-3xl font-semibold text-purple-600">
          Create Account
        </h1>
        <p className="text-center text-gray-500 mt-1">
          Create your account to get started
        </p>

        <div className="mt-8">
          {/* Name */}
          <label className="font-medium text-gray-700">Full Name</label>
          <div className="flex items-center gap-2 mt-1 bg-gray-100 p-3 rounded-xl">
            <User className="text-gray-500 w-5" />
            <input
              type="text"
              placeholder="John Doe"
              className="bg-transparent outline-none w-full text-gray-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <label className="font-medium text-gray-700 mt-4 block">Email</label>
          <div className="flex items-center gap-2 mt-1 bg-gray-100 p-3 rounded-xl">
            <Mail className="text-gray-500 w-5" />
            <input
              type="email"
              placeholder="you@example.com"
              className="bg-transparent outline-none w-full text-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password with eye toggle */}
          <label className="font-medium text-gray-700 mt-4 block">Password</label>
          <div className="flex items-center gap-2 mt-1 bg-gray-100 p-3 rounded-xl">
            <Lock className="text-gray-500 w-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="bg-transparent outline-none w-full text-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={showPassword ? "/src/assets/eye-open.png" : "/src/assets/eye-closed.png"}
              alt="toggle"
              className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {/* Signup Button */}
          <button
            onClick={handleSignup}
            className="w-full mt-6 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-purple-500 to-indigo-600 shadow-md hover:opacity-90 transition"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              className="text-purple-600 cursor-pointer font-medium"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>

        {/* Bottom Icons */}
        <div className="flex justify-between mt-10 text-center">

          {/* Track Income */}
          <div className="flex flex-col items-center">
            <div className="p-3 rounded-2xl bg-green-50">
              <TrendingUp size={22} className="text-green-600 opacity-80" />
            </div>
            <p className="text-xs mt-2 text-gray-600">Track Income</p>
          </div>

          {/* Save More */}
          <div className="flex flex-col items-center">
            <div className="p-3 rounded-2xl bg-blue-50">
              <PiggyBank size={22} className="text-blue-600 opacity-80" />
            </div>
            <p className="text-xs mt-2 text-gray-600">Save More</p>
          </div>

          {/* Reach Goals */}
          <div className="flex flex-col items-center">
            <div className="p-3 rounded-2xl bg-purple-50">
              <Target size={22} className="text-purple-600 opacity-80" />
            </div>
            <p className="text-xs mt-2 text-gray-600">Reach Goals</p>
          </div>

        </div>

      </div>
    </div>
  );
}
