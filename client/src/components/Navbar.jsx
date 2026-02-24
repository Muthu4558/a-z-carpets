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

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // mobile hamburger
  const [desktopDropdown, setDesktopDropdown] = useState(false); // desktop mega
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false); // mobile products root
  const [mobileOpenSection, setMobileOpenSection] = useState(null); // mobile accordion sections
  const [mobileOpenMain, setMobileOpenMain] = useState(null);
  const [mobileOpenProductChild, setMobileOpenProductChild] = useState(null);
  const [mobileOpenSub, setMobileOpenSub] = useState(null);
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

        // 👇 Add this divider-style grouping
        { label: "Artificial Grass", isTitle: true },

        { label: "25 mm Thick", path: "/products/grass/25mm" },
        { label: "35 mm Thick", path: "/products/grass/35mm" },
        { label: "40 mm Thick", path: "/products/grass/40mm" },
        { label: "50 mm Thick", path: "/products/grass/50mm" },
      ],
    },
    {
      key: "wall_to_wall",
      title: "Wall to Wall Carpet",
      items: [{ label: "View All", path: "/products/wall-to-wall" }],
    },
    {
      key: "floor_vinyl",
      title: "Floor Vinyl Carpet",
      items: [{ label: "View All", path: "/products/floor-vinyl" }],
    },
    {
      key: "office_carpet",
      title: "Office Carpet",
      items: [{ label: "View All", path: "/products/office-carpet" }],
    },
    {
      key: "masjid_roll",
      title: "Masjid Roll Carpet",
      items: [{ label: "View All", path: "/products/masjid-roll" }],
    },
    {
      key: "wallpaper",
      title: "Wallpaper",
      items: [
        { label: "Roll Wallpaper", path: "/products/wallpaper/roll" },
        { label: "Customized Wallpaper", path: "/products/wallpaper/customized" },
        { label: "UV Marble Sheet (Self Adhesive)", path: "/products/wallpaper/uv-marble-sheet" },
      ],
    },
    {
      key: "wall_panels",   // IMPORTANT spelling
      title: "Wall Panels",
      items: [
        { label: "PVC Fluted Panel", path: "/products/wall-panels/pvc-fluted" },
        { label: "WPC Fluted Panel", path: "/products/wall-panels/wpc-fluted" },
        { label: "Charcoal Panel", path: "/products/wall-panels/charcoal" },
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
            <Link to="/" className="flex items-center gap-2">
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

                          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-12">

                            {/* First 5 Normal Columns */}
                            {megaMenuData.slice(0, 5).map((col) => (
                              <div key={col.key}>
                                <h4 className="text-[#D4AF37] font-semibold text-sm uppercase tracking-wider mb-5">
                                  {col.title}
                                </h4>

                                <ul className="space-y-3">
                                  {col.items.map((item) =>
                                    item.isTitle ? (
                                      <li
                                        key={item.label}
                                        className="pt-4 text-[#D4AF37] font-semibold text-xs uppercase tracking-wider"
                                      >
                                        {item.label}
                                      </li>
                                    ) : (
                                      <li key={item.path}>
                                        <Link
                                          to={item.path}
                                          onClick={() => setDesktopDropdown(false)}
                                          className="block text-sm text-gray-200 hover:text-[#D4AF37] transition duration-200"
                                        >
                                          {item.label}
                                        </Link>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            ))}

                            {/* Last Column — Top & Bottom Sections */}
                            <div className="flex flex-col space-y-6">

                              {/* Wallpaper */}
                              <div>
                                <h4 className="text-[#D4AF37] font-semibold text-sm uppercase tracking-wider mb-5">
                                  Wallpaper
                                </h4>

                                <ul className="space-y-3">
                                  <li>
                                    <Link to="/products/wallpaper/roll"
                                      onClick={() => setDesktopDropdown(false)}
                                      className="block text-sm text-gray-200 hover:text-[#D4AF37] transition duration-200">
                                      Roll Wallpaper
                                    </Link>
                                  </li>

                                  <li>
                                    <Link to="/products/wallpaper/customized"
                                      onClick={() => setDesktopDropdown(false)}
                                      className="block text-sm text-gray-200 hover:text-[#D4AF37] transition duration-200">
                                      Customized Wallpaper
                                    </Link>
                                  </li>

                                  <li>
                                    <Link to="/products/wallpaper/uv-marble-sheet"
                                      onClick={() => setDesktopDropdown(false)}
                                      className="block text-sm text-gray-200 hover:text-[#D4AF37] transition duration-200">
                                      UV Marble Sheet (Self Adhesive)
                                    </Link>
                                  </li>
                                </ul>
                              </div>

                              {/* Wall Panels */}
                              <div>
                                <h4 className="text-[#D4AF37] font-semibold text-sm uppercase tracking-wider mb-5">
                                  Wall Panels
                                </h4>

                                <ul className="space-y-3">
                                  <li>
                                    <Link to="/products/wall-panels/pvc-fluted"
                                      onClick={() => setDesktopDropdown(false)}
                                      className="block text-sm text-gray-200 hover:text-[#D4AF37] transition duration-200">
                                      PVC Fluted Panel
                                    </Link>
                                  </li>

                                  <li>
                                    <Link to="/products/wall-panels/wpc-fluted"
                                      onClick={() => setDesktopDropdown(false)}
                                      className="block text-sm text-gray-200 hover:text-[#D4AF37] transition duration-200">
                                      WPC Fluted Panel
                                    </Link>
                                  </li>

                                  <li>
                                    <Link to="/products/wall-panels/charcoal"
                                      onClick={() => setDesktopDropdown(false)}
                                      className="block text-sm text-gray-200 hover:text-[#D4AF37] transition duration-200">
                                      Charcoal Panel
                                    </Link>
                                  </li>
                                </ul>
                              </div>

                              {/* other */}
                              <div>
                                <h4 className="text-[#D4AF37] font-semibold text-sm uppercase tracking-wider mb-5">
                                  Other
                                </h4>

                                <ul className="space-y-3">
                                  <li>
                                    <Link to="/products/wall-to-wall"
                                      onClick={() => setDesktopDropdown(false)}
                                      className="block text-sm text-gray-200 hover:text-[#D4AF37] transition duration-200">
                                      Wall to Wall Carpet
                                    </Link>
                                  </li>

                                  <li>
                                    <Link to="/products/floor-vinyl"
                                      onClick={() => setDesktopDropdown(false)}
                                      className="block text-sm text-gray-200 hover:text-[#D4AF37] transition duration-200">
                                      Floor Vinyl Carpet
                                    </Link>
                                  </li>

                                  <li>
                                    <Link to="/products/office-carpet"
                                      onClick={() => setDesktopDropdown(false)}
                                      className="block text-sm text-gray-200 hover:text-[#D4AF37] transition duration-200">
                                      Office Carpet
                                    </Link>
                                  </li>

                                  <li>
                                    <Link to="/products/masjid-roll"
                                      onClick={() => setDesktopDropdown(false)}
                                      className="block text-sm text-gray-200 hover:text-[#D4AF37] transition duration-200">
                                      Masjid Roll Carpet
                                    </Link>
                                  </li>
                                </ul>
                              </div>

                            </div>

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

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "80vh", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden bg-[#111111] border-t border-[#1A1A1A] overflow-y-auto"
              >
                <div className="px-6 py-4 text-gray-300">

                  {/* ================= PRODUCTS ================= */}
                  <div className="border-b border-white/10">
                    <button
                      onClick={() =>
                        setMobileOpenMain(prev => prev === "products" ? null : "products")
                      }
                      className="w-full flex justify-between items-center py-3"
                    >
                      <span className="font-semibold text-[#D4AF37]">Products</span>
                      <HiChevronDown
                        className={`transition ${mobileOpenMain === "products" ? "rotate-180 text-[#D4AF37]" : ""
                          }`}
                      />
                    </button>

                    {mobileOpenMain === "products" && (
                      <div className="pl-2 pb-4 space-y-3">

                        {/* ================= CARPET ================= */}
                        <div className="border-b border-white/10 pb-3">
                          <button
                            onClick={() =>
                              setMobileOpenProductChild(prev =>
                                prev === "carpet" ? null : "carpet"
                              )
                            }
                            className="w-full flex justify-between items-center py-3 text-sm"
                          >
                            <span className="font-semibold text-[#D4AF37]">Carpet</span>
                            <HiChevronDown
                              className={`transition ${mobileOpenProductChild === "carpet"
                                ? "rotate-180 text-[#D4AF37]"
                                : ""
                                }`}
                            />
                          </button>

                          {mobileOpenProductChild === "carpet" && (
                            <div className="pl-4 space-y-2">

                              {/* Carpet & Rugs */}
                              <div>
                                <button
                                  onClick={() =>
                                    setMobileOpenSub(prev =>
                                      prev === "carpet_rugs" ? null : "carpet_rugs"
                                    )
                                  }
                                  className="w-full flex justify-between items-center py-2 text-sm border-b border-white/10"
                                >
                                  <span className="text-gray-300 font-semibold ">
                                    Carpet & Rugs
                                  </span>
                                  <HiChevronDown
                                    className={`transition ${mobileOpenSub === "carpet_rugs"
                                      ? "rotate-180 text-[#D4AF37]"
                                      : ""
                                      }`}
                                  />
                                </button>

                                {mobileOpenSub === "carpet_rugs" && (
                                  <div className="pl-4 space-y-2 mt-2">

                                    {["shop_by_category", "shop_by_size", "shop_by_color", "shop_by_shape"]
                                      .map(key => megaMenuData.find(s => s.key === key))
                                      .map(section => (
                                        <div key={section.key} className="border-b border-white/10 pb-2">

                                          <button
                                            onClick={() =>
                                              setMobileOpenSection(prev =>
                                                prev === section.key ? null : section.key
                                              )
                                            }
                                            className="w-full flex justify-between items-center py-2 text-xs"
                                          >
                                            <span className="text-gray-400 uppercase tracking-wide">
                                              {section.title}
                                            </span>
                                            <HiChevronDown
                                              className={`transition ${mobileOpenSection === section.key
                                                ? "rotate-180 text-[#D4AF37]"
                                                : ""
                                                }`}
                                            />
                                          </button>

                                          {mobileOpenSection === section.key && (
                                            <ul className="pl-4 mt-2 space-y-1">
                                              {section.items.map(item => (
                                                <li key={item.path}>
                                                  <Link
                                                    to={item.path}
                                                    onClick={() => {
                                                      setMenuOpen(false);
                                                      setMobileOpenMain(null);
                                                      setMobileOpenProductChild(null);
                                                      setMobileOpenSub(null);
                                                      setMobileOpenSection(null);
                                                    }}
                                                    className="block text-sm text-gray-300 hover:text-[#D4AF37]"
                                                  >
                                                    {item.label}
                                                  </Link>
                                                </li>
                                              ))}
                                            </ul>
                                          )}

                                        </div>
                                      ))}

                                  </div>
                                )}
                              </div>

                              {/* Party / Exhibition Carpets */}
                              <div className="border-b border-white/10 pb-2">
                                <button
                                  onClick={() =>
                                    setMobileOpenSection(prev =>
                                      prev === "party_exhibition" ? null : "party_exhibition"
                                    )
                                  }
                                  className="w-full flex justify-between items-center py-2 text-sm"
                                >
                                  <span className="text-gray-300">
                                    Party / Exhibition Carpets
                                  </span>
                                  <HiChevronDown
                                    className={`transition ${mobileOpenSection === "party_exhibition"
                                      ? "rotate-180 text-[#D4AF37]"
                                      : ""
                                      }`}
                                  />
                                </button>

                                {mobileOpenSection === "party_exhibition" && (
                                  <ul className="pl-4 mt-2 space-y-1">
                                    {megaMenuData
                                      .find(s => s.key === "party_exhibition")
                                      ?.items.filter(i => !i.isTitle)
                                      .map(item => (
                                        <li key={item.path}>
                                          <Link
                                            to={item.path}
                                            onClick={() => {
                                              setMenuOpen(false);
                                              setMobileOpenMain(null);
                                              setMobileOpenProductChild(null);
                                              setMobileOpenSub(null);
                                              setMobileOpenSection(null);
                                            }}
                                            className="block text-sm text-gray-300 hover:text-[#D4AF37]"
                                          >
                                            {item.label}
                                          </Link>
                                        </li>
                                      ))}
                                  </ul>
                                )}
                              </div>

                              {/* Artificial Grass */}
                              <div className="border-b border-white/10 pb-2">
                                <button
                                  onClick={() =>
                                    setMobileOpenSection(prev =>
                                      prev === "artificial_grass" ? null : "artificial_grass"
                                    )
                                  }
                                  className="w-full flex justify-between items-center py-2 text-sm"
                                >
                                  <span className="text-gray-300">
                                    Artificial Grass Carpet
                                  </span>
                                  <HiChevronDown
                                    className={`transition ${mobileOpenSection === "artificial_grass"
                                      ? "rotate-180 text-[#D4AF37]"
                                      : ""
                                      }`}
                                  />
                                </button>

                                {mobileOpenSection === "artificial_grass" && (
                                  <ul className="pl-4 mt-2 space-y-1">
                                    {megaMenuData
                                      .find(s => s.key === "artificial_grass")
                                      ?.items.map(item => (
                                        <li key={item.path}>
                                          <Link
                                            to={item.path}
                                            onClick={() => {
                                              setMenuOpen(false);
                                              setMobileOpenMain(null);
                                              setMobileOpenProductChild(null);
                                              setMobileOpenSub(null);
                                              setMobileOpenSection(null);
                                            }}
                                            className="block text-sm text-gray-300 hover:text-[#D4AF37]"
                                          >
                                            {item.label}
                                          </Link>
                                        </li>
                                      ))}
                                  </ul>
                                )}
                              </div>

                              {/* Simple Direct Links */}
                              {["wall_to_wall", "floor_vinyl", "office_carpet", "masjid_roll"]
                                .map(key => megaMenuData.find(s => s.key === key))
                                .filter(Boolean)
                                .map(section => (
                                  <Link
                                    key={section.key}
                                    to={section.items[0].path}
                                    onClick={() => setMenuOpen(false)}
                                    className="block text-sm text-gray-300 hover:text-[#D4AF37] py-1 border-b border-white/10 pb-3"
                                  >
                                    {section.title}
                                  </Link>
                                ))}


                            </div>
                          )}
                        </div>

                        {/* ================= WALLPAPER ================= */}
                        <div className="border-b border-white/10 pb-3">
                          <button
                            onClick={() =>
                              setMobileOpenProductChild(prev =>
                                prev === "wallpaper" ? null : "wallpaper"
                              )
                            }
                            className="w-full flex justify-between items-center py-3 text-sm"
                          >
                            <span className="font-semibold text-[#D4AF37]">Wallpaper</span>
                            <HiChevronDown
                              className={`transition ${mobileOpenProductChild === "wallpaper"
                                ? "rotate-180 text-[#D4AF37]"
                                : ""
                                }`}
                            />
                          </button>

                          {mobileOpenProductChild === "wallpaper" && (
                            <ul className="pl-4 space-y-2">
                              {megaMenuData
                                .find(s => s.key === "wallpaper")
                                ?.items.map(item => (
                                  <li key={item.path}>
                                    <Link
                                      to={item.path}
                                      onClick={() => setMenuOpen(false)}
                                      className="block text-sm text-gray-300 hover:text-[#D4AF37]"
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          )}
                        </div>

                        {/* ================= WALL PANEL ================= */}
                        <div>
                          <button
                            onClick={() =>
                              setMobileOpenProductChild(prev =>
                                prev === "wall_panels" ? null : "wall_panels"
                              )
                            }
                            className="w-full flex justify-between items-center py-3 text-sm"
                          >
                            <span className="font-semibold text-[#D4AF37]">Wall Panel</span>
                            <HiChevronDown
                              className={`transition ${mobileOpenProductChild === "wall_panels"
                                ? "rotate-180 text-[#D4AF37]"
                                : ""
                                }`}
                            />
                          </button>

                          {mobileOpenProductChild === "wall_panels" && (
                            <ul className="pl-4 space-y-2">
                              {megaMenuData
                                .find(s => s.key === "wall_panels")
                                ?.items.map(item => (
                                  <li key={item.path}>
                                    <Link
                                      to={item.path}
                                      onClick={() => setMenuOpen(false)}
                                      className="block text-sm text-gray-300 hover:text-[#D4AF37]"
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          )}
                        </div>

                      </div>
                    )}
                  </div>

                  {/* ================= STATIC LINKS ================= */}
                  <div className="mt-4 space-y-2">
                    <Link to="/" className="block py-2 hover:text-[#D4AF37]" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/about" className="block py-2 hover:text-[#D4AF37]" onClick={() => setMenuOpen(false)}>About</Link>
                    <Link to="/coimbatore-shop" className="block py-2 hover:text-[#D4AF37]" onClick={() => setMenuOpen(false)}>Coimbatore Store</Link>
                    <Link to="/order" className="block py-2 hover:text-[#D4AF37]" onClick={() => setMenuOpen(false)}>My Orders</Link>
                    <Link to="/contact" className="block py-2 hover:text-[#D4AF37]" onClick={() => setMenuOpen(false)}>Contact</Link>
                  </div>

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