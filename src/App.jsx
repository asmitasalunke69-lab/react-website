import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import Cart from "./components/Cart.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Home from "./components/Home.jsx";
import Products from "./components/Products.jsx";
import Services from "./components/Services.jsx";
import Navbar from "./components/Navbar.jsx";
import ProductDetails from "./components/ProductDetails.jsx";

import Checkout from "./pages/Checkout.jsx";
import Address from "./pages/Address.jsx";
import Payment from "./pages/Payment.jsx";
import Success from "./pages/Success.jsx";
import Login from "./pages/Login.jsx";

export default function App() {
  const [cart, setCart] = useState([]);

  // ✅ Add to Cart (safe)
  const addToCart = async (item) => {
  if (!item) return;

  try {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first");
      return;
    }

    const response = await axios.post(
      "https://backend-riqg.onrender.com/api/v1/cart/add",
      {
        userId: userId,
        productId: item._id,
        quantity: 1,
      }
    );

    console.log("Cart saved:", response.data);

    setCart((prev) => [...prev, item]);

    alert(`${item.name} added to cart 🛒`);
  } catch (error) {
    console.error("Cart Error:", error.response?.data || error);
    alert("Unable to add product to cart");
  }
};

  // ✅ Remove from Cart
  const removeFromCart = (indexToRemove) => {
    setCart((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      {/* ✅ Navbar ला cart count */}
      <Navbar cart={cart} />

      <Routes>
        {/* ✅ Home */}
        <Route path="/" element={<Home addToCart={addToCart} />} />

        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />

        {/* ✅ Products */}
        <Route
          path="/products"
          element={<Products addToCart={addToCart} />}
        />

        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Cart */}
        <Route
          path="/cart"
          element={
            <Cart cart={cart} removeFromCart={removeFromCart} />
          }
        />

        {/* ✅ Product Details */}
        <Route
          path="/product/:id"
          element={<ProductDetails addToCart={addToCart} />}
        />

        {/* ✅ Checkout Flow */}
        <Route path="/checkout" element={<Checkout cart={cart} />} />

        {/* 🔥 IMPORTANT: address & payment ला cart pass केलं */}
        <Route path="/address" element={<Address cart={cart} />} />

        <Route path="/payment" element={<Payment cart={cart} />} />

        <Route path="/success" element={<Success />} />
      </Routes>
    </>
  );
}