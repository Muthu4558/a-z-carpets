import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    companyName: { type: String, required: true },

    category: {
      type: String,
      enum: [
        "All Carpets & Rugs",
        "Hand Tufted Rugs",
        "Shaggy Carpets",
        "Persian Silk Carpets",
        "Designer Carpets",
        "Luxury Viscose Rugs",
        "Iranian Imported Rugs",
        "Irregular Shaped Rugs",
        "Traditional Persian Rugs",
        "Round Shaggy Carpets",
        "Round Tufted Carpets",
        "Children Rugs",
      ],
      required: true,
    },

    price: { type: Number, required: true },
    offerPrice: { type: Number },

    warranty: { type: String },

    type: {
      type: String,
      enum: ["Hand Made", "Machine Made"],
      required: true,
    },

    sizes: [
      {
        type: String,
        enum: [
          "4x6ft",
          "5x7ft",
          "5x8ft",
          "6x9ft",
          "7x10ft",
          "8x10ft",
          "8x11ft",
          "9x12ft",
          "10x13ft",
          "10x14ft",
          "12x14ft",
          "12x15ft",
          "12x18ft",
        ],
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
