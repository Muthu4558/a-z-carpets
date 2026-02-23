import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import shippingRoutes from "./routes/shippingRoutes.js";
// import blogRoutes from "./routes/blogRoutes.js";
import razorpayRoutes from "./routes/razorpayRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";

dotenv.config();
connectDB();

const app = express();

// =============================
// ✅ CORS CONFIGURATION
// =============================

const allowedOrigins = [
  process.env.CLIENT_URL,       // Production frontend
  "http://localhost:5173",      // Vite dev
  "http://localhost:3000"       // CRA dev (optional)
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true, // Required for cookies
  })
);

// =============================
// ✅ Razorpay / OAuth Popup Fix
// =============================
app.use((req, res, next) => {
  res.setHeader(
    "Cross-Origin-Opener-Policy",
    "same-origin-allow-popups"
  );
  next();
});

// =============================
// ✅ MIDDLEWARE
// =============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// =============================
// ✅ ROUTES
// =============================
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/shipping", shippingRoutes);
// app.use("/api/blog", blogRoutes);
app.use("/api/razorpay", razorpayRoutes);
app.use("/api/enquiries", enquiryRoutes);

// =============================
// ✅ GLOBAL ERROR HANDLER
// =============================
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

// =============================
// ✅ SERVER START
// =============================
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});