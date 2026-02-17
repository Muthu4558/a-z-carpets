import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_APP_BASE_URL}/api/blog/${id}`
            );
            setBlog(res.data);
        };

        if (id) fetchBlog();
    }, [id]);

    if (!blog) return null;

    return (
        <>
            <Navbar />

            {/* HERO IMAGE SECTION */}
            <div className="pt-10 pb-10 bg-[#F5F5F5] min-h-screen">

                {/* Top Background Image */}
                <div className="relative h-[420px] w-full overflow-hidden">
                    <img
                        src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/${blog.image}`}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />

                    {/* Optional dark overlay */}
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>

                {/* CONTENT CARD */}
                <div className="relative max-w-4xl mx-auto px-6">

                    <div className="-mt-32 bg-white rounded-2xl shadow-xl p-8 md:p-12">

                        {/* Category */}
                        <p className="text-xs tracking-widest text-[#D4AF37] font-semibold uppercase mb-4">
                            {blog.category}
                        </p>

                        {/* Date */}
                        <p className="text-sm text-gray-400 mb-4">
                            {new Date(blog.date).toDateString()}
                        </p>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-bold text-[#111] mb-4 leading-tight">
                            {blog.title}
                        </h1>

                        {/* Subtitle */}
                        {blog.subtitle && (
                            <p className="text-gray-600 text-lg mb-6">
                                {blog.subtitle}
                            </p>
                        )}

                        {/* Divider */}
                        <div className="border-t border-gray-200 my-6"></div>

                        {/* Content */}
                        <div className="text-gray-800 leading-8 whitespace-pre-line space-y-5">
                            {blog.content}
                        </div>

                        {/* Back Link */}
                        <div className="mt-10">
                            <Link
                                to="/blog"
                                className="text-[#111] hover:text-[#D4AF37] transition"
                            >
                                ← Back to Blog
                            </Link>
                        </div>

                    </div>

                </div>
            </div>

            <Footer />
        </>
    );
};

export default BlogDetail;
