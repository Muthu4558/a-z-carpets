import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { MdArrowRightAlt } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";

const categories = [
  "Hand Tufted Rugs",
  "Shaggy Carpets",
  "Persian Silk Carpets",
  "Designer Carpets",
  "Luxury Viscose Rugs",
  "Iranian Imported Rugs",
  "Irregular Shaped Rugs",
  "Traditional Persian Rugs",
  "Round Shaggy Carpets",
  "Round Tufted Carpets",
  "Children Rugs",
];

const AdminBlog = () => {
  const [activePage, setActivePage] = useState("blog");
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    category: "",
    title: "",
    subtitle: "",
    content: "",
    date: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  /* ---------------- FETCH BLOGS ---------------- */
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/blog`
      );
      setBlogs(res.data);
    } catch {
      toast.error("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  /* ---------------- HANDLE INPUT ---------------- */
  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  /* ---------------- RESET FORM ---------------- */
  const resetForm = () => {
    setFormData({
      category: "",
      title: "",
      subtitle: "",
      content: "",
      date: "",
      image: null,
    });
    setPreview(null);
    setEditingId(null);
  };

  /* ---------------- ADD / UPDATE BLOG ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    try {
      if (editingId) {
        await axios.put(
          `${import.meta.env.VITE_APP_BASE_URL}/api/blog/${editingId}`,
          data
        );
        toast.success("Blog updated successfully");
      } else {
        await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/api/blog`,
          data
        );
        toast.success("Blog added successfully");
      }

      setShowModal(false);
      resetForm();
      fetchBlogs();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- EDIT BLOG ---------------- */
  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setFormData({
      category: blog.category,
      title: blog.title,
      subtitle: blog.subtitle,
      content: blog.content,
      date: blog.date?.split("T")[0],
      image: null,
    });
    setPreview(
      `${import.meta.env.VITE_APP_BASE_URL}/uploads/${blog.image}`
    );
    setShowModal(true);
  };

  /* ---------------- DELETE BLOG ---------------- */
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/api/blog/${confirmDeleteId}`
      );
      toast.success("Blog deleted successfully");
      setConfirmDeleteId(null);
      fetchBlogs();
    } catch {
      toast.error("Failed to delete blog");
    }
  };

  return (
    <>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="md:ml-64 min-h-screen bg-[#F5F5F5] p-6 md:p-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-[#111] mb-6">
              Blog <span className="text-[#D4AF37]">Management</span>
            </h1>

            {/* BREADCRUMB */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
                <Link
                  to="/admin"
                  className="text-sm font-medium text-gray-600 hover:text-[#D4AF37] transition"
                >
                  Home
                </Link>
                <MdArrowRightAlt className="text-gray-400 text-lg" />
                <Link
                  to="/admin/orders"
                  className="text-sm font-semibold text-[#D4AF37]"
                >
                  Orders
                </Link>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-[#D4AF37] hover:bg-[#c7a32e] text-black px-6 py-2 rounded-lg font-semibold transition cursor-pointer"
          >
            Add New Blog
          </button>
        </div>

        {/* BLOG LIST */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-xl shadow p-4">

              <img
                src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/${blog.image}`}
                alt={blog.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />

              <h3 className="font-semibold text-[#111] mb-2">
                {blog.title}
              </h3>

              <p className="text-xs text-gray-500 mb-3">
                {new Date(blog.date).toDateString()}
              </p>

              <div className="flex justify-between mt-4">

                <button
                  onClick={() => handleEdit(blog)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  <FaEdit /> Edit
                </button>

                <button
                  onClick={() => setConfirmDeleteId(blog._id)}
                  className="flex items-center gap-2 text-red-600 hover:text-red-800 cursor-pointer"
                >
                  <FaTrash /> Delete
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">

            <div className="relative bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">

              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
              >
                <FaTimes />
              </button>

              <div className="p-8">
                <h2 className="text-2xl font-semibold mb-6">
                  {editingId ? "Edit Blog" : "Add Blog"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg px-4 py-3"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                  />

                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg px-4 py-3"
                  />

                  <input
                    type="text"
                    name="subtitle"
                    placeholder="Subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                  />

                  <textarea
                    name="content"
                    placeholder="Content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg px-4 py-3 h-32"
                  />

                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                  />

                  {preview && (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-40 rounded-lg mt-2"
                    />
                  )}

                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-5 py-2 border rounded-lg cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#111] text-white px-6 py-2 rounded-lg cursor-pointer"
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {confirmDeleteId && (
        <div className="fixed backdrop-blur-sm inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-semibold mb-4">
              Delete Blog?
            </h3>
            <p className="text-gray-600 mb-6">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-5 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminBlog;
