import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/productModel.js";

export const placeOrder = async (req, res) => {
  try {
    const { address, paymentMethod } = req.body;

    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // ✅ CHECK STOCK FIRST
    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({
          message: `${item.product.name} is out of stock`,
        });
      }
    }

    const items = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.offerPrice || item.product.price,
    }));

    const totalAmount = items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    const estimatedDeliveryDate = new Date();
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 7);

    // ✅ CREATE ORDER
    const order = await Order.create({
      user: req.user._id,
      items,
      address,
      totalAmount,
      paymentMethod,
      paymentStatus: "PENDING",
      estimatedDeliveryDate,
      currentStatus: "PREPARING",
    });

    // 🔥🔥🔥 IMPORTANT PART — REDUCE STOCK
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(
        item.product._id,
        { $inc: { stock: -item.quantity } } // atomic decrease
      );
    }

    // ✅ CLEAR CART AFTER SUCCESS
    cart.items = [];
    await cart.save();

    res.json(order);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order placement failed" });
  }
};


export const updateOrderStatus = async (req, res) => {
  try {
    const { status, expectedDeliveryDate } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (status === "DISPATCHED") {
      order.statusTimeline.dispatched.status = true;
      order.statusTimeline.dispatched.date = new Date();
      order.currentStatus = "DISPATCHED";

      if (expectedDeliveryDate) {
        order.expectedDeliveryDate = expectedDeliveryDate;
      }
    }

    if (status === "DELIVERED") {
      order.statusTimeline.delivered.status = true;
      order.statusTimeline.delivered.date = new Date();
      order.currentStatus = "DELIVERED";

      // 🔥 VERY IMPORTANT FIX
      if (order.paymentMethod === "COD") {
        order.paymentStatus = "PAID";
      }
    }

    await order.save();

    res.json({ message: "Order updated successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getOrderStats = async (req, res) => {
  try {
    res.set("Cache-Control", "no-store");

    const { startDate, endDate } = req.query;

    let dateFilter = {};

    if (startDate && endDate) {
      dateFilter = {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate + "T23:59:59.999Z"),
        },
      };
    }

    const statusStats = await Order.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: "$currentStatus",
          count: { $sum: 1 },
        },
      },
    ]);

    const totalOrders = await Order.countDocuments(dateFilter);

    const revenueResult = await Order.aggregate([
      { $match: { ...dateFilter, currentStatus: "DELIVERED" } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    const recentTransactions = await Order.find({
      ...dateFilter,
      currentStatus: "DELIVERED",
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    const formatted = {
      totalOrders,
      totalRevenue,
      PREPARING: 0,
      DISPATCHED: 0,
      DELIVERED: 0,
      recentTransactions,
    };

    statusStats.forEach((item) => {
      formatted[item._id] = item.count;
    });

    res.json(formatted);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};


