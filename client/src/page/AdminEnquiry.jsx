import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { MdArrowRightAlt } from "react-icons/md";
import { Link } from "react-router-dom";

const AdminEnquiry = () => {
  const [activePage, setActivePage] = useState("enquiry");
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/enquiries`,
        { withCredentials: true }
      );

      setEnquiries(res.data);

      if (res.data.length > 0) {
        // toast.success("Enquiries loaded successfully");
      } else {
        toast.info("No enquiries found");
      }

    } catch {
      toast.error("Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/api/enquiries/${id}`,
        { withCredentials: true }
      );

      toast.success("Enquiry deleted");
      fetchEnquiries();
    } catch {
      toast.error("Delete failed");
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        handleLogout={handleLogout}
      />

      <main className="flex-1 md:ml-64 p-6 lg:p-10 bg-gradient-to-br from-gray-50 to-gray-100">

        <div>
          <h1 className="text-3xl font-bold mb-8">
            Enquiry <span className="text-[#D4AF37]">Data</span>
          </h1>

          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
              <Link
                to="/admin/dashboard"
                className="text-sm font-medium text-gray-600 hover:text-[#D4AF37] transition"
              >
                Dashboard
              </Link>
              <MdArrowRightAlt className="text-gray-400 text-lg" />
              <Link
                to="/admin/enquiry"
                className="text-sm font-semibold text-[#D4AF37]"
              >
                Enquiry Data
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

          {/* DESKTOP TABLE */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="py-4 px-6">Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="py-6 text-center">
                      Loading enquiries...
                    </td>
                  </tr>
                ) : enquiries.length > 0 ? (
                  enquiries.map((enquiry) => (
                    <tr
                      key={enquiry._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-4 px-6 font-medium">
                        {enquiry.name}
                      </td>
                      <td>{enquiry.email}</td>
                      <td>{enquiry.phone}</td>
                      <td className="max-w-xs truncate">
                        {enquiry.comment}
                      </td>
                      <td>
                        {new Date(enquiry.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(enquiry._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-6 text-center text-gray-400">
                      No enquiries yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS */}
          <div className="md:hidden p-4 space-y-4">
            {loading ? (
              <p className="text-center text-gray-500">
                Loading enquiries...
              </p>
            ) : enquiries.length > 0 ? (
              enquiries.map((enquiry) => (
                <div
                  key={enquiry._id}
                  className="border rounded-xl p-4 shadow-sm space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-800">
                      {enquiry.name}
                    </h3>

                    <button
                      onClick={() => handleDelete(enquiry._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 break-all">
                    <strong>Email:</strong> {enquiry.email}
                  </p>

                  <p className="text-sm text-gray-600">
                    <strong>Phone:</strong> {enquiry.phone}
                  </p>

                  <p className="text-sm text-gray-600">
                    <strong>Message:</strong> {enquiry.comment}
                  </p>

                  <p className="text-xs text-gray-400">
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">
                No enquiries yet
              </p>
            )}
          </div>

        </div>


      </main>
    </div>
  );
};

export default AdminEnquiry;
