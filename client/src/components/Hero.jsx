// src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";

const slides = [
  {
    image: hero1,
    title: "Coimbatore A-Z Carpets",
    subtitle: "CRAFTED FOR ELEGANCE",
    description:
      "Experience timeless craftsmanship with premium handwoven carpets designed to transform your living space.",
    discount: "Flat 30% OFF",
  },
  {
    image: hero2,
    title: "Royal Designs",
    subtitle: "INSPIRED BY HERITAGE",
    description:
      "Traditional artistry meets modern luxury. Discover statement pieces for your home.",
    discount: "Exclusive 25% OFF",
  },
  {
    image: hero3,
    title: "Premium Collections",
    subtitle: "COMFORT MEETS STYLE",
    description:
      "Soft textures, rich patterns, and superior quality for refined interiors.",
    discount: "Limited 40% OFF",
  },
];

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0F0F0F]">

      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        speed={1200}   // smooth fade transition
        className="luxury-hero w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-screen flex items-center justify-center text-center">

              {/* Background */}
              <img
                src={slide.image}
                alt="Luxury Carpet"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/65" />

              {/* Center Content */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="relative z-20 max-w-3xl px-6"
              >
                <span className="text-[#D4AF37] tracking-[4px] uppercase text-sm md:text-base">
                  {slide.subtitle}
                </span>

                <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  {slide.title}
                </h1>

                <p className="mt-6 text-gray-300 text-base md:text-lg">
                  {slide.description}
                </p>

                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="/products/all-products"
                    className="px-8 py-3 bg-[#D4AF37] text-black font-semibold rounded-md hover:bg-[#C9A227] transition"
                  >
                    Shop Now
                  </a>

                  <a
                    href="/about"
                    className="px-8 py-3 border border-[#D4AF37] text-[#D4AF37] rounded-md hover:bg-[#D4AF37] hover:text-black transition"
                  >
                    Explore Collection
                  </a>
                </div>

                {/* Discount Badge */}
                <div className="mt-10 inline-block px-8 py-3 bg-[#1A1A1A] border border-[#D4AF37] text-[#D4AF37] font-semibold rounded-full tracking-wide">
                  {slide.discount}
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination */}
      <style>
        {`
        .luxury-hero .swiper-pagination {
          bottom: 50px !important;
        }

        .luxury-hero .swiper-pagination-bullet {
          width: 14px;
          height: 14px;
          background: transparent;
          border: 2px solid #D4AF37;
          opacity: 1;
          margin: 0 10px !important;
          transition: all 0.4s ease;
        }

        .luxury-hero .swiper-pagination-bullet-active {
          background: #D4AF37;
          width: 32px;
          border-radius: 20px;
        }
        `}
      </style>

    </section>
  );
};

export default Hero;
