import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-white to-purple-100">

      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-3xl w-full border border-gray-200">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 p-4 rounded-full shadow">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3597/3597075.png"
              alt="wallet"
              className="w-12 h-12 opacity-80"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Welcome to Finance Tracker
        </h1>

        <p className="text-center text-gray-600 mt-2">
          Your complete personal finance management solution.
        </p>

        {/* Section Title */}
        <h2 className="text-center font-semibold text-gray-800 mt-8 mb-4">
          What you can do:
        </h2>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm mb-10">

          <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            Track expenses & income
          </div>

          <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl">
            <span className="h-3 w-3 rounded-full bg-blue-500"></span>
            Set budgets & goals
          </div>

          <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl">
            <span className="h-3 w-3 rounded-full bg-purple-500"></span>
            Monitor investments
          </div>

          <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl">
            <span className="h-3 w-3 rounded-full bg-orange-500"></span>
            Track EMIs & subscriptions
          </div>

          <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl">
            <span className="h-3 w-3 rounded-full bg-pink-500"></span>
            Split shared expenses
          </div>

          <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl">
            <span className="h-3 w-3 rounded-full bg-teal-500"></span>
            Generate reports & insights
          </div>

        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-black text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-900 transition"
          >
            Get Started →
          </button>

          <button className="w-full border border-gray-300 py-3 rounded-xl text-gray-600 text-sm hover:bg-gray-100 transition">
            Load Demo Data
          </button>
        </div>

        {/* Footer Info */}
        <div className="flex flex-col items-center mt-8 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span>📄</span> Your data is stored safely in your browser
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span>🔒</span> 100% private — we never collect financial data
          </div>
        </div>

      </div>
    </div>
  );
}
