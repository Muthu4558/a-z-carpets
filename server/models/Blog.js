import mongoose from "mongoose";
import slugify from "slugify";

const blogSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: String,
    content: { type: String, required: true },
    image: { type: String, required: true },
    slug: { type: String, unique: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

blogSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

export default mongoose.model("Blog", blogSchema);
