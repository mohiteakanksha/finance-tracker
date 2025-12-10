import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Plus, Trash2, Calendar } from "lucide-react";
import AddEMIModal from "./AddEMIModal";
import api from "../axiosConfig";

const EMILoans = () => {
  const [open, setOpen] = useState(false);
  const [emis, setEMIs] = useState([]);

  const fetchEMIs = async () => {
    try {
      const res = await api.get("/emi");
      setEMIs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEMIs();
  }, []);

  const markEmiPaid = async (id) => {
    try {
      await api.patch(`/emi/mark-paid/${id}`);
      fetchEMIs();
    } catch (error) {
      console.log("Mark Paid Error:", error);
    }
  };

  const deleteEMI = async (id) => {
    try {
      await api.delete(`/emi/delete/${id}`);
      fetchEMIs();
    } catch (error) {
      console.log("Delete EMI Error:", error);
    }
  };

  const calculateProgress = (item) => {
    const total = item.tenureMonths;
    const paid = item.paidEmis || 0;
    return Math.round((paid / total) * 100);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-white to-purple-100 flex">
      <div className="fixed left-0 top-0 h-screen">
        <Sidebar />
      </div>

      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        <Navbar />

        <div className="p-24">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">EMI & Loan Tracker</h2>
              <p className="text-gray-500 text-sm">
                Manage your loans and EMI payments
              </p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus size={18} /> Add EMI/Loan
            </button>
          </div>

          {emis.length === 0 ? (
            <div className="bg-white border rounded-xl p-10 flex flex-col items-center justify-center text-center h-80">
              <p className="font-medium text-gray-700 mb-1">No EMIs added</p>
              <p className="text-sm text-gray-500">
                Click Add to create your first EMI
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {emis.map((item) => {
                const progress = calculateProgress(item);
                const emiPerMonth = Math.round(
                  item.principalAmount / item.tenureMonths
                );
                const remaining =
                  item.principalAmount - emiPerMonth * (item.paidEmis || 0);

                return (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl border p-6 shadow relative"
                  >
                    <button
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                      onClick={() => deleteEMI(item._id)}
                    >
                      <Trash2 size={18} />
                    </button>

                    <h3 className="text-xl font-semibold">{item.loanName}</h3>
                    <p className="text-gray-700 text-lg mb-3">
                      ₹{emiPerMonth.toLocaleString()} / month
                    </p>

                    <div className="grid grid-cols-4 gap-6 text-sm">
                      <div>
                        <p className="text-gray-500">Principal</p>
                        <p className="font-medium">
                          ₹{item.principalAmount.toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">Interest Rate</p>
                        <p className="font-medium">{item.interestRate}% p.a.</p>
                      </div>

                      <div>
                        <p className="text-gray-500">Paid EMIs</p>
                        <p className="font-medium">
                          {item.paidEmis || 0} / {item.tenureMonths}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">Remaining</p>
                        <p className="font-medium">
                          ₹{remaining.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* ⭐ PROGRESS BAR */}
                    <div className="mt-6">
                      <div className="flex justify-between mb-1">
                        <p className="text-gray-500 text-sm">Progress</p>
                        <p className="text-gray-700 text-sm">
                          {progress}% complete
                        </p>
                      </div>

                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-3 bg-black rounded-full transition-all duration-700"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <button
                      onClick={() => markEmiPaid(item._id)}
                      disabled={item.paidEmis >= item.tenureMonths}
                      className={`w-full mt-6 py-3 rounded-lg flex items-center justify-center gap-2
                        ${
                          item.paidEmis >= item.tenureMonths
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-black text-white hover:bg-gray-800"
                        }`}
                    >
                      <Calendar size={18} />
                      {item.paidEmis >= item.tenureMonths
                        ? "Fully Paid"
                        : "Mark EMI as Paid"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {open && (
        <AddEMIModal onClose={() => setOpen(false)} reloadEMIs={fetchEMIs} />
      )}
    </div>
  );
};

export default EMILoans;
