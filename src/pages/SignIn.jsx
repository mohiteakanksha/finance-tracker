// src/pages/Signup.jsx
import { Mail, Lock, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const res = await api.post("/auth/signup", {
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
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-10 border border-gray-100">

        <h1 className="text-center text-3xl font-semibold text-purple-600">
          Create Account
        </h1>

        <div className="mt-8">
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

          <label className="font-medium text-gray-700 mt-4 block">Password</label>
          <div className="flex items-center gap-2 mt-1 bg-gray-100 p-3 rounded-xl">
            <Lock className="text-gray-500 w-5" />
            <input
              type="password"
              placeholder="••••••••"
              className="bg-transparent outline-none w-full text-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleSignup}
            className="w-full mt-6 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-purple-500 to-pink-500 shadow-md hover:opacity-90 transition"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              className="text-purple-600 cursor-pointer font-medium"
              onClick={() => navigate("/")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
