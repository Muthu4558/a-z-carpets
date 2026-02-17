import React from "react";
import {
  FaTruck,
  FaShippingFast,
  FaGlobe,
  FaBoxOpen,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Footer from "./Footer";
import Navbar from "./Navbar";

const BRAND = "#D4AF37";

const Section = ({ icon, title, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
    <div className="flex items-center gap-3 mb-4">
      <div className="text-[#D4AF37] text-xl">{icon}</div>
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    </div>
    <div className="text-gray-600 text-sm leading-relaxed space-y-2">
      {children}
    </div>
  </div>
);

const Shipping = () => {
  return (
    <div className="min-h-screen flex flex-col pt-16 bg-[#F9F9F9]">
      <Navbar />

      <main className="flex-grow py-12 px-4">
        <div className="max-w-5xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-12">
            <FaTruck className="text-[#D4AF37] text-5xl mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Shipping Policy
            </h1>
            <p className="text-gray-600 text-sm mt-4 max-w-2xl mx-auto">
              At Jewel Carpet, we are committed to delivering your orders
              promptly and securely. Below is our detailed shipping and
              delivery policy.
            </p>
          </div>

          {/* SHIPPING COSTS */}
          <Section icon={<FaShippingFast />} title="Shipping Costs">
            <p>
              <strong>Free Shipping:</strong> Available across India.
            </p>
            <p>
              <strong>International Shipping:</strong> Charges are calculated
              at checkout based on the destination and package weight.
            </p>
          </Section>

          {/* PROCESSING TIME */}
          <Section icon={<FaBoxOpen />} title="Processing Time">
            <p>
              All orders are dispatched within <strong>24 business hours</strong>{" "}
              whenever possible.
            </p>
            <p>
              Delivery timelines depend on the product and location, ranging
              from next-day delivery to a maximum of{" "}
              <strong>10 business days</strong>.
            </p>
          </Section>

          {/* DELIVERY TIMELINES */}
          <Section icon={<FaTruck />} title="Carpet Dispatch & Delivery Timelines">
            <ul className="list-disc list-inside space-y-1">
              <li>In-Stock Carpets – Shipped within 24 hours, delivered in 3–4 days</li>
              <li>Shaggy Carpets – Ships in 2–3 days, delivered in 3–4 days</li>
              <li>Hand Tufted Rugs – Ships in 5–6 days, delivered in 3–4 days</li>
              <li>Designer Carpets – Ships in 5–6 days, delivered in 3–4 days</li>
              <li>Viscose Carpets – Ships in 5–6 days, delivered in 3–4 days</li>
              <li>Irregular Shaped Rugs – Ships in 5–6 days, delivered in 3–4 days</li>
              <li>Dope Collection – Ships in 5–6 days, delivered in 3–4 days</li>
              <li>Round Shaggy Carpets – Ships in 2–3 days, delivered in 3–4 days</li>
              <li>Round Tufted Carpets – Ships in 5–6 days, delivered in 3–4 days</li>
              <li>Artificial Grass – Dispatched next working day, delivered in 3–4 days</li>
            </ul>

            <p className="mt-3">
              <strong>Note:</strong> Delivery timelines may vary depending on
              location and distance.
            </p>
          </Section>

          {/* SHIPPING PARTNERS */}
          <Section icon={<FaGlobe />} title="Shipping Partners">
            <p>
              <strong>Domestic Shipping:</strong> Handled by Shiprocket and
              Delhivery for reliable service.
            </p>
            <p>
              <strong>International Shipping:</strong> Managed by DHL for
              efficient global delivery.
            </p>
          </Section>

          {/* ORDER TRACKING */}
          <Section icon={<FaMapMarkerAlt />} title="Order Tracking">
            <p>
              Once your order is dispatched, an email with tracking details
              will be sent to help you monitor your shipment’s journey.
            </p>
          </Section>

          {/* CONTACT */}
          <Section icon={<FaTruck />} title="Contact Us">
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
            <p className="mt-2">
              Thank you for choosing Jewel Carpet. We look forward to serving you!
            </p>
          </Section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shipping;
