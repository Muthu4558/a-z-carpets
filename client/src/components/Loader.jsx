// Loader.jsx
import React from "react";
import { motion } from "framer-motion";

const PRIMARY = "#D4AF37";
const PRIMARY_SOFT = "#C9A227";
const DARK = "#121212";

const Loader = ({ size = 140 }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0F0F0F]/90 backdrop-blur-sm z-[9999]">

      {/* Rotating Gold Ring */}
      <motion.div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: `4px solid ${PRIMARY_SOFT}`,
          borderTop: `4px solid ${PRIMARY}`,
        }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "linear",
        }}
      />

      {/* Inner Pulse Circle */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size - 40,
          height: size - 40,
          background: `radial-gradient(circle, ${PRIMARY} 0%, ${PRIMARY_SOFT} 60%, transparent 70%)`,
        }}
        animate={{
          scale: [0.9, 1.1, 0.9],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Brand Text */}
      <motion.div
        className="mt-10 text-lg font-semibold tracking-widest"
        style={{ color: PRIMARY }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        LOADING...
      </motion.div>

      {/* Sub text */}
      <div className="text-xs text-gray-400 mt-2 tracking-wider">
        Coimbatore A to Z Carpet & Wallpaper
      </div>
    </div>
  );
};

export default Loader;
