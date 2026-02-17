// src/pages/AllProduct.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";
import { FiSearch, FiRefreshCw } from "react-icons/fi";
import { useLoading } from "../context/LoadingContext";

const GOLD = "#D4AF37";

const AllProduct = () => {
  const location = useLocation();
  const { loading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    startLoading();
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/api/products`)
      .then((res) => {
        setProducts(res.data || []);
        setFiltered(res.data || []);
        const uniqueCategories = [
          ...new Set(res.data?.map((item) => item.category) ?? []),
        ];
        setCategories(uniqueCategories);
      })
      .catch(() => {
        setProducts([]);
        setFiltered([]);
      })
      .finally(() => stopLoading());
  }, []);

  useEffect(() => {
    let data = [...products];

    if (searchTerm.trim()) {
      data = data.filter((p) =>
        p?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category !== "all") {
      data = data.filter((p) => p.category === category);
    }

    if (sortOrder === "lowToHigh")
      data.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));

    if (sortOrder === "highToLow")
      data.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));

    setFiltered(data);
  }, [searchTerm, category, sortOrder, products]);

  const clearFilters = () => {
    setSearchTerm("");
    setCategory("all");
    setSortOrder("");
  };

  return (
    <>
      <Navbar />

      {/* HERO HEADER */}
      <section className="bg-white pt-28 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-black">
          Explore Our <span className="text-[#D4AF37]">Collection</span>
        </h1>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Discover luxury carpets, premium wallpapers and artificial grass
          crafted to redefine your interiors.
        </p>
      </section>

      {/* FILTER PANEL */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-6">

          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 shadow-lg">

            <div className="grid md:grid-cols-4 gap-6">

              {/* Search */}
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 bg-[#121212] border border-[#2A2A2A] rounded-full text-white focus:border-[#D4AF37] outline-none"
                />
              </div>

              {/* Category */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 rounded-full bg-[#121212] border border-[#2A2A2A] text-white focus:border-[#D4AF37]"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-4 py-2 rounded-full bg-[#121212] border border-[#2A2A2A] text-white focus:border-[#D4AF37]"
              >
                <option value="">Sort By</option>
                <option value="lowToHigh">Price: Low → High</option>
                <option value="highToLow">Price: High → Low</option>
              </select>

              {/* Clear */}
              <button
                onClick={clearFilters}
                className="flex items-center justify-center gap-2 px-6 py-2 rounded-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition"
              >
                <FiRefreshCw /> Reset
              </button>

            </div>
          </div>

        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-[#1A1A1A] rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {filtered.map((product) => (
                <motion.div
                  key={product._id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl text-white mb-4">
                No Products Found
              </h3>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-[#D4AF37] text-black rounded-full font-medium"
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </>
  );
};

export default AllProduct;
