// src/components/Testimonials.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Keyboard, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const GOLD = "#D4AF37";

const testimonials = [
  {
    id: 1,
    name: "Arun",
    location: "Chennai, Tamil Nadu",
    text:
      " The texture feels premium and it completely transformed my living room into a luxury space.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya",
    location: "Bengaluru, Karnataka",
    text:
      "The gold patterns blend perfectly with my modern interiors.",
    rating: 5,
  },
  {
    id: 3,
    name: "Rahul",
    location: "Mumbai, Maharashtra",
    text:
      "Soft, rich, and luxurious. Guests keep asking where I purchased this carpet from.",
    rating: 5,
  },
  {
    id: 4,
    name: "Ananya",
    location: "Kolkata, West Bengal",
    text:
      "The detailing is exceptional. You can truly see the artistry in every thread.",
    rating: 4,
  },
  {
    id: 5,
    name: "Ravi",
    location: "Hyderabad, Telangana",
    text:
      "Premium finish and perfect delivery. The carpet adds warmth and class to my home.",
    rating: 5,
  },
];

const Stars = ({ rating }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={i < rating ? GOLD : "none"}
        stroke={GOLD}
        strokeWidth="1.2"
      >
        <path d="M12 .587l3.09 6.26L22 9.748l-5 4.873L18.18 22 12 18.897 5.82 22 7 14.62 2 9.748l6.91-1.901L12 .587z" />
      </svg>
    ))}
  </div>
);

const Testimonials = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-black mb-4">
          What Our <span className="text-[#D4AF37]">Clients Say</span>
        </h2>

        <p className="text-center text-gray-400 mb-12">
          Real experiences from our valued carpet customers.
        </p>

        <Swiper
          modules={[Pagination, Keyboard, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop
          autoplay={{ delay: 5000 }}
          keyboard={{ enabled: true }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet custom-bullet",
            bulletActiveClass:
              "swiper-pagination-bullet-active custom-bullet-active",
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="bg-[#181818] border border-[#1A1A1A] rounded-2xl p-6 h-full transition hover:border-[#D4AF37]">

                {/* Top */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-black flex items-center justify-center font-semibold">
                    {t.name.charAt(0)}
                  </div>

                  <div>
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-gray-400">
                      {t.location}
                    </div>
                  </div>

                  <div className="ml-auto">
                    <Stars rating={t.rating} />
                  </div>
                </div>

                {/* Text */}
                <p className="text-gray-300 text-sm leading-relaxed">
                  “{t.text}”
                </p>

                <div className="mt-6 text-xs flex justify-between text-gray-500">
                  <span>Verified Client</span>
                  <span>Recently Purchased</span>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA */}
        <div className="mt-14 text-center">
          <a
            href="#"
            className="px-8 py-3 border border-[#D4AF37] text-[#D4AF37] rounded-md hover:bg-[#D4AF37] hover:text-black transition"
          >
            Share Your Experience
          </a>
        </div>

      </div>

      {/* Custom Gold Pagination */}
      <style>{`
        .custom-bullet {
          width: 12px;
          height: 12px;
          margin: 0 8px !important;
          border-radius: 50%;
          background: transparent !important;
          border: 2px solid #D4AF37;
          opacity: 1 !important;
          transition: all 0.3s ease;
        }
        .custom-bullet-active {
          background: #D4AF37 !important;
          transform: scale(1.3);
        }
        .swiper-pagination {
          bottom: 0 !important;
        }
      `}</style>

    </section>
  );
};

export default Testimonials;
