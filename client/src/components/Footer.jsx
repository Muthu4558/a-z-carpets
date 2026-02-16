import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { MdLocationPin } from "react-icons/md";
import Logo from "../assets/a-z-logo.jpeg";

const Footer = () => {
  return (
    <footer className="relative bg-[#F5F5F5] text-[#1A1A1A]">

      {/* CURVE TOP */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          viewBox="0 0 1440 120"
          className="relative block w-full h-[80px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,96L80,90.7C160,85,320,75,480,64C640,53,800,43,960,48C1120,53,1280,75,1360,85.3L1440,96L1440,0L0,0Z"
            fill="#F5F5F5"
          ></path>
        </svg>
      </div>

      <div className="relative pt-28 pb-14 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

            {/* BRAND */}
            <div className="text-center md:text-left">
              <img
                src={Logo}
                alt="Brand Logo"
                className="w-24 mb-6 mx-auto md:mx-0 rounded-xl"
              />
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                Handcrafted luxury carpets designed to bring warmth,
                elegance and timeless artistry into your interiors.
              </p>
            </div>

            {/* COLLECTIONS */}
            <div className="text-center md:text-left">
              <h3 className="text-[#D4AF37] font-semibold text-lg mb-4">
                Collections
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-[#D4AF37] transition">All Carpets</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition">Modern Designs</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition">Traditional Rugs</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition">Premium Collection</a></li>
              </ul>
            </div>

            {/* SUPPORT */}
            <div className="text-center md:text-left">
              <h3 className="text-[#D4AF37] font-semibold text-lg mb-4">
                Support
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-[#D4AF37] transition">My Account</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition">Orders</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition">Privacy Policy</a></li>
              </ul>
            </div>

            {/* CONTACT */}
            <div className="text-center md:text-left">
              <h3 className="text-[#D4AF37] font-semibold text-lg mb-4">
                Contact
              </h3>

              <p className="flex justify-center md:justify-start items-start gap-2 text-gray-600 text-sm mb-3">
                <MdLocationPin className="text-[#D4AF37] mt-1" />
                <span>
                  SF 45, Mettupalayam Rd, Dhandapani Nagar, NGGO Colony,
                  K. Vadamadurai, Thudiyalur, Kurudampalayam,
                 Tamil Nadu 641017
                </span>
              </p>

              <p className="flex justify-center md:justify-start items-center gap-2 text-gray-600 text-sm mb-3">
                <FaPhoneAlt className="text-[#D4AF37]" />
                <a href="tel:+919626846646" className="hover:text-[#D4AF37] transition">
                  +91 96268 46646
                </a>
              </p>

              <p className="flex justify-center md:justify-start items-center gap-2 text-gray-600 text-sm mb-6">
                <FiMail className="text-[#D4AF37]" />
                <a href="mailto:info@luxurycarpets.com" className="hover:text-[#D4AF37] transition">
                  info@luxurycarpets.com
                </a>
              </p>

              {/* SOCIAL ICONS */}
              <div className="flex justify-center md:justify-start gap-4">
                {[FaInstagram, FaFacebookF].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-[#D4AF37] text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-white"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* BOTTOM */}
          <div className="mt-16 border-t border-gray-300 pt-6 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="text-[#D4AF37] font-medium">
              A - Z Carpets
            </span>
            . All Rights Reserved.
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;