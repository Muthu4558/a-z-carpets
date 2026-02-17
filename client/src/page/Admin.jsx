import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import { useLoading } from "../context/LoadingContext";

import {
  MdDelete,
  MdEdit,
} from "react-icons/md";
import { MdArrowRightAlt } from "react-icons/md";
import {
  FaEdit,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

const BRAND = "#57b957";

/* ================= CARPET CATEGORIES ================= */
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

/* ================= AVAILABLE SIZES ================= */
const carpetSizes = [
  "4x6ft", "5x7ft", "5x8ft", "6x9ft", "7x10ft", "8x10ft",
  "8x11ft", "9x12ft", "10x13ft", "10x14ft",
  "12x14ft", "12x15ft", "12x18ft"
];

const Admin = () => {
  const { startLoading, stopLoading } = useLoading();
  const [activePage, setActivePage] = useState("products");
  const navigate = useNavigate();

  /* ================= PRODUCT STATE ================= */
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    category: "",
    price: "",
    offerPrice: "",
    warranty: "",
    type: "",
    sizes: [],
    productDetails: "",
    stock: "",
    image: null,
    featured: false,
  });

  const [preview, setPreview] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [q, setQ] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  useEffect(() => {
    startLoading();
    fetchProducts();
    stopLoading();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/products`);
      setProducts(res.data || []);
    } catch {
      toast.error("Failed to load products");
    }
  };

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (name === "image" && files?.[0]) {
      setFormData(prev => ({ ...prev, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else if (type === "checkbox") {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  /* ================= MULTIPLE SIZE ================= */
  const handleSizeChange = (size) => {
    setFormData(prev => {
      if (prev.sizes.includes(size)) {
        return { ...prev, sizes: prev.sizes.filter(s => s !== size) };
      }
      return { ...prev, sizes: [...prev.sizes, size] };
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.price) {
      toast.error("Please fill required fields");
      return;
    }

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "sizes") {
        data.append("sizes", JSON.stringify(value));
      } else if (key === "featured") {
        data.append("featured", value ? "true" : "false");
      } else if (value !== null && value !== undefined) {
        data.append(key, value);
      }
    });

    try {
      if (editingProductId) {
        await axios.put(
          `${import.meta.env.VITE_APP_BASE_URL}/api/products/update/${editingProductId}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Product updated successfully");
      } else {
        await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/api/products/add`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Product added successfully");
      }

      resetForm();
      fetchProducts();
    } catch {
      toast.error("Submission failed");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      companyName: "",
      category: "",
      price: "",
      offerPrice: "",
      warranty: "",
      type: "",
      sizes: [],
      productDetails: "",
      stock: "",
      image: null,
      featured: false,
    });
    setPreview(null);
    setEditingProductId(null);
    setShowModal(false);
  };

  const handleEdit = (product) => {
    setFormData({
      ...product,
      sizes: product.sizes || [],
      image: null,
    });

    setEditingProductId(product._id);
    setPreview(`${import.meta.env.VITE_APP_BASE_URL}/uploads/${product.image}`);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/api/products/delete/${productToDelete}`
      );

      toast.success("Product deleted successfully");

      fetchProducts(); // refresh list
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setProductToDelete(null); // close modal
    }
  };


  /* ================= FILTER ================= */
  const filtered = products
    .filter(p => filterCategory === "All" ? true : p.category === filterCategory)
    .filter(p => showFeaturedOnly ? p.featured : true)
    .filter(p => {
      if (!q) return true;
      const s = q.toLowerCase();
      return (
        p.name?.toLowerCase().includes(s) ||
        p.companyName?.toLowerCase().includes(s)
      );
    });

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/auth/logout`, {}, { withCredentials: true });
      localStorage.removeItem("token");
      toast.success("Logged out");
      window.location.href = "/login";
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activePage={activePage} setActivePage={setActivePage} handleLogout={handleLogout} />

      <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          {/* LEFT SIDE */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Products
            </h1>

            {/* BREADCRUMB */}
            <div className="mt-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
                <Link
                  to="/admin/dashboard"
                  className="text-sm font-medium text-gray-600 hover:text-[#D4AF37] transition"
                >
                  Dashboard
                </Link>

                <MdArrowRightAlt className="text-gray-400 text-lg" />

                <span className="text-sm font-semibold text-[#D4AF37]">
                  Products
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE BUTTON */}
          <div className="flex justify-start md:justify-end">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#c29f2f] transition text-white px-5 py-2.5 rounded-lg shadow-sm font-medium"
            >
              <FaPlus className="text-sm" />
              Add Product
            </button>
          </div>

        </div>


        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/${product.image}`}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold truncate">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.companyName}</p>

                <div className="text-lg font-bold text-[#D4AF37] mt-2">
                  ₹{product.offerPrice || product.price}
                </div>

                <div className="text-sm mt-1">
                  {product.stock > 0 ? (
                    <span className="text-green-600">Stock: {product.stock}</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </div>

                <div className="flex justify-between gap-2 mt-3">
                  <button onClick={() => handleEdit(product)} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer">
                    <FaEdit /> Edit
                  </button>
                  <button onClick={() => setProductToDelete(product._id)} className="flex items-center gap-2 text-red-600 hover:text-red-800 cursor-pointer">
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ADD / EDIT MODAL (UI SAME) */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative"
            >

              {/* CLOSE BUTTON */}
              <button
                onClick={resetForm}
                className="absolute top-5 right-5 text-gray-400 hover:text-black text-2xl"
              >
                ×
              </button>

              {/* HEADER */}
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
                {editingProductId ? "Update Product" : "Add New Product"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* BASIC INFO */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Product Name"
                    required
                    className="input-style"
                  />

                  <input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Company Name"
                    className="input-style"
                  />

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="input-style"
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="input-style"
                  >
                    <option value="">Hand / Machine</option>
                    <option value="Hand Made">Hand Made</option>
                    <option value="Machine Made">Machine Made</option>
                  </select>

                  <input
                    name="warranty"
                    value={formData.warranty}
                    onChange={handleChange}
                    placeholder="Warranty (e.g. 2 Years)"
                    className="input-style"
                  />

                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="Stock"
                    required
                    className="input-style"
                  />

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                    className="input-style"
                  />

                  <input
                    type="number"
                    name="offerPrice"
                    value={formData.offerPrice}
                    onChange={handleChange}
                    placeholder="Offer Price"
                    className="input-style"
                  />

                </div>

                {/* SIZES */}
                <div>
                  <label className="block font-semibold mb-3">
                    Available Sizes
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {carpetSizes.map((size) => (
                      <label
                        key={size}
                        className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border cursor-pointer hover:border-[#D4AF37]"
                      >
                        <input
                          type="checkbox"
                          checked={formData.sizes.includes(size)}
                          onChange={() => handleSizeChange(size)}
                        />
                        <span className="text-sm">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* DESCRIPTION */}
                <textarea
                  name="productDetails"
                  value={formData.productDetails}
                  onChange={handleChange}
                  placeholder="Product Details"
                  rows={4}
                  className="input-style resize-none"
                />

                {/* FEATURED */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={!!formData.featured}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        featured: e.target.checked,
                      }))
                    }
                    className="h-4 w-4"
                  />
                  <span className="text-sm">
                    Show on Featured Products
                  </span>
                </div>

                {/* IMAGE UPLOAD */}
                <div>
                  <label className="block font-semibold mb-2">
                    Product Image
                  </label>

                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-[#D4AF37] transition">
                    <span className="text-sm text-gray-500">
                      Click to upload image
                    </span>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={(e) => {
                        handleChange(e);

                        if (e.target.files[0]) {
                          setFormData((prev) => ({
                            ...prev,
                            imagePreview: URL.createObjectURL(e.target.files[0]),
                          }));
                        }
                      }}
                      className="hidden"
                    />
                  </label>

                  {/* IMAGE PREVIEW */}
                  {formData.imagePreview && (
                    <div className="mt-4">
                      <img
                        src={formData.imagePreview}
                        alt="Preview"
                        className="w-40 h-40 object-cover rounded-xl border"
                      />
                    </div>
                  )}
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#c29f2f] transition text-white px-6 py-3 rounded-xl w-full font-semibold"
                >
                  {editingProductId ? "Update Product" : "Add Product"}
                </button>

              </form>
            </motion.div>
          </div>
        )}



        {productToDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white p-6 rounded-xl w-80 text-center">
              <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
              <p className="text-sm mb-6">
                Are you sure you want to delete this product?
              </p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setProductToDelete(null)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Admin;