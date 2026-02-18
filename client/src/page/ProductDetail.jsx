// src/pages/ProductDetail.jsx
import React, { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useLoading } from "../context/LoadingContext";
import { toast } from "react-toastify";

const BRAND = "#D4AF37";
const BASE = import.meta.env.VITE_APP_BASE_URL;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  const { startLoading, stopLoading } = useLoading();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);
  const [canReview, setCanReview] = useState(false);
  const reviewsRef = useRef(null);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  /* ================= HELPERS ================= */
  const getImageSrc = (img) => {
    if (!img) return "/placeholder.png";
    const isUrl = typeof img === "string" && (img.startsWith("http://") || img.startsWith("https://"));
    return isUrl ? img : `${BASE}/uploads/${img}`;
  };

  /* ================= FETCH PRODUCT ================= */
  const fetchProduct = async () => {
    setLocalLoading(true);
    startLoading?.();
    try {
      const res = await axios.get(`${BASE}/api/products/id/${id}`);
      const p = res.data || {};
      // normalize images: if product.images exists use it, else fallback to single image
      if (p.image && !p.images) p.images = [p.image];
      setProduct(p);
      setReviews(Array.isArray(p.reviews) ? p.reviews : []);
      // auto-select size if exactly one
      if (Array.isArray(p.sizes) && p.sizes.length === 1) {
        setSelectedSize(p.sizes[0]);
      } else {
        setSelectedSize(null);
      }
    } catch (err) {
      console.error("fetchProduct error:", err);
      setProduct(null);
      setReviews([]);
    } finally {
      setLocalLoading(false);
      stopLoading?.();
    }
  };

  const checkCanReview = async () => {
    try {
      const res = await axios.get(`${BASE}/api/products/${id}/can-review`, { withCredentials: true });
      setCanReview(res.data.canReview);
    } catch (err) {
      setCanReview(false);
    }
  };

  const submitReview = async () => {
    if (!comment.trim()) {
      toast.error("Please write a review");
      return;
    }

    try {
      setSubmittingReview(true);
      await axios.post(
        `${BASE}/api/products/${id}/review`,
        { rating, comment },
        { withCredentials: true }
      );

      toast.success("Review added successfully");
      setComment("");
      setCanReview(false);
      fetchProduct();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    checkCanReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    if (searchParams.get("review") === "true") {
      setTimeout(() => {
        reviewsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ================= DERIVED ================= */
  const images = useMemo(() => {
    if (!product) return [];
    if (Array.isArray(product.images) && product.images.length) return product.images;
    if (product.image) return [product.image];
    return [];
  }, [product]);

  if (localLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">Product not found</div>
        <Footer />
      </>
    );
  }

  const price = Number(product.price ?? 0);
  const offerPrice = product.offerPrice ? Number(product.offerPrice) : null;
  const discount = offerPrice && price ? Math.round(((price - offerPrice) / price) * 100) : 0;

  const setQuantitySafe = (val) => {
    const q = Number(val) || 1;
    setQuantity(Math.max(1, Math.min(99, q)));
  };

  const handleAddToCart = async () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }

    setIsAdding(true);
    try {
      await addToCart({ ...product, selectedSize }, quantity);
      toast.success("Added to cart");
    } catch (err) {
      console.error("addToCart error:", err);
      toast.error("Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }

    setIsAdding(true);
    try {
      await addToCart({ ...product, selectedSize }, quantity);
      navigate("/cart");
    } catch (err) {
      console.error("buyNow error:", err);
      toast.error("Failed to proceed to cart");
    } finally {
      setIsAdding(false);
    }
  };

  /* ================= DYNAMIC INFO BUILDING =================
     Only include info items that have non-empty values.
     Also show fields depending on productGroup for clarity.
  */
  const buildInfoItems = () => {
    const items = [];

    // Always show category if present
    if (product.category) items.push({ label: "Category", value: product.category });

    // productGroup - show a friendly label if present
    if (product.productGroup) {
      const pretty = {
        shop_by_category: "Shop by Category",
        party_exhibition: "Party / Exhibition",
        artificial_grass: "Artificial Grass",
      }[product.productGroup] || product.productGroup;
      items.push({ label: "Product Type", value: pretty });
    }

    // Shop-by-category specific fields
    if (product.productGroup === "shop_by_category") {
      if (product.color) items.push({ label: "Color", value: product.color });
      if (product.shape) items.push({ label: "Shape", value: product.shape });
      if (product.type) items.push({ label: "Weave Type", value: product.type });
      if (product.warranty) items.push({ label: "Warranty", value: product.warranty });
    }

    // Party / Exhibition (category may contain color info already)
    if (product.productGroup === "party_exhibition") {
      // category often represents party color, but show an explicit color if present
      if (product.color) items.push({ label: "Color", value: product.color });
      if (product.warranty) items.push({ label: "Warranty", value: product.warranty });
      if (product.type) items.push({ label: "Weave Type", value: product.type });
    }

    // Artificial grass
    if (product.productGroup === "artificial_grass") {
      if (product.category) items.push({ label: "Thickness", value: product.category });
      if (product.warranty) items.push({ label: "Warranty", value: product.warranty });
      if (product.type) items.push({ label: "Grass Type", value: product.type });
    }

    // Common fields (fall back to show if present and not duplicated)
    if (product.companyName) items.push({ label: "Brand", value: product.companyName });
    if (product.stock !== undefined && product.stock !== null) {
      items.push({
        label: "Stock",
        value: product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock",
      });
    }

    return items;
  };

  const infoItems = buildInfoItems();

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-28 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* LEFT: Image Gallery */}
            <div>
              <div className="bg-gray-50 rounded-2xl p-6">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={images[galleryIndex] || "placeholder"}
                    src={getImageSrc(images[galleryIndex])}
                    alt={product.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-[400px] lg:h-[520px] object-contain"
                  />
                </AnimatePresence>
              </div>

              <div className="flex gap-3 mt-4 overflow-x-auto">
                {images.length ? (
                  images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setGalleryIndex(i)}
                      className={`w-20 h-20 rounded-lg border ${galleryIndex === i ? "border-[#D4AF37]" : "border-gray-200"}`}
                    >
                      <img src={getImageSrc(img)} className="w-full h-full object-cover rounded-lg" alt={`${product.name} ${i}`} />
                    </button>
                  ))
                ) : (
                  <div className="w-20 h-20 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400">No image</div>
                )}
              </div>
            </div>

            {/* RIGHT: Info & Actions */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900">{product.name}</h1>
              <p className="text-gray-500 mt-2">{product.companyName || "Premium Collection"}</p>

              <div className="mt-6 flex items-center gap-4 flex-wrap">
                {offerPrice ? (
                  <>
                    <span className="text-gray-400 line-through text-lg">₹{price}</span>
                    <span className="text-3xl font-bold text-[#D4AF37]">₹{offerPrice}</span>
                    <span className="bg-[#fff7ed] text-[#a65b00] text-sm px-3 py-1 rounded-full">{discount}% OFF</span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-[#D4AF37]">₹{price}</span>
                )}
              </div>

              <p className="mt-6 text-gray-700 leading-relaxed">{product.productDetails}</p>

              {/* Dynamic Info Grid - only show items that exist */}
              {infoItems.length > 0 && (
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  {infoItems.map((it, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-gray-500 text-xs">{it.label}</div>
                      <div className="font-semibold text-gray-800 mt-1">{it.value || "-"}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* SIZE SELECTION (only if sizes exist) */}
              {Array.isArray(product.sizes) && product.sizes.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Select Size</h3>

                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-5 py-2 rounded-full border text-sm font-medium transition ${selectedSize === size ? "bg-[#D4AF37] text-white border-[#D4AF37] shadow-md" : "border-gray-300 text-gray-700 hover:border-[#D4AF37] hover:text-[#D4AF37]"}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  {!selectedSize && product.sizes.length > 0 && (
                    <p className="text-xs text-red-500 mt-2">Please select a size</p>
                  )}
                </div>
              )}

              {/* Quantity */}
              <div className="mt-8 flex items-center gap-4">
                <button onClick={() => setQuantitySafe(quantity - 1)} className="px-4 py-2 border rounded-lg">-</button>
                <input value={quantity} onChange={(e) => setQuantitySafe(e.target.value)} className="w-16 text-center border rounded-lg py-2" />
                <button onClick={() => setQuantitySafe(quantity + 1)} className="px-4 py-2 border rounded-lg">+</button>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex gap-4 flex-col sm:flex-row">
                <button onClick={handleAddToCart} disabled={isAdding} className="flex-1 bg-[#D4AF37] text-white py-3 rounded-full font-semibold">
                  {isAdding ? "Adding..." : "Add to Cart"}
                </button>
                <button onClick={handleBuyNow} disabled={isAdding} className="flex-1 border border-gray-300 py-3 rounded-full font-semibold">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* REVIEWS */}
          <div ref={reviewsRef} className="mt-16">
            <h2 className="text-2xl font-bold mb-4">Reviews ({reviews.length})</h2>

            {canReview && (
              <div className="border rounded-xl p-6 mb-6 bg-white shadow-md">
                <h3 className="font-bold text-lg mb-4 text-[#D4AF37]">Write a Review</h3>
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} onClick={() => setRating(star)} className={`cursor-pointer text-xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`} />
                  ))}
                </div>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write your experience..." className="w-full border rounded-lg p-3 mb-4" rows="4" />
                <button onClick={submitReview} disabled={submittingReview} className="bg-[#D4AF37] text-white px-6 py-2 rounded-lg font-semibold">
                  {submittingReview ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            )}

            {reviews.length === 0 && <p className="text-gray-500">No reviews yet.</p>}

            {reviews.map((r, i) => (
              <Review key={i} {...r} />
            ))}
          </div>

          {/* FAQ / Product Information */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Product Information</h2>

            <div className="border rounded-xl mb-4 overflow-hidden shadow-sm">
              <button onClick={() => setOpenFAQ(openFAQ === 1 ? null : 1)} className="w-full flex justify-between items-center px-6 py-4 bg-gray-50 hover:bg-gray-100 transition">
                <span className="font-semibold text-lg">How It Works</span>
                <span className={`transition-transform duration-300 ${openFAQ === 1 ? "rotate-180 text-[#D4AF37]" : ""}`}>▼</span>
              </button>
              {openFAQ === 1 && (
                <div className="px-6 py-5 bg-white text-gray-600 text-sm space-y-3">
                  <p>Bringing home the right rug is simple. Choose your design, add the features you need and let us handle everything from delivery to care — quality, comfort and convenience made easy.</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Choose your preferred design</li>
                    <li>Select size & specifications</li>
                    <li>Secure checkout process</li>
                    <li>Fast & safe delivery</li>
                    <li>Dedicated customer support</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="border rounded-xl overflow-hidden shadow-sm">
              <button onClick={() => setOpenFAQ(openFAQ === 2 ? null : 2)} className="w-full flex justify-between items-center px-6 py-4 bg-gray-50 hover:bg-gray-100 transition">
                <span className="font-semibold text-lg">Material Care</span>
                <span className={`transition-transform duration-300 ${openFAQ === 2 ? "rotate-180 text-[#D4AF37]" : ""}`}>▼</span>
              </button>
              {openFAQ === 2 && (
                <div className="px-6 py-5 bg-white text-gray-600 text-sm">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Vacuum regularly to maintain texture</li>
                    <li>Avoid prolonged direct sunlight</li>
                    <li>Professional cleaning recommended</li>
                    <li>Blot spills immediately with dry cloth</li>
                    <li>Rotate rug every 6 months for even wear</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

const Review = ({ author = "Anonymous", rating = 4, comment = "" }) => (
  <div className="border rounded-xl p-4 mb-4 bg-white shadow-sm">
    <div className="flex justify-between">
      <div className="font-semibold">{author}</div>
      <div className="text-yellow-400 flex">{[...Array(Math.floor(rating))].map((_, i) => <FaStar key={i} />)}</div>
    </div>
    <p className="text-gray-600 mt-2 text-sm">{comment}</p>
  </div>
);

export default ProductDetail;
