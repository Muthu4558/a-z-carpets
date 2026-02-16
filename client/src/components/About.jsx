// src/components/About.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";
import {
  FaAward,
  // FaRug,
  FaHome,
  FaLayerGroup,
  FaCheckCircle,
} from "react-icons/fa";
import HeroImg from "../assets/hero1.jpg";

export default function About() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0F0F0F] text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center text-center overflow-hidden">
        <img
          src={HeroImg}
          alt="Luxury Carpets"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 px-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold">
            About <span className="text-[#D4AF37]">Our Legacy</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-gray-300 text-lg">
            Over 50 years of excellence in carpet craftsmanship and 15 years
            of expertise in wallpaper and wall panel solutions.
          </p>
        </motion.div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="py-20 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              50+ Years of <span className="text-[#D4AF37]">Craftsmanship</span>
            </h2>

            <p className="text-gray-600 leading-relaxed">
              With over five decades of experience in carpet making,
              our journey reflects dedication, artistry, and unmatched quality.
              We blend traditional Indian craftsmanship with modern design
              to create carpets that define elegance.
            </p>

            <div className="mt-6 space-y-4">
              <Feature text="Handmade & Machine-Made Carpets" />
              <Feature text="Wholesale & Retail Solutions" />
              <Feature text="Bespoke Custom Designs" />
            </div>
          </div>

          <div className="bg-[#1A1A1A] p-8 rounded-2xl border border-[#2A2A2A]">
            <h3 className="text-2xl font-semibold text-[#D4AF37] mb-4">
              Our Experience
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li>• 50+ Years in Carpet Manufacturing</li>
              <li>• 15 Years in Wallpaper & Wall Panels</li>
              <li>• Expertise in Artificial Grass Installations</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-black">
            Our <span className="text-[#D4AF37]">Services</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <ServiceCard
              icon={<FaHome />}
              title="Carpets"
              desc="All varieties of carpets available in wholesale and retail, including handmade and machine-made collections."
            />

            <ServiceCard
              icon={<FaLayerGroup />}
              title="Wallpaper & Wall Panels"
              desc="Imported and Indian wallpapers, customized designs, and roll wallpapers tailored to your interior needs."
            />

            <ServiceCard
              icon={<FaAward />}
              title="Artificial Grass"
              desc="Premium imported artificial grass in 15mm, 25mm, 35mm, 40mm, and 50mm thickness options."
            />

          </div>
        </div>
      </section>

      {/* ABOUT STORE SECTION */}
      <section className="py-24 bg-[#121212]">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-semibold mb-8">
            Our <span className="text-[#D4AF37]">Store</span>
          </h2>

          <p className="text-gray-400 leading-relaxed max-w-3xl mx-auto text-lg">
            Your premier destination for exquisite handmade and machine-made
            carpets. Our store is easily accessible for customers seeking the
            finest floor coverings. Whether you visit us in person or shop online,
            we offer timeless classics and custom designs to match every space.
          </p>

          <p className="mt-6 text-gray-400 leading-relaxed max-w-3xl mx-auto text-lg">
            Each carpet is crafted with care and precision, reflecting the rich
            artistry and heritage of Indian craftsmanship.
          </p>

        </div>
      </section>

      <Footer />
    </div>
  );
}

/* COMPONENTS */

function Feature({ text }) {
  return (
    <div className="flex items-center gap-3 text-gray-600">
      <FaCheckCircle className="text-[#D4AF37]" />
      <span>{text}</span>
    </div>
  );
}

function ServiceCard({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-[#1A1A1A] p-8 rounded-2xl border border-[#2A2A2A] hover:border-[#D4AF37] transition"
    >
      <div className="text-3xl text-[#D4AF37] mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}
