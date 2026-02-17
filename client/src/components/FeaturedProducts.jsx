import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "swiper/css";
import ProductCard from "./ProductCard";

const getSlidesPerView = () => {
  const w = window.innerWidth;
  if (w >= 1280) return 4;
  if (w >= 1024) return 3;
  if (w >= 640) return 2;
  return 1;
};

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView());

  const swipers = useRef({});
  const prevRefs = useRef({});
  const nextRefs = useRef({});

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/api/products/featured/all`)
      .then((res) => setProducts(res.data || []))
      .catch(() => setProducts([]));
  }, []);

  useEffect(() => {
    const onResize = () => setSlidesPerView(getSlidesPerView());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const groupedProducts = products.reduce((acc, p) => {
    const cat = p.category || "Collection";
    acc[cat] = acc[cat] || [];
    acc[cat].push(p);
    return acc;
  }, {});

  const initNavigation = (key) => {
    const swiper = swipers.current[key];
    const prevEl = prevRefs.current[key];
    const nextEl = nextRefs.current[key];

    if (!swiper || !prevEl || !nextEl) return;

    swiper.params.navigation.prevEl = prevEl;
    swiper.params.navigation.nextEl = nextEl;

    swiper.navigation.destroy();
    swiper.navigation.init();
    swiper.navigation.update();
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {Object.entries(groupedProducts).map(([category, items], idx) => {
          const key = `swiper-${idx}`;
          const showNav = items.length > slidesPerView;

          return (
            <div key={category} className="mb-28 relative">

              {/* Section Heading */}
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl md:text-4xl font-semibold text-[#D4AF37] tracking-wide">
                  <span className="text-[#333] mr-3">—</span>
                  {category}
                </h2>

                <div className="hidden md:block w-20 h-[2px] bg-[#333]" />
              </div>

              {/* Swiper */}
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={30}
                slidesPerView={slidesPerView}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                speed={900}
                onSwiper={(swiper) => {
                  swipers.current[key] = swiper;
                  setTimeout(() => initNavigation(key));
                }}
                className="pb-16"
              >
                {items.map((product) => (
                  <SwiperSlide key={product._id}>
                    <ProductCard product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation */}
              {showNav && (
                <div className="absolute right-6 -bottom-18 z-20 flex gap-4">

                  <button
                    ref={(el) => {
                      prevRefs.current[key] = el;
                      initNavigation(key);
                    }}
                    aria-label="Previous"
                    className="w-12 h-12 rounded-full border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center transition hover:bg-[#D4AF37] hover:text-black"
                  >
                    <IoIosArrowBack size={20} />
                  </button>

                  <button
                    ref={(el) => {
                      nextRefs.current[key] = el;
                      initNavigation(key);
                    }}
                    aria-label="Next"
                    className="w-12 h-12 rounded-full border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center transition hover:bg-[#D4AF37] hover:text-black"
                  >
                    <IoIosArrowForward size={20} />
                  </button>

                </div>
              )}

            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedProducts;