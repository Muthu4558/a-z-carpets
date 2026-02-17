import React from "react";
import { motion } from "framer-motion";

const AnnouncementBar = () => {
  const messages = [
    "Get 50% Off On All Products",
    "Additional 10% Off On Prepaid Orders",
    "International Shipping Available",
    "Customisation Available",
    "Get In Touch With Our Sales Agent : +91 96268 46646",
  ];

  return (
    <div className="w-full bg-[#FADADD] text-black overflow-hidden border-b border-pink-200">
      <div className="relative flex items-center h-10">

        <motion.div
          className="whitespace-nowrap flex gap-16 font-medium text-sm"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 50,
            ease: "linear",
          }}
        >
          {[...messages, ...messages].map((msg, index) => (
            <span key={index} className="mx-6">
              {msg}
            </span>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default AnnouncementBar;
