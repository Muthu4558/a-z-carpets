import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

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

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            Enquiry <span className="text-[#D4AF37]">Data</span>
          </h1>

          <button
            onClick={fetchEnquiries}
            className="px-4 py-2 bg-[#D4AF37] text-white rounded-lg hover:opacity-90 transition"
          >
            Refresh
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

          <div className="overflow-x-auto">
            <table className="min-w-[750px] w-full text-left text-sm">

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
                    <td
                      colSpan="6"
                      className="py-6 text-center text-gray-400"
                    >
                      No enquiries yet
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

export default AdminEnquiry;
