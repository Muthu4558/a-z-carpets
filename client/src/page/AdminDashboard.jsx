import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    PREPARING: 0,
    DISPATCHED: 0,
    DELIVERED: 0,
    recentTransactions: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, [startDate, endDate]);

  const fetchStats = async () => {
    try {
      let url = `${import.meta.env.VITE_APP_BASE_URL}/api/orders/admin/stats`;

      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }

      const res = await axios.get(url, { withCredentials: true });
      setStats(res.data);
    } catch (error) {
      toast.error("Failed to load dashboard stats");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("token");
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  const resetFilter = () => {
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        handleLogout={handleLogout}
      />

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full md:ml-64 px-4 sm:px-6 lg:px-10 py-6 lg:py-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Dashboard <span className="text-[#D4AF37]">Overview</span>
          </h1>
        </div>

        {/* FILTER BAR */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                  Filter by Date
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  Select a custom date range
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200 w-full sm:w-auto">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-transparent outline-none text-xs sm:text-sm w-full"
                  />
                  <span className="text-gray-400 text-xs sm:text-sm">to</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-transparent outline-none text-xs sm:text-sm w-full"
                  />
                </div>

                <button
                  onClick={resetFilter}
                  className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition w-full sm:w-auto"
                >
                  Reset
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 mb-10">

          <StatCard title="Total Orders" value={stats.totalOrders} />

          <StatCard
            title="Total Revenue"
            value={`₹ ${stats.totalRevenue?.toLocaleString()}`}
            gradient
          />

          <StatCard title="Preparing" value={stats.PREPARING} bg="yellow" />

          <StatCard title="Dispatched" value={stats.DISPATCHED} bg="blue" />

          <StatCard title="Delivered" value={stats.DELIVERED} bg="purple" />

        </div>

        {/* TRANSACTIONS TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 overflow-hidden">

          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Recent Transactions
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full text-left text-sm">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="py-3">Customer</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Transaction ID</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {stats.recentTransactions?.length > 0 ? (
                  stats.recentTransactions.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-3 font-medium">
                        {order.user?.name}
                      </td>

                      <td className="py-3 font-semibold text-green-600">
                        ₹ {order.totalAmount.toLocaleString()}
                      </td>

                      <td className="py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.paymentMethod === "RAZORPAY"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {order.paymentMethod}
                        </span>
                      </td>

                      <td className="py-3 text-xs text-gray-600 break-all">
                        {order.paymentId || "—"}
                      </td>

                      <td className="py-3 text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-6 text-center text-gray-400"
                    >
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>

      </main>
    </div>
  );
};

/* ===========================
   REUSABLE STAT CARD
=========================== */

const StatCard = ({ title, value, gradient, bg }) => {
  const bgMap = {
    yellow: "bg-yellow-100 text-yellow-800",
    blue: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
  };

  if (gradient) {
    return (
      <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-5 rounded-2xl shadow-sm">
        <p className="text-sm opacity-80">{title}</p>
        <h2 className="text-2xl sm:text-3xl font-bold mt-2">{value}</h2>
      </div>
    );
  }

  return (
    <div className={`p-5 rounded-2xl shadow-sm ${bgMap[bg] || "bg-white"}`}>
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl sm:text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
};

export default AdminDashboard;
