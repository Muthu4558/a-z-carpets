// src/pages/Wallpaper.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiSearch, FiRefreshCw, FiX } from "react-icons/fi";
import { useLoading } from "../context/LoadingContext";

const GOLD = "#D4AF37";

const Wallpaper = () => {
  const location = useLocation();
  const { loading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [sortOrder, setSortOrder] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    startLoading();

    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/api/products/Milk Products`)
      .then((res) => {
        setProducts(res.data || []);
        setFilteredProducts(res.data || []);
      })
      .catch(() => {
        setProducts([]);
        setFilteredProducts([]);
      })
      .finally(() => stopLoading());
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (searchTerm.trim()) {
      filtered = filtered.filter((p) =>
        p?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      filtered = filtered.filter((p) => {
        const price = p.offerPrice ?? p.price ?? 0;
        return price >= min && price <= max;
      });
    }

    if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    } else if (sortOrder === "highToLow") {
      filtered.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    }

    setFilteredProducts(filtered);
  }, [searchTerm, priceRange, sortOrder, products]);

  const clearFilters = () => {
    setSearchTerm("");
    setPriceRange("all");
    setSortOrder("");
  };

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="bg-[#0F0F0F] pt-28 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Luxury <span className="text-[#D4AF37]">Wallpaper</span>
        </h1>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Imported & Indian wallpaper collections including custom and roll
          designs crafted to elevate your interiors.
        </p>
      </section>

      {/* FILTER BAR */}
      <section className="bg-[#121212] py-10">
        <div className="max-w-7xl mx-auto px-6">

          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6">

            <div className="grid md:grid-cols-4 gap-6">

              {/* Search */}
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search wallpapers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#121212] border border-[#2A2A2A] rounded-full text-white focus:border-[#D4AF37] outline-none"
                />
              </div>

              {/* Price */}
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-2 rounded-full bg-[#121212] border border-[#2A2A2A] text-white focus:border-[#D4AF37]"
              >
                <option value="all">All Prices</option>
                <option value="0-5000">₹0 - ₹5,000</option>
                <option value="5000-20000">₹5,000 - ₹20,000</option>
                <option value="20000-50000">₹20,000 - ₹50,000</option>
                <option value="50000-9999999">₹50,000+</option>
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

              {/* Reset */}
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
      <section className="bg-[#0F0F0F] py-16">
        <div className="max-w-7xl mx-auto px-6">

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-[#1A1A1A] rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {filteredProducts.map((product) => (
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
                No Wallpapers Found
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

export default Wallpaper;
