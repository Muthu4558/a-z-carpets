import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { MdArrowRightAlt } from "react-icons/md";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("orders");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/api/orders/admin/all`,
          { withCredentials: true }
        );
        setOrders(res.data || []);
      } catch {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchAllOrders();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const getCurrentStatus = (order) => {
    if (order.currentStatus) return order.currentStatus;
    if (order.statusTimeline?.delivered?.status) return "DELIVERED";
    if (order.statusTimeline?.dispatched?.status) return "DISPATCHED";
    return "PREPARING";
  };

  const statusColor = {
    PREPARING: "bg-yellow-100 text-yellow-700",
    DISPATCHED: "bg-blue-100 text-blue-700",
    DELIVERED: "bg-green-100 text-green-700",
  };

  const fallbackImage = "https://via.placeholder.com/150?text=No+Image";

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-x-hidden">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        handleLogout={handleLogout}
      />

      <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8 w-full">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Customer <span className="text-[#D4AF37]">Orders</span>
          </h1>
        </div>

        {/* BREADCRUMB */}
        <div className="mb-6">
          <div className="inline-flex flex-wrap items-center gap-2 px-4 py-2 bg-white border rounded-full shadow-sm text-sm">
            <Link
              to="/admin/dashboard"
              className="text-gray-600 hover:text-[#D4AF37]"
            >
              Dashboard
            </Link>
            <MdArrowRightAlt className="text-gray-400 text-lg" />
            <Link
              to="/admin/orders"
              className="font-semibold text-[#D4AF37]"
            >
              Orders
            </Link>
          </div>
        </div>

        {/* CONTENT */}
        <div className="space-y-6">
          {loading && (
            <p className="text-center text-gray-500">Loading orders...</p>
          )}

          {!loading && orders.length === 0 && (
            <p className="text-center text-gray-500">No orders found.</p>
          )}

          {!loading &&
            orders.map((order) => {
              const currentStatus = getCurrentStatus(order);
              const address = order.address || {};

              return (
                <div key={order._id} className="relative">
                  {/* STATUS BADGE */}
                  <div className="absolute -top-3 right-4 z-10">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full shadow ${statusColor[currentStatus]}`}
                    >
                      {currentStatus}
                    </span>
                  </div>

                  {/* CARD */}
                  <div className="bg-white rounded-xl shadow border border-[#D4AF37] p-4 sm:p-6">

                    {/* CUSTOMER + ACTION */}
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-4">
                      <div className="text-sm space-y-1 break-words">
                        <h3 className="font-semibold text-gray-800 mb-2">
                          Customer Details
                        </h3>
                        <p><strong>Name:</strong> {order.user?.name ?? "-"}</p>
                        <p className="break-all">
                          <strong>Email:</strong> {order.user?.email ?? "-"}
                        </p>
                        <p><strong>Phone:</strong> {order.user?.number ?? "-"}</p>
                        <p className="text-gray-500 text-xs mt-1">
                          Ordered on:{" "}
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString("en-GB")
                            : "-"}
                        </p>
                      </div>

                      <button
                        onClick={() => navigate(`/order/${order._id}`)}
                        className="w-full lg:w-auto px-4 py-2 bg-[#D4AF37] text-white rounded-lg text-sm hover:opacity-90 transition"
                      >
                        Change Status
                      </button>
                    </div>

                    {/* ADDRESS */}
                    <div className="mb-4 bg-gray-50 p-4 rounded-lg border text-sm break-words">
                      <h4 className="font-semibold mb-2">Delivery Address</h4>
                      <p>{address.street ?? "-"}, {address.area ?? "-"}</p>
                      <p>{address.city ?? "-"}, {address.district ?? "-"}</p>
                      <p>{address.state ?? "-"} - {address.pincode ?? "-"}</p>
                      {address.landmark && (
                        <p className="text-gray-500">
                          Landmark: {address.landmark}
                        </p>
                      )}
                    </div>

                    {/* ITEMS */}
                    <div className="divide-y">
                      {order.items?.length > 0 ? (
                        order.items.map((item, idx) => {
                          const product = item.product || {};

                          return (
                            <div
                              key={idx}
                              className="flex flex-col sm:flex-row sm:items-center gap-4 py-4"
                            >
                              <img
                                src={
                                  product.image
                                    ? `${import.meta.env.VITE_APP_BASE_URL}/uploads/${product.image}`
                                    : fallbackImage
                                }
                                alt={product.name ?? "No Name"}
                                className="w-16 h-16 object-cover rounded border"
                              />

                              <div className="flex-1">
                                <p className="font-medium text-sm sm:text-base">
                                  {product.name ?? "Deleted Product"}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-500">
                                  Qty: {item.quantity ?? 0}
                                </p>
                              </div>

                              <p className="font-semibold text-sm sm:text-base">
                                ₹{(item.price ?? 0) * (item.quantity ?? 0)}
                              </p>
                            </div>
                          );
                        })
                      ) : (
                        <p className="py-4 text-sm text-gray-500">
                          No items found in this order.
                        </p>
                      )}
                    </div>

                    {/* FOOTER */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-t pt-4 mt-4 gap-2 text-sm">
                      <p>
                        Payment:{" "}
                        <span className="font-medium">
                          {order.paymentMethod === "COD"
                            ? "Cash on Delivery"
                            : "Online Payment"}
                        </span>
                      </p>

                      <p className="font-semibold text-[#D4AF37] text-base">
                        Total: ₹{order.totalAmount ?? 0}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </main>
    </div>
  );
};

export default AdminOrders;
