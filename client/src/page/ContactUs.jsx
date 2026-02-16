// src/pages/ContactUs.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { FiMail } from "react-icons/fi";

const GOLD = "#D4AF37";

const ContactUs = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        comment: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        alert("Message submitted successfully!");
        setForm({ name: "", email: "", phone: "", comment: "" });
    };

    return (
        <>
            <Navbar />

            {/* HERO */}
            <section className="bg-white pt-28 pb-16 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-black">
                    Contact <span className="text-[#D4AF37]">Us</span>
                </h1>
                <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                    Get in touch with Coimbatore A to Z Carpet & Wallpaper for premium carpets, wallpapers and artificial grass solutions.
                </p>
            </section>

            {/* MAIN */}
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">

                    {/* LEFT - CONTACT DETAILS */}
                    <div className="space-y-8">

                        <div>
                            <h2 className="text-2xl font-semibold text-black mb-4">
                                Coimbatore <span className="text-[#D4AF37]">A to Z Carpet & Wallpaper</span>
                            </h2>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start gap-4 text-gray-600">
                            <FaPhoneAlt className="text-[#D4AF37] mt-1" />
                            <div>
                                <p className="font-medium text-black">Phone / Official</p>
                                <a href="tel:9626846646" className="hover:text-[#D4AF37] transition">
                                    9626846646
                                </a>
                            </div>
                        </div>

                        {/* WhatsApp */}
                        <div className="flex items-start gap-4 text-gray-600">
                            <FaWhatsapp className="text-[#D4AF37] mt-1" />
                            <div>
                                <p className="font-medium text-black">WhatsApp</p>
                                <a
                                    href="https://wa.me/919626846646"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-[#D4AF37] transition"
                                >
                                    9626846646
                                </a>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex items-start gap-4 text-gray-600">
                            <MdLocationPin className="text-[#D4AF37] mt-1 text-1xl" />
                            <div>
                                <p className="font-medium text-black">Address</p>
                                <p>
                                    SF 45, Mettupalayam Rd, Dhandapani Nagar, NGGO Colony,
                                    K. Vadamadurai, Thudiyalur, Kurudampalayam,
                                    Tamil Nadu 641017
                                </p>

                                <a
                                    href="https://www.google.com/maps/place/SF+45,+Coimbatore+A+to+Z+Carpets+%26+Wallpaper,+Mettupalayam+Rd,+Dhandapani+Nagar,+NGGO+Colony,+K.+Vadamadurai,+Thudiyalur,+Kurudampalayam,+Tamil+Nadu+641017"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-3 text-[#D4AF37] hover:underline"
                                >
                                    View on Google Maps →
                                </a>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT - CONTACT FORM */}
                    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8">
                        <h3 className="text-xl font-semibold text-[#D4AF37] mb-6">
                            Send Us a Message
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-white border border-[#2A2A2A] rounded-lg text-black focus:border-[#D4AF37] outline-none"
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-white border border-[#2A2A2A] rounded-lg text-black focus:border-[#D4AF37] outline-none"
                            />

                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={form.phone}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-white border border-[#2A2A2A] rounded-lg text-black focus:border-[#D4AF37] outline-none"
                            />

                            <textarea
                                name="comment"
                                placeholder="Your Message"
                                rows="4"
                                value={form.comment}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-white border border-[#2A2A2A] rounded-lg text-black focus:border-[#D4AF37] outline-none"
                            />

                            <button
                                type="submit"
                                className="w-full py-3 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-[#C9A227] transition"
                            >
                                Submit Message
                            </button>

                        </form>
                    </div>

                </div>
            </section>

            {/* GOOGLE MAP EMBED */}
            <section className="bg-white py-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="rounded-2xl overflow-hidden border border-[#2A2A2A]">
                        <iframe
                            src="https://www.google.com/maps?q=SF+45,+Mettupalayam+Rd,+Dhandapani+Nagar,+NGGO+Colony,+K.+Vadamadurai,+Thudiyalur,+Kurudampalayam,+Tamil+Nadu+641017&output=embed"
                            width="100%"
                            height="350"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title="Company Location"
                        ></iframe>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default ContactUs;