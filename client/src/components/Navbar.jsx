// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX, HiChevronDown } from "react-icons/hi";
import { FaShoppingBag, FaUser } from "react-icons/fa";
import axios from "axios";
import { useCart } from "../context/CartContext";
import Logo from "../assets/a-z-logo.jpeg";
import AnnouncementBar from "./AnnouncementBar";

/**
 * Mega-menu Navbar
 * - Desktop: hover or click opens a full-width mega menu (neat, multi-column)
 * - Mobile: accordion menu (unchanged)
 *
 * Tailwind required. Adjust colors if you want a different shade.
 */

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // mobile hamburger
  const [desktopDropdown, setDesktopDropdown] = useState(false); // desktop mega
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false); // mobile products root
  const [mobileOpenSection, setMobileOpenSection] = useState(null); // mobile accordion sections
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  const dropdownRef = useRef(null);
  const navRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const { cartItems } = useCart();
  const cartCount = cartItems?.length || 0;

  const isActive = (path) => pathname === path;
  const isProducts = pathname.startsWith("/products");

  const activeClass = "text-[#D4AF37]";
  const inactiveClass = "text-black hover:text-[#D4AF37] transition duration-300";

  // announcement hide on scroll (keeps original behavior)
  useEffect(() => {
    let lastY = 0;
    let ticking = false;
    const handler = () => {
      const y = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const diff = y - lastY;
          if (Math.abs(diff) > 10) {
            setShowAnnouncement(!(diff > 0 && y > 60));
            lastY = y;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDesktopDropdown(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setDesktopDropdown(false);
        setMenuOpen(false);
        setMobileDropdownOpen(false);
        setMobileOpenSection(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Auth verification (keeps original behaviour)
  useEffect(() => {
    const verify = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/auth/verify`, {
          withCredentials: true,
        });
        setIsAuthed(true);
      } catch {
        setIsAuthed(false);
      }
    };
    verify();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch { }
    setIsAuthed(false);
    navigate("/login");
  };

  /* ---------------- MEGA MENU DATA ---------------- */
  const megaMenuData = [
    {
      key: "shop_by_category",
      title: "Shop by Category",
      items: [
        { label: "All Carpets & Rugs", path: "/products/all" },
        { label: "Hand Tufted Rugs", path: "/products/hand-tufted" },
        { label: "Shaggy Carpets", path: "/products/shaggy" },
        { label: "Persian Silk Carpets", path: "/products/persian-silk" },
        { label: "Designer Carpets", path: "/products/designer" },
        { label: "Luxury Viscose Rugs", path: "/products/luxury-viscose" },
        { label: "Iranian Imported Rugs", path: "/products/iranian-imported" },
        { label: "Irregular Shaped Rugs", path: "/products/irregular-shaped" },
        { label: "Traditional Persian Rugs", path: "/products/traditional-persian" },
        { label: "Round Shaggy Carpets", path: "/products/round-shaggy" },
        { label: "Round Tufted Carpets", path: "/products/round-tufted" },
        { label: "Children Rugs", path: "/products/children-rugs" },
      ],
    },
    {
      key: "shop_by_size",
      title: "Shop by Size",
      items: [
        { label: "3 x 5 ft", path: "/products/size/3x5" },
        { label: "4 x 6 ft", path: "/products/size/4x6" },
        { label: "5 x 7 ft", path: "/products/size/5x7" },
        { label: "5 x 8 ft", path: "/products/size/5x8" },
        { label: "6 x 8 ft", path: "/products/size/6x8" },
        { label: "6 x 9 ft", path: "/products/size/6x9" },
        { label: "7 x 10 ft", path: "/products/size/7x10" },
        { label: "8 x 10 ft", path: "/products/size/8x10" },
        { label: "8 x 11 ft", path: "/products/size/8x11" },
        { label: "9 x 12 ft", path: "/products/size/9x12" },
        { label: "10 x 13 ft", path: "/products/size/10x13" },
        // { label: "And More", path: "/products/size" },
      ],
    },
    {
      key: "shop_by_color",
      title: "Shop by Color",
      items: [
        { label: "Beige", path: "/products/color/beige" },
        { label: "Red", path: "/products/color/red" },
        { label: "Blue", path: "/products/color/blue" },
        { label: "Black", path: "/products/color/black" },
        { label: "Green", path: "/products/color/green" },
        { label: "White", path: "/products/color/white" },
        { label: "Grey", path: "/products/color/grey" },
        { label: "Brown", path: "/products/color/brown" },
        { label: "Pink", path: "/products/color/pink" },
        { label: "Yellow", path: "/products/color/yellow" },
      ],
    },
    {
      key: "shop_by_shape",
      title: "Shop by Shape",
      items: [
        { label: "Round", path: "/products/shape/round" },
        { label: "Rectangular", path: "/products/shape/rectangular" },
        { label: "Irregular", path: "/products/shape/irregular" },
      ],
    },
    {
      key: "party_exhibition",
      title: "Party / Exhibition Carpets",
      items: [
        { label: "Green Party Carpets", path: "/products/party/green" },
        { label: "Blue Party Carpets", path: "/products/party/blue" },
        { label: "Red Party Carpets", path: "/products/party/red" },
        { label: "Grey Party Carpets", path: "/products/party/grey" },
        { label: "Brown Party Carpets", path: "/products/party/brown" },
        { label: "Dark Grey Party Carpets", path: "/products/party/dark-grey" },
        { label: "Beige Party Carpets", path: "/products/party/beige" },
      ],
    },
    {
      key: "artificial_grass",
      title: "Artificial Grass",
      items: [
        { label: "25 mm Thick", path: "/products/grass/25mm" },
        { label: "35 mm Thick", path: "/products/grass/35mm" },
        { label: "40 mm Thick", path: "/products/grass/40mm" },
        { label: "50 mm Thick", path: "/products/grass/50mm" },
      ],
    },
  ];

  /* Helpers for desktop hover + click (keeps menu accessible) */
  const openDesktop = () => setDesktopDropdown(true);
  const closeDesktop = () => setDesktopDropdown(false);
  const toggleDesktop = () => setDesktopDropdown((s) => !s);

  return (
    <>
      {/* fixed wrapper */}
      <div className="fixed top-0 left-0 right-0 z-[60] will-change-transform" ref={navRef}>
        <motion.div animate={{ y: showAnnouncement ? 0 : -40 }} transition={{ duration: 0.35 }}>
          <AnnouncementBar />
        </motion.div>

        <motion.nav animate={{ y: showAnnouncement ? 0 : -40 }} transition={{ duration: 0.35 }} className="bg-[#F5F5F5] shadow">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img src={Logo} alt="logo" className="w-20 md:w-24 rounded-xl" />
              <div className="flex flex-col leading-tight">
                <span className="text-lg md:text-xl font-bold text-black tracking-wide">Coimbatore</span>
                <span className="text-sm md:text-[15px] font-semibold text-[#D4AF37]">A to Z Carpets & Wallpaper</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 font-medium">
              <Link to="/" className={isActive("/") ? activeClass : inactiveClass}>Home</Link>
              <Link to="/about" className={isActive("/about") ? activeClass : inactiveClass}>About</Link>

              {/* Products mega menu container: use mouse enter/leave for hover */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={openDesktop}
                onMouseLeave={closeDesktop}
              >
                <button
                  onClick={toggleDesktop}
                  className={`flex items-center gap-2 ${isProducts ? activeClass : inactiveClass}`}
                  aria-expanded={desktopDropdown}
                >
                  Products
                  <HiChevronDown className={`transition ${desktopDropdown ? "rotate-180 text-[#D4AF37]" : ""}`} />
                </button>

                <AnimatePresence>
                  {desktopDropdown && (
                    <motion.div
                      key="mega"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="fixed inset-x-0 top-[120px] z-50"
                    >
                      {/* Top subtle border line */}
                      <div className="w-full h-[1px] bg-[#E5E5E5]" />

                      <div className="bg-[#121212] text-white shadow-2xl">
                        <div className="max-w-7xl mx-auto px-10 py-12">

                          <div className="grid grid-cols-6 gap-12">

                            {megaMenuData.map((col) => (
                              <div key={col.key}>

                                <h4 className="text-[#D4AF37] font-semibold text-sm uppercase tracking-wider mb-5">
                                  {col.title}
                                </h4>

                                <ul className="space-y-3">
                                  {col.items.map((item) => (
                                    <li key={item.path}>
                                      <Link
                                        to={item.path}
                                        onClick={() => setDesktopDropdown(false)}
                                        className="block text-sm text-gray-200 hover:text-[#D4AF37] transition duration-200"
                                      >
                                        {item.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>

                              </div>
                            ))}

                          </div>

                        </div>
                      </div>
                    </motion.div>

                  )}
                </AnimatePresence>
              </div>
              <Link to="/coimbatore-shop" className={isActive("/coimbatore-shop") ? activeClass : inactiveClass}>Coimbatore Store</Link>
              <Link to="/order" className={isActive("/order") ? activeClass : inactiveClass}>My Orders</Link>
              {/* <Link to="/blog" className={isActive("/blog") ? activeClass : inactiveClass}>Blog</Link> */}
              <Link to="/contact" className={isActive("/contact") ? activeClass : inactiveClass}>Contact</Link>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="hidden md:flex bg-[#D4AF37] text-black px-4 py-2 rounded-lg font-semibold items-center gap-2 hover:bg-[#C9A227]"
              >
                <FaUser /> Profile
              </Link>

              <Link
                to="/cart"
                className="relative bg-[#D4AF37] text-black px-3 md:px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#C9A227] transition"
              >
                <FaShoppingBag />
                <span className="hidden sm:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-[#D4AF37] text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => {
                  setMenuOpen(!menuOpen);
                  if (!menuOpen) {
                    setMobileOpenSection(null);
                    setMobileDropdownOpen(false);
                  }
                }}
                className="md:hidden text-[#D4AF37]"
                aria-label="open menu"
              >
                {menuOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu (unchanged behaviour - accordion) */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "80vh", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden bg-[#111111] border-t border-[#1A1A1A] overflow-y-auto"
              >
                <div className="px-6 py-4 space-y-4">
                  {/* Mobile products accordion */}
                  <div>
                    <button
                      onClick={() => {
                        setMobileDropdownOpen(!mobileDropdownOpen);
                        setMobileOpenSection(null);
                      }}
                      className="w-full flex justify-between items-center text-gray-300 py-3 border-b border-white/20"
                      aria-expanded={mobileDropdownOpen}
                    >
                      <span>Products</span>
                      <HiChevronDown className={`transition ${mobileDropdownOpen ? "rotate-180 text-[#D4AF37]" : ""}`} />
                    </button>

                    {mobileDropdownOpen && (
                      <div className="mt-3 bg-[#0F0F0F] border border-[#222] rounded-md overflow-hidden">
                        {megaMenuData.map((section) => (
                          <div key={section.key} className="border-b border-[#1f1f1f]">
                            <button
                              onClick={() =>
                                setMobileOpenSection((prev) => (prev === section.key ? null : section.key))
                              }
                              className="w-full flex justify-between items-center px-4 py-3 text-left text-gray-200"
                            >
                              <span className="font-semibold text-[#D4AF37]">{section.title}</span>
                              <HiChevronDown className={`transition ${mobileOpenSection === section.key ? "rotate-180 text-[#D4AF37]" : ""}`} />
                            </button>

                            <AnimatePresence>
                              {mobileOpenSection === section.key && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="px-4 pb-3 pt-1 bg-[#0F0F0F]"
                                >
                                  <ul className="space-y-2">
                                    {section.items.map((it) => (
                                      <li key={it.path}>
                                        <Link
                                          to={it.path}
                                          onClick={() => {
                                            setMenuOpen(false);
                                            setMobileDropdownOpen(false);
                                            setMobileOpenSection(null);
                                          }}
                                          className="block text-sm text-gray-300 hover:bg-[#D4AF37] hover:text-black px-2 py-2 rounded transition"
                                        >
                                          {it.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <Link
                    to="/"
                    className="block text-gray-300 py-3 border-b border-white/20 hover:text-[#D4AF37] transition"
                  >
                    Home
                  </Link>

                  <Link
                    to="/about"
                    className="block text-gray-300 py-3 border-b border-white/20 hover:text-[#D4AF37] transition"
                  >
                    About
                  </Link>

                  <Link
                    to="/profile"
                    className="flex items-center gap-3 text-gray-300 py-3 border-b border-white/20 hover:text-[#D4AF37] transition"
                  >
                    Profile
                  </Link>

                  <Link
                    to="/coimbatore-shop"
                    className="block text-gray-300 py-3 border-b border-white/20 hover:text-[#D4AF37] transition"
                  >
                    Coimbatore Store
                  </Link>

                  <Link
                    to="/contact"
                    className="block text-gray-300 py-3 border-b border-white/20 hover:text-[#D4AF37] transition"
                  >
                    Contact
                  </Link>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>

      {/* spacer to allow page content below the fixed nav */}
      <div className="h-[120px]" />
    </>
  );
};

export default Navbar;