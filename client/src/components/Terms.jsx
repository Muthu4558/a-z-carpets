import React from "react";
import {
  FaFileContract,
  FaShoppingCart,
  FaCreditCard,
  FaUndoAlt,
  FaTruck,
  FaTools,
  FaUserShield,
  FaCopyright,
  FaBalanceScale,
  FaSyncAlt,
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

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F9] pt-16">
      <Navbar />

      <main className="flex-grow py-12 px-4">
        <div className="max-w-5xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-12">
            <FaFileContract className="text-[#D4AF37] text-5xl mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Terms of Service
            </h1>
            <p className="text-gray-600 text-sm mt-4 max-w-3xl mx-auto">
              Last Updated: 14 November 2024
            </p>
          </div>

          {/* 1 */}
          <Section icon={<FaFileContract />} title="1. Introduction">
            <p>
              These Terms and Conditions govern your use of the Jewel Carpets
              website, products, and services. By using our website, you agree
              to be bound by these terms.
            </p>
          </Section>

          {/* 2 */}
          <Section icon={<FaShoppingCart />} title="2. Products and Services">
            <p>
              Jewel Carpets offers handmade and machine-made carpets,
              customized carpets, and flooring solutions.
            </p>
            <p>
              <strong>Processing Time:</strong> 1–2 business days.
            </p>
            <p>
              <strong>Domestic Shipping:</strong> Shiprocket & Delhivery
              (2–3 business days after dispatch).
            </p>
            <p>
              <strong>International Shipping:</strong> DHL & FedEx
              (7–10 business days after dispatch).
            </p>
          </Section>

          {/* 3 */}
          <Section icon={<FaCreditCard />} title="3. Payment Terms">
            <ul className="list-disc list-inside space-y-1">
              <li>Credit / Debit Cards</li>
              <li>UPI & Online Payment Options</li>
              <li>Cash on Delivery (eligible orders)</li>
            </ul>
            <p>
              All payments must be made in full at the time of purchase except
              COD. We do not store payment information.
            </p>
          </Section>

          {/* 4 */}
          <Section icon={<FaUndoAlt />} title="4. Order Cancellations">
            <p>
              Orders can be cancelled before production begins. Once
              production has started, cancellations are not accepted.
            </p>
          </Section>

          {/* 5 */}
          <Section icon={<FaUndoAlt />} title="5. Return, Exchange & Refund Policy">
            <p><strong>All Sales Are Final:</strong> No returns unless manufacturing defect.</p>
            <p>
              <strong>Defective Products:</strong> Notify us within 24 hours of delivery.
            </p>
            <p>
              <strong>Exchanges:</strong> Customer bears shipping cost.
            </p>
            <p>
              <strong>Refunds:</strong> Logistics cost reimbursed within 10 days after inspection.
            </p>
          </Section>

          {/* 6 */}
          <Section icon={<FaTruck />} title="6. Shipping & Delivery">
            <p>
              Free shipping within India. International charges calculated at checkout.
            </p>
            <p>
              Tracking details will be emailed once dispatched.
            </p>
            <p>
              We are not responsible for customs delays or unforeseen issues.
            </p>
          </Section>

          {/* 7 */}
          <Section icon={<FaTools />} title="7. Installation Services">
            <p>
              Installation services are available upon request and may incur
              additional charges.
            </p>
          </Section>

          {/* 8 */}
          <Section icon={<FaUserShield />} title="8. User Conduct">
            <ul className="list-disc list-inside space-y-1">
              <li>Do not violate laws or policies.</li>
              <li>Do not disrupt website functionality.</li>
              <li>Do not engage in fraud or impersonation.</li>
            </ul>
          </Section>

          {/* 9 */}
          <Section icon={<FaCopyright />} title="9. Intellectual Property">
            <p>
              All content, logos, and designs belong to Jewel Carpets.
              Unauthorized use is strictly prohibited.
            </p>
          </Section>

          {/* 10 */}
          <Section icon={<FaBalanceScale />} title="10. Limitation of Liability">
            <p>
              Jewel Carpets is not liable for indirect or consequential damages
              resulting from use of our website or products.
            </p>
          </Section>

          {/* 11 */}
          <Section icon={<FaSyncAlt />} title="11. Changes to Terms">
            <p>
              We reserve the right to update these Terms at any time.
              Continued use of the website constitutes acceptance of changes.
            </p>
          </Section>

          {/* 12 */}
          <Section icon={<FaBalanceScale />} title="12. Governing Law">
            <p>
              These terms are governed by the laws of India. Disputes shall
              fall under the jurisdiction of courts in Kolkata, West Bengal.
            </p>
          </Section>

          {/* 13 */}
          <Section icon={<FaFileContract />} title="13. Contact Us">
            <p>Email: <span className="text-[#D4AF37] font-medium">jewelcarpetskol@gmail.com</span></p>
            <p>Phone: <span className="text-[#D4AF37] font-medium">+91 96268 46646</span></p>
            <p>
              Address: SF 45, Mettupalayam Rd, Dhandapani Nagar, Thudiyalur, Tamil Nadu 641017
            </p>
          </Section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
