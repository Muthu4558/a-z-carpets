import {
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { MdLocationPin } from "react-icons/md";
import Logo from "../assets/a-z-logo.jpeg";

const Footer = () => {
  return (
    <footer className="bg-[#F5F5F5] text-[#1A1A1A] border-t border-gray-300">

      <div className="pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto">

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

            {/* BRAND */}
            <div className="text-center md:text-left">
              <img
                src={Logo}
                alt="Brand Logo"
                className="w-24 mb-6 mx-auto md:mx-0 rounded-xl"
              />
              <h2 className="text-xl font-semibold text-[#1A1A1A] mb-6">Coimbatore <span className="text-[#D4AF37]">A-Z Carpets</span></h2>
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
                <li><a href="#" className="hover:text-[#D4AF37] transition">All Carpets & Rugs</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition">Hand Tufted Rugs</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition">Shaggy Carpets</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition">Persian Silk Carpets</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition">Designer Carpets</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition">Luxury Viscose Rugs</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition">Iranian Imported Rugs</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition">Irregular Shaped Rugs</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition">Traditional Persian Rugs</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition">Round Shaggy Carpets</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition">Round Tufted Carpets</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition">Children Rugs</a></li>
              </ul>
            </div>

            {/* SUPPORT */}
            <div className="text-center md:text-left">
              <h3 className="text-[#D4AF37] font-semibold text-lg mb-4">
                Support
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="/profile" className="hover:text-[#D4AF37] transition">Profile</a></li>
                <li><a href="/order" className="hover:text-[#D4AF37] transition">Orders</a></li>
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
                <MdLocationPin size={20} className="text-[#D4AF37] mt-1" />
                <span>
                  SF 45, Mettupalayam Rd, Dhandapani Nagar,
                  Thudiyalur, Tamil Nadu 641017
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
                {[
                  {
                    Icon: FaInstagram,
                    link: "https://www.instagram.com/a_to_z_carpet_wallpaper?igsh=MXVqc2w2dXlhcnFjdg%3D%3D&utm_source=qr",
                  },
                  {
                    Icon: FaFacebookF,
                    link: "https://www.facebook.com/share/19kGTFsCCB/?mibextid=wwXIfr",
                  },
                ].map(({ Icon, link }, i) => (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-[#D4AF37] text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-white"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* BOTTOM SECTION */}
          <div className="mt-16 border-t border-gray-300 pt-6 text-sm text-gray-500">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">

              {/* LEFT */}
              <p className="text-center md:text-left">
                © {new Date().getFullYear()}{" "}
                <span className="text-[#D4AF37] font-semibold">
                  A - Z Carpets
                </span>
                . All Rights Reserved.
              </p>

              {/* RIGHT */}
              <p className="text-center md:text-right">
                Developed by{" "}
                <span className="text-[#D4AF37] font-semibold">
                  smartIndia.ai
                </span>
              </p>

            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
