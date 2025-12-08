import { useState } from "react";
import { User, Mail, Lock, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");  // changed fullName → username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // SIGNUP FUNCTION
  const handleCreateAccount = async () => {
    if (!username || !email || !password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        username,   // field name FIXED
        email,
        password,
      });

      alert("Account Created Successfully!");
navigate("/dashboard"); 


    } catch (err) {
      alert(err.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-white to-purple-100">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-10 border border-gray-100">

        {/* Logo */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-md">
            <Wallet className="text-white w-10 h-10" />
          </div>
        </div>

        <h1 className="text-center text-3xl font-semibold text-purple-600 mt-4">
          Finance Tracker
        </h1>
        <p className="text-center text-gray-500 mt-1">
          Create your account to get started
        </p>

        <div className="mt-10">

          {/* Username */}
          <label className="font-medium text-gray-700">Full Name</label>
          <div className="flex items-center gap-2 mt-1 bg-gray-100 p-3 rounded-xl">
            <User className="text-gray-500 w-5" />
            <input
              type="text"
              placeholder="John Doe"
              className="bg-transparent outline-none w-full text-gray-700"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <label className="font-medium text-gray-700 mt-4 block">Email Address</label>
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

          {/* Password */}
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
              className="w-5 h-5 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {/* Button */}
          <button
            onClick={handleCreateAccount}
            className="w-full mt-6 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-purple-500 to-pink-500 shadow-md hover:opacity-90 transition"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              className="text-purple-600 cursor-pointer font-medium"
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}
