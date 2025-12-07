import { useState } from "react";
import { User, Mail, Lock, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = () => {
    if (!fullName || !email || !password) {
      alert("Please fill all fields!");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-white to-purple-100">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-10 border border-gray-100">

        {/* Icon */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-md">
            <Wallet className="text-white w-10 h-10" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center text-3xl font-semibold text-purple-600 mt-4">
          Finance Tracker
        </h1>
        <p className="text-center text-gray-500 mt-1">
          Create your account to get started
        </p>

        {/* Form */}
        <div className="mt-10">

          {/* Full Name */}
          <label className="font-medium text-gray-700">Full Name</label>
          <div className="flex items-center gap-2 mt-1 bg-gray-100 p-3 rounded-xl">
            <User className="text-gray-500 w-5" />
            <input
              type="text"
              placeholder="John Doe"
              className="bg-transparent outline-none w-full text-gray-700"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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
              alt="toggle password"
              className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {/* Create Account Button */}
          <button
            onClick={handleCreateAccount}
            className="w-full mt-6 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-purple-500 to-pink-500 shadow-md hover:opacity-90 transition"
          >
            Create Account
          </button>

          {/* Link to Login */}
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

        {/* Footer Icons */}
        <div className="flex justify-between mt-10 text-center">
          <div className="flex flex-col items-center">
            <img src="https://cdn-icons-png.flaticon.com/512/1040/1040238.png" className="w-8 mb-1 opacity-80" />
            <p className="text-xs text-gray-600">Track Income</p>
          </div>

          <div className="flex flex-col items-center">
            <img src="https://cdn-icons-png.flaticon.com/512/992/992652.png" className="w-8 mb-1 opacity-80" />
            <p className="text-xs text-gray-600">Save More</p>
          </div>

          <div className="flex flex-col items-center">
            <img src="https://cdn-icons-png.flaticon.com/512/3600/3600931.png" className="w-8 mb-1 opacity-80" />
            <p className="text-xs text-gray-600">Reach Goals</p>
          </div>
        </div>

      </div>
    </div>
  );
}
