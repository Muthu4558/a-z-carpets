import React from "react";
import {
  FaShieldAlt,
  FaUserLock,
  FaShoppingCart,
  FaCookieBite,
  FaShareAlt,
  FaLock,
  FaUserCheck,
  FaExternalLinkAlt,
  FaSyncAlt,
} from "react-icons/fa";
import Footer from "./Footer";
import Navbar from "./Navbar";

const BRAND = "#D4AF37";

const Section = ({ icon, title, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
    <div className="flex items-center gap-3 mb-4">
      <div className="text-[#D4AF37] text-xl">{icon}</div>
      <h2 className="text-lg md:text-xl font-semibold text-gray-800">
        {title}
      </h2>
    </div>
    <div className="text-gray-600 leading-relaxed text-sm space-y-3">
      {children}
    </div>
  </div>
);

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#F9F9F9] pt-16 flex flex-col">
      <Navbar />

      <main className="flex-grow py-12 px-4">
        <div className="max-w-5xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-12">
            <FaShieldAlt className="text-[#D4AF37] text-5xl mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Privacy Policy
            </h1>
            <p className="text-gray-600 mt-4 text-sm max-w-2xl mx-auto">
              Welcome to Jewel Carpets. We respect your privacy and are dedicated
              to safeguarding your personal information.
            </p>
          </div>

          {/* 1. INTRODUCTION */}
          <Section icon={<FaShieldAlt />} title="1. Introduction">
            <p>
              This Privacy Policy outlines the types of data we collect, how we
              use it, and the measures we take to protect it. By accessing or
              using our website, you agree to the practices described in this policy.
            </p>
          </Section>

          {/* 2. INFORMATION WE COLLECT */}
          <Section icon={<FaUserLock />} title="2. Information We Collect">
            <p><strong>Personal Information:</strong> Name, email address, phone number, and mailing address when placing orders or contacting us.</p>
            <p><strong>Payment Information:</strong> Payment details are processed securely via third-party providers. We do not store your payment details.</p>
            <p><strong>Usage Data:</strong> IP address, browser type, browsing history, and pages visited.</p>
            <p><strong>Cookies:</strong> Used to enhance user experience and analyze website usage patterns.</p>
          </Section>

          {/* 3. HOW WE USE INFORMATION */}
          <Section icon={<FaShoppingCart />} title="3. How We Use Your Information">
            <ul className="list-disc list-inside space-y-1">
              <li>To process and fulfill your orders.</li>
              <li>To communicate about orders and inquiries.</li>
              <li>To improve our website and services.</li>
              <li>To send promotional offers (you may opt out).</li>
              <li>To detect and prevent fraud.</li>
            </ul>
          </Section>

          {/* 4. HOW WE SHARE */}
          <Section icon={<FaShareAlt />} title="4. How We Share Your Information">
            <p>
              We do not sell your personal information.
            </p>
            <p>
              <strong>Service Providers:</strong> We may share data with trusted partners
              like DHL or courier services to fulfill orders.
            </p>
            <p>
              <strong>Legal Compliance:</strong> Information may be disclosed if required by law.
            </p>
          </Section>

          {/* 5. DATA SECURITY */}
          <Section icon={<FaLock />} title="5. Data Security">
            <p>
              Our website uses SSL encryption for secure data transmission.
            </p>
            <p>
              While we follow strict security practices, no internet transmission
              is completely secure.
            </p>
          </Section>

          {/* 6. YOUR RIGHTS */}
          <Section icon={<FaUserCheck />} title="6. Your Rights">
            <ul className="list-disc list-inside space-y-1">
              <li>Access and update your personal information.</li>
              <li>Request deletion (subject to legal obligations).</li>
              <li>Opt out of promotional communications.</li>
            </ul>
          </Section>

          {/* 7. THIRD PARTY LINKS */}
          <Section icon={<FaExternalLinkAlt />} title="7. Third-Party Links">
            <p>
              Our website may contain links to third-party sites. We are not
              responsible for their privacy practices.
            </p>
          </Section>

          {/* 8. POLICY CHANGES */}
          <Section icon={<FaSyncAlt />} title="8. Changes to This Privacy Policy">
            <p>
              We may update this policy from time to time. Changes will be
              posted on this page with updated effective dates.
            </p>
          </Section>

          {/* 9. CONTACT */}
          <Section icon={<FaShieldAlt />} title="9. Contact Us">
            <p>
              Email:{" "}
              <span className="text-[#D4AF37] font-medium">
                jewelcarpetskol@gmail.com
              </span>
            </p>
            <p>
              Phone:{" "}
              <span className="text-[#D4AF37] font-medium">
                +91 96268 46646
              </span>
            </p>
            <p>
              Address:  SF 45, Mettupalayam Rd, Dhandapani Nagar, Thudiyalur, Tamil Nadu 641017
            </p>
          </Section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;