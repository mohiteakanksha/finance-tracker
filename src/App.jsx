import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Savings from "./pages/Savings";
import Investments from "./pages/Investments";
import EMILoan from "./pages/EMILoan";   // must match filename

import SharedExpenses from "./pages/SharedExpenses";
import Subscription from "./pages/Subscription";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings.jsx";;

export default function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/transactions" element={<Transactions />} />
      <Route path="/budgets" element={<Budgets />} />
      <Route path="/savings" element={<Savings />} />
      <Route path="/investments" element={<Investments />} />
      <Route path="/emi" element={<EMILoan />} />

      <Route path="/shared-expenses" element={<SharedExpenses />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/settings" element={<Settings />} />

    </Routes>
  );
}
