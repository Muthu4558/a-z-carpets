import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // NEW: top-level group (shop_by_category | party_exhibition | artificial_grass)
    productGroup: { type: String, default: "" },

    // category: stores the selected sub option (e.g., "Hand Tufted Rugs" or "Green Party Carpets" or "25MM")
    category: { type: String, required: true },

    name: { type: String, required: true },

    companyName: { type: String, required: true },

    // color is optional; sometimes category already encodes color (for party carpets)
    color: { type: String },

    // shape optional (round, rectangular, irregular)
    shape: { type: String },

    price: { type: Number, required: true },
    offerPrice: { type: Number },

    warranty: { type: String },

    type: { type: String }, // Hand Made | Machine Made - keep freeform

    sizes: [
      {
        type: String,
      },
    ],

    productDetails: { type: String, required: true },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    image: { type: String },

    featured: { type: Boolean, default: false },

    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        author: String,
        rating: { type: Number, min: 1, max: 5 },
        comment: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
