import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Savings from "./pages/Savings";
import Investments from "./pages/Investments";
import EMILoan from "./pages/EMILoan";
import Subscription from "./pages/Subscription";
import Analytics from "./pages/Analytics";

// Splash Screen
import SplashScreen from "./pages/SplashScreen";

// =========================
// 🔒 PROTECTED ROUTE
// =========================
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" />;
};

export default function App() {
  const [loading, setLoading] = useState(true);

  // Show splash for 1.5 sec
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // While splash is showing, don't load routes
  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />

        {/* PROTECTED ROUTES */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/transactions" element={<ProtectedRoute element={<Transactions />} />} />
        <Route path="/budgets" element={<ProtectedRoute element={<Budgets />} />} />
        <Route path="/savings" element={<ProtectedRoute element={<Savings />} />} />
        <Route path="/investments" element={<ProtectedRoute element={<Investments />} />} />
        <Route path="/emi" element={<ProtectedRoute element={<EMILoan />} />} />
        <Route path="/subscription" element={<ProtectedRoute element={<Subscription />} />} />
        <Route path="/analytics" element={<ProtectedRoute element={<Analytics />} />} />

      </Routes>
    </Router>
  );
}
