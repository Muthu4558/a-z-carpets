import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, default: 1 },
  selectedSize: {
  size: { type: String },
  price: { type: Number }
}
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  items: [cartItemSchema]
});

export default mongoose.model("Cart", cartSchema);
