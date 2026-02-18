import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";
import { useLoading } from "../context/LoadingContext";
import { FiSearch, FiRefreshCw } from "react-icons/fi";

const RedCarpets = () => {
    const { loading, startLoading, stopLoading } = useLoading();

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState("all");
    const [sortOrder, setSortOrder] = useState("");

    /* ================= FETCH RED PRODUCTS ================= */
    useEffect(() => {
        startLoading();
        axios
            .get(`${import.meta.env.VITE_APP_BASE_URL}/api/products/filter?color=red`)
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

    /* ================= FILTER LOGIC ================= */
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
            filtered.sort(
                (a, b) =>
                    (a.offerPrice ?? a.price ?? 0) -
                    (b.offerPrice ?? b.price ?? 0)
            );
        } else if (sortOrder === "highToLow") {
            filtered.sort(
                (a, b) =>
                    (b.offerPrice ?? b.price ?? 0) -
                    (a.offerPrice ?? a.price ?? 0)
            );
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
            <section className="bg-white pt-28 pb-16 text-center">
                <h1 className="text-4xl font-bold">
                    Red <span className="text-[#D4AF37]">Carpets</span>
                </h1>
                <p className="mt-3 text-gray-500">
                    Elegant red carpets for vibrant interiors.
                </p>
            </section>

            {/* FILTER SECTION */}
            <section className="bg-white py-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-[#111111] rounded-2xl p-6 shadow-lg">

                        <div className="grid md:grid-cols-4 gap-6 items-center">

                            {/* Search */}
                            <div className="relative">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search carpets..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-black border border-gray-700 rounded-full text-white focus:border-[#D4AF37] outline-none"
                                />
                            </div>

                            {/* Price Filter */}
                            <select
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                                className="px-6 py-3 rounded-full bg-black border border-gray-700 text-white focus:border-[#D4AF37] outline-none"
                            >
                                <option value="all">All Prices</option>
                                <option value="0-1000">₹0 - ₹1,000</option>
                                <option value="1000-2000">₹1,000 - ₹2,000</option>
                                <option value="2000-5000">₹2,000 - ₹5,000</option>
                                <option value="5000-15000">₹5,000 - ₹15,000</option>
                            </select>

                            {/* Sort */}
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="px-6 py-3 rounded-full bg-black border border-gray-700 text-white focus:border-[#D4AF37] outline-none"
                            >
                                <option value="">Sort By</option>
                                <option value="lowToHigh">Price: Low → High</option>
                                <option value="highToLow">Price: High → Low</option>
                            </select>

                            {/* Reset */}
                            <button
                                onClick={clearFilters}
                                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition"
                            >
                                <FiRefreshCw />
                                Reset
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
                                <div
                                    key={i}
                                    className="h-80 bg-gray-200 rounded-2xl animate-pulse"
                                />
                            ))}
                        </div>

                    ) : products.length === 0 ? (

                        <div className="text-center py-24">
                            <h3 className="text-2xl font-semibold">
                                No Red Carpets Found
                            </h3>
                        </div>

                    ) : filteredProducts.length === 0 ? (

                        <div className="text-center py-24">
                            <h3 className="text-2xl font-semibold mb-4">
                                No Carpets Match Your Filters
                            </h3>
                            <button
                                onClick={clearFilters}
                                className="px-6 py-2 bg-[#D4AF37] text-black rounded-full font-medium"
                            >
                                Reset Filters
                            </button>
                        </div>

                    ) : (

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: { transition: { staggerChildren: 0.08 } },
                            }}
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
                    )}

                </div>
            </section>

            <Footer />
        </>
    );
};

export default RedCarpets;
