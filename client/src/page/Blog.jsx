import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");

    const fetchBlogs = async () => {
        const res = await axios.get(
            `${import.meta.env.VITE_APP_BASE_URL}/api/blog`,
            { params: { category, search } }
        );
        setBlogs(res.data);
    };

    useEffect(() => {
        fetchBlogs();
    }, [category, search]);

    return (
        <>
            <Navbar />

            {/* Background Section */}
            <div className="bg-[#F5F5F5] min-h-screen pt-32 pb-20">
                <h1 className="text-center text-4xl font-bold text-[#111] mb-10">Our <span className="text-[#D4AF37]">Blog</span></h1>
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-4 gap-10">

                    {/* SIDEBAR */}
                    <div className="lg:col-span-1 space-y-8">

                        {/* Search Box */}
                        <div className="bg-white p-6 rounded-2xl shadow-md">
                            <h3 className="text-lg font-semibold mb-4 text-[#111]">
                                Search
                            </h3>

                            <input
                                type="text"
                                placeholder="Search blog..."
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Categories */}
                        <div className="bg-white p-6 rounded-2xl shadow-md">
                            <h3 className="text-lg font-semibold mb-5 text-[#111]">
                                Categories
                            </h3>

                            <button
                                onClick={() => setCategory("")}
                                className={`w-full text-left px-4 py-3 rounded-xl mb-2 transition 
                ${category === "" ? "bg-[#111] text-white" : "hover:bg-gray-100"}`}
                            >
                                All
                            </button>

                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`w-full text-left px-4 py-3 rounded-xl mb-2 transition
                  ${category === cat
                                            ? "bg-[#111] text-white"
                                            : "hover:bg-gray-100"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                    </div>

                    {/* BLOG CONTENT */}
                    <div className="lg:col-span-3 space-y-10">

                        <div className="lg:col-span-3">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                                {blogs.map((blog) => (
                                    <Link
                                        key={blog._id}
                                        to={`/blog/${blog._id}`}
                                        className="group block"
                                    >
                                        <div className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">

                                            {/* IMAGE */}
                                            <div className="relative overflow-hidden">
                                                <img
                                                    src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/${blog.image}`}
                                                    alt={blog.title}
                                                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                                                />

                                                <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#D4AF37] transition-all duration-500 group-hover:w-full"></div>
                                            </div>

                                            {/* CONTENT */}
                                            <div className="p-6">

                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
                                                        {blog.category}
                                                    </span>

                                                    <span className="text-xs text-gray-400">
                                                        {new Date(blog.date).toLocaleDateString("en-IN", {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                        })}
                                                    </span>
                                                </div>

                                                <h2 className="text-lg font-semibold text-[#111] mb-3 group-hover:text-[#D4AF37] transition">
                                                    {blog.title}
                                                </h2>

                                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                                    {blog.content.substring(0, 100)}...
                                                </p>

                                                <div className="flex items-center text-sm font-medium group-hover:text-[#D4AF37] transition">
                                                    Read More
                                                    <span className="ml-2 group-hover:translate-x-1 transition-transform">
                                                        →
                                                    </span>
                                                </div>

                                            </div>
                                        </div>
                                    </Link>
                                ))}

                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </>
    );
};

export default Blog;