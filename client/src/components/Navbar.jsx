import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX, HiChevronDown } from "react-icons/hi";
import { FaShoppingBag, FaUser } from "react-icons/fa";
import axios from "axios";
import { useCart } from "../context/CartContext";
import Logo from "../assets/a-z-logo.jpeg";
import AnnouncementBar from "./AnnouncementBar";
import {
  FaThLarge,
  FaCrown,
  FaGem,
  FaLeaf,
  FaShapes,
  FaChild,
  FaRegSquare,
} from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  const lastScrollY = useRef(0);
  const dropdownRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const { cartItems } = useCart();
  const cartCount = cartItems?.length || 0;

  const isActive = (path) => pathname === path;
  const isProducts = pathname.startsWith("/products");

  const activeClass = "text-[#D4AF37]";
  const inactiveClass =
    "text-black hover:text-[#D4AF37] transition duration-300";

  /* ---------------- SCROLL CONTROL ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current < 10) setShowAnnouncement(true);
      else if (current > lastScrollY.current) setShowAnnouncement(false);
      else setShowAnnouncement(true);

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- CLOSE DESKTOP DROPDOWN ---------------- */
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDesktopDropdown(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  /* ---------------- AUTH CHECK ---------------- */
  useEffect(() => {
    const verify = async () => {
      try {
        await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/api/auth/verify`,
          { withCredentials: true }
        );
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

  const productsMenu = [
    { label: "All Carpets & Rugs", path: "/products/all", icon: <FaThLarge /> },
    { label: "Hand Tufted Rugs", path: "/products/hand-tufted", icon: <FaGem /> },
    { label: "Shaggy Carpets", path: "/products/shaggy", icon: <FaRegSquare /> },
    { label: "Persian Silk Carpets", path: "/products/persian-silk", icon: <FaCrown /> },
    { label: "Designer Carpets", path: "/products/designer", icon: <FaShapes /> },
    { label: "Luxury Viscose Rugs", path: "/products/viscose", icon: <FaGem /> },
    { label: "Iranian Imported Rugs", path: "/products/iranian", icon: <FaCrown /> },
    { label: "Irregular Shaped Rugs", path: "/products/irregular", icon: <FaShapes /> },
    { label: "Traditional Persian Rugs", path: "/products/traditional", icon: <FaLeaf /> },
    { label: "Round Shaggy Carpets", path: "/products/round-shaggy", icon: <FaRegSquare /> },
    { label: "Round Tufted Carpets", path: "/products/round-tufted", icon: <FaGem /> },
    { label: "Children Rugs", path: "/products/children", icon: <FaChild /> },
  ];

  return (
    <>
      {/* ANNOUNCEMENT */}
      <AnimatePresence>
        {showAnnouncement && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: -60 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50"
          >
            <AnnouncementBar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVBAR */}
      <nav
        className={`fixed left-0 right-0 z-40 bg-[#F5F5F5] shadow-xl transition-all duration-300 ${showAnnouncement ? "top-[40px]" : "top-0"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">

          {/* LOGO */}
          {/* LOGO + BRAND NAME */}
          <Link to="/" className="flex items-center gap-3">
            <img src={Logo} alt="logo" className="w-20 md:w-24 rounded-xl" />

            <div className="flex flex-col leading-tight">
              <span className="text-lg md:text-xl font-bold text-black tracking-wide">
                Coimbatore
              </span>
              <span className="text-sm md:text-base font-semibold text-[#D4AF37]">
                A-Z Carpets
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8 font-medium">

            <Link to="/" className={isActive("/") ? activeClass : inactiveClass}>Home</Link>
            <Link to="/about" className={isActive("/about") ? activeClass : inactiveClass}>About</Link>

            {/* DESKTOP DROPDOWN */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDesktopDropdown(!desktopDropdown)}
                className={`flex items-center gap-2 ${isProducts ? activeClass : inactiveClass}`}
              >
                Products
                <HiChevronDown className={`transition ${desktopDropdown ? "rotate-180 text-[#D4AF37]" : ""}`} />
              </button>

              <AnimatePresence>
                {desktopDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-12 left-0 w-[520px] bg-[#111111] border border-[#222] shadow-2xl"
                  >
                    <div className="grid grid-cols-2">
                      {productsMenu.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="flex items-center gap-3 px-6 py-4 text-sm text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition border-b border-[#1f1f1f]"
                        >
                          <span>
                            {item.icon}
                          </span>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/order" className={isActive("/order") ? activeClass : inactiveClass}>My Orders</Link>
            <Link to="/blog" className={isActive("/blog") ? activeClass : inactiveClass}>Blog</Link>
            <Link to="/contact" className={isActive("/contact") ? activeClass : inactiveClass}>Contact</Link>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {/* PROFILE (Desktop Only) */}
            <Link
              to="/profile"
              className="hidden md:flex bg-[#D4AF37] text-black px-4 py-2 rounded-lg font-semibold items-center gap-2 hover:bg-[#C9A227]"
            >
              <FaUser /> <span>Profile</span>
            </Link>


            <Link to="/cart" className="relative bg-[#D4AF37] text-black px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#C9A227]">
              <FaShoppingBag /> <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-[#D4AF37] text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-[#D4AF37]"
            >
              {menuOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "80vh", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-[#111111] border-t border-[#1A1A1A] overflow-y-auto"
            >
              <div className="px-6 py-4 space-y-4">

                <Link to="/" className="block text-gray-300">Home</Link>
                <Link to="/about" className="block text-gray-300">About</Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 text-gray-300 hover:text-[#D4AF37] transition"
                >
                  {/* <FaUser className="text-[#D4AF37]" /> */}
                  Profile
                </Link>
                <div>
                  <button
                    onClick={() => setMobileDropdown(!mobileDropdown)}
                    className="w-full flex justify-between items-center text-gray-300"
                  >
                    Products
                    <HiChevronDown className={`transition ${mobileDropdown ? "rotate-180 text-[#D4AF37]" : ""}`} />
                  </button>

                  {mobileDropdown && (
                    <div className="mt-3 bg-[#111111] border border-[#222] max-h-[50vh] overflow-y-auto">
                      {productsMenu.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-[#D4AF37] hover:text-black transition border-b border-[#1f1f1f]"
                        >
                          <span className="text-[#D4AF37]">
                            {item.icon}
                          </span>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link to="/blog" className="block text-gray-300">Blog</Link>
                <Link to="/contact" className="block text-gray-300">Contact</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className={`${showAnnouncement ? "h-[120px]" : "h-[80px]"}`} />
    </>
  );
};

export default Navbar;