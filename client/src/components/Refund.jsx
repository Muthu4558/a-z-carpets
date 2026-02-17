import React from "react";
import {
  FaUndoAlt,
  FaExclamationTriangle,
  FaTruck,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Section = ({ icon, title, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
    <div className="flex items-center gap-3 mb-4">
      <div className="text-[#D4AF37] text-xl">{icon}</div>
      <h2 className="text-lg md:text-xl font-semibold text-gray-800">
        {title}
      </h2>
    </div>
    <div className="text-gray-600 text-sm leading-relaxed space-y-3">
      {children}
    </div>
  </div>
);

const Refund = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F9] pt-16">
      <Navbar />

      <main className="flex-grow py-12 px-4">
        <div className="max-w-5xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-12">
            <FaUndoAlt className="text-[#D4AF37] text-5xl mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Refund and Return Policy
            </h1>
            <p className="text-gray-600 text-sm mt-4 max-w-3xl mx-auto">
              Please review our refund and replacement guidelines carefully
              before making a purchase.
            </p>
          </div>

          {/* 1 */}
          <Section icon={<FaUndoAlt />} title="1. All Sales Are Final">
            <p>
              We do not accept returns or exchanges on any purchases.
              <strong> All sales are final.</strong>
            </p>
          </Section>

          {/* 2 */}
          <Section icon={<FaExclamationTriangle />} title="2. Manufacturing Defects">
            <p>
              If you discover any manufacturing defects in the products you
              receive, please notify us within{" "}
              <strong>24 hours of delivery</strong>.
            </p>
            <p>
              Email us at{" "}
              <span className="text-[#D4AF37] font-medium">
                jewelcarpetskol@gmail.com
              </span>{" "}
              with photos and order details.
            </p>
            <p>
              We will replace the defective item with another of the same type
              after reviewing the issue.
            </p>
          </Section>

          {/* 3 */}
          <Section icon={<FaTruck />} title="3. Logistical Costs">
            <p>
              Customers are responsible for the logistics and shipping costs
              associated with returning the item.
            </p>
            <p>
              These costs will be reimbursed via your preferred payment method
              within <strong>10 days</strong> after the replacement has been processed.
            </p>
          </Section>

          {/* 4 */}
          <Section icon={<FaPhoneAlt />} title="4. Contact Information">
            <p>
              WhatsApp / Call:{" "}
              <span className="text-[#D4AF37] font-medium">
                +91 96268 46646
              </span>
            </p>
            <p>
              Email:{" "}
              <span className="text-[#D4AF37] font-medium">
                jewelcarpetskol@gmail.com
              </span>
            </p>
          </Section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Refund;
