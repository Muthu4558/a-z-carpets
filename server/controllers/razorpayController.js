import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/productModel.js";

// 🔹 1. Create Razorpay Order
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Razorpay works in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Razorpay order creation failed" });
  }
};


// 🔹 2. Verify Payment Signature
export const verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      console.log("Signature mismatch");
      console.log("Generated:", generated_signature);
      console.log("Received:", razorpay_signature);
      return res.status(400).json({ message: "Invalid signature" });
    }

    const order = await Order.findById(orderId);

    order.paymentId = razorpay_payment_id;
    order.paymentStatus = "PAID";
    await order.save();

    // reduce stock + clear cart here

    res.json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment verification failed" });
  }
};

