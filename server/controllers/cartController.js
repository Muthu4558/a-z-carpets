import Cart from '../models/Cart.js';
import Product from '../models/productModel.js';

// GET cart
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })
    .populate("items.product");
  res.json(cart || { items: [] });
};

// ADD to cart

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, selectedSize = null } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    const qty = Number(quantity);

    // 1️⃣ Exact match (same product + same size)
    const exactItem = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        (item.selectedSize || null) === (selectedSize || null)
    );

    if (exactItem) {
      // Normal increase
      exactItem.quantity += qty;
    } else {
      // 2️⃣ If selecting size for an existing no-size product
      if (selectedSize) {
        const nullSizeItem = cart.items.find(
          (item) =>
            item.product.toString() === productId &&
            (!item.selectedSize || item.selectedSize === null)
        );

        if (nullSizeItem) {
          // ✅ UPDATE SIZE ONLY
          nullSizeItem.selectedSize = selectedSize;

          // ❌ DO NOT increase quantity
          nullSizeItem.quantity = qty;  // keep as 1
        } else {
          // New sized item
          cart.items.push({
            product: productId,
            quantity: qty,
            selectedSize,
          });
        }
      } else {
        // No size product
        const existingNull = cart.items.find(
          (item) =>
            item.product.toString() === productId &&
            (!item.selectedSize || item.selectedSize === null)
        );

        if (existingNull) {
          existingNull.quantity += qty;
        } else {
          cart.items.push({
            product: productId,
            quantity: qty,
            selectedSize: null,
          });
        }
      }
    }

    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate("items.product");

    res.json(updatedCart);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add to cart" });
  }
};

// UPDATE quantity
export const updateCartItemQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });
  const idx = cart.items.findIndex(item => item.product.toString() === productId);
  if (idx > -1) {
    cart.items[idx].quantity = quantity;
    await cart.save();
    res.json(cart);
  } else {
    res.status(404).json({ message: "Item not found in cart" });
  }
};

// REMOVE item
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });
  cart.items = cart.items.filter(item => item.product.toString() !== productId);
  await cart.save();
  res.json(cart);
};

// CLEAR cart
export const clearCart = async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });
  cart.items = [];
  await cart.save();
  res.json(cart);
};

// CHECKOUT 
export const checkoutCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  cart.items = [];
  await cart.save();
  res.json({ message: "Checkout successful" });
};