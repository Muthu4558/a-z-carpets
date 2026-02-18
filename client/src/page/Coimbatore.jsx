import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Coimbatore = () => {
    return (
        <>
            <Navbar />

            <section className="bg-[#F9F9F9] py-20 px-6">
                <div className="max-w-6xl mx-auto">

                    {/* Heading */}
                    <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
                        Coimbatore Store
                    </h1>

                    {/* Subheading */}
                    <h2 className="text-xl md:text-2xl font-semibold text-[#D4AF37] mb-8">
                        Visit A-Z Carpets – Premium Carpet & Rug Store in Coimbatore
                    </h2>

                    {/* Description */}
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        Welcome to Coimbatore A-Z Carpets, your trusted destination for luxurious
                        carpets and rugs in Coimbatore.
                    </p>

                    {/* Address */}
                    <p className="text-gray-800 font-medium mb-8">
                        📍 SF 45, Mettupalayam Rd, Dhandapani Nagar, Thudiyalur,
                        Tamil Nadu 641017
                    </p>

                    {/* Content */}
                    <p className="text-gray-700 text-lg leading-relaxed">
                        From modern styles to traditional elegance, our collection offers a wide
                        variety of carpets and rugs designed to suit every space, taste, and
                        budget. Whether you're furnishing a new home or upgrading your interiors,
                        A-Z Carpets has the perfect piece waiting for you.
                    </p>

                </div>
            </section>

            <section className="bg-white py-20 px-6">
                <div className="max-w-6xl mx-auto space-y-20">

                    {/* SECTION 1 */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                            What You’ll Find at Our Coimbatore Store
                        </h1>

                        <p className="text-gray-600 mb-8">
                            At A-Z Carpets, Coimbatore, we offer an exclusive in-store experience
                            where you can explore a curated collection of premium rugs and carpets
                            perfect for your living room, bedroom, office, or commercial space.
                        </p>

                        <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">
                            Our Collection Includes:
                        </h2>

                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>Contemporary Carpets – Sleek designs for modern interiors</li>
                            <li>Traditional Rugs – Rich patterns inspired by heritage designs</li>
                            <li>Shaggy Rugs – Soft, cozy textures perfect for bedrooms</li>
                            <li>Hand-Tufted Carpets – Artisanal quality with intricate detailing</li>
                            <li>Runner Rugs & Area Rugs – Ideal for hallways, entrances, and compact areas</li>
                            <li>Custom Designs – Get your carpet tailored to your style and space</li>
                        </ul>
                    </div>

                    {/* SECTION 2 – IMAGE LEFT / CONTENT RIGHT */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">

                        <img
                            src="/store1.jpg"   // Replace with your actual store image
                            alt="Coimbatore Store Interior"
                            className="rounded-lg shadow-lg"
                        />

                        <div>
                            <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-4">
                                Why Choose A-Z Carpets in Coimbatore?
                            </h2>

                            <ul className="list-disc pl-6 space-y-3 text-gray-700">
                                <li>Wide Range – From minimalistic textures to bold statement pieces</li>
                                <li>Local Access – View and feel the quality before purchase</li>
                                <li>Expert Assistance – Our team helps you choose the right carpet</li>
                                <li>Quick Delivery – Fast service across Coimbatore and nearby areas</li>
                                <li>Trusted Quality – Every piece meets high durability standards</li>
                            </ul>
                        </div>
                    </div>

                    {/* SECTION 3 – CONTENT LEFT / IMAGE RIGHT */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">

                        <div>
                            <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-4">
                                Perfect for Every Coimbatore Home
                            </h2>

                            <p className="text-gray-700 leading-relaxed">
                                Whether you're styling a flat in New Town, renovating a villa in
                                RS Puram, or furnishing a boutique in Peelamedu, we offer carpets
                                and rugs that add luxury, warmth, and personality to any space.
                            </p>
                        </div>

                        <img
                            src="/store2.jpg"   // Replace with your actual store image
                            alt="Carpet Display"
                            className="rounded-lg shadow-lg"
                        />
                    </div>

                    {/* STORE TIMINGS */}
                    <div>
                        <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-4">
                            Store Timings
                        </h2>

                        <ul className="space-y-2 text-gray-700">
                            <li>🕘 Open Monday to Sunday | 10:00 AM – 8:30 PM</li>
                            <li>📍 SF 45, Mettupalayam Rd, Dhandapani Nagar, Thudiyalur, Tamil Nadu 641017</li>
                            <li>📞 Call Us: +91 96268 46646</li>
                        </ul>
                    </div>

                    {/* CTA */}
                    <div className="text-center pt-10">
                        <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-4">
                            Visit A-Z Carpets in Coimbatore Today!
                        </h3>

                        <p className="text-gray-600 mb-6">
                            Discover the finest carpets and rugs at unbeatable value.
                            Experience personalized service and explore timeless designs.
                        </p>

                        <a
                            href="tel:+919626846646"
                            className="inline-block bg-[#D4AF37] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#C9A227] transition"
                        >
                            Call Now
                        </a>
                    </div>

                </div>
            </section>

            <Footer />
        </>
    );
};

export default Coimbatore;
