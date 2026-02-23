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

const allowedOrigin = process.env.CLIENT_URL;

// ✅ Proper CORS Setup
app.use(cors());

// ✅ Fix popup blocking issue (Razorpay / OAuth)
app.use((req, res, next) => {
  res.setHeader(
    "Cross-Origin-Opener-Policy",
    "same-origin-allow-popups"
  );
  next();
});

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/shipping", shippingRoutes);
// app.use("/api/blog", blogRoutes);
app.use("/api/razorpay", razorpayRoutes);
app.use("/api/enquiries", enquiryRoutes);

// ✅ Server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});