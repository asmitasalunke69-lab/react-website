
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://backend-riqg.onrender.com/api/v1/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Products error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f6f8] text-gray-900">

      {/* OFFER BAR */}
      <div className="bg-[#111827] text-white text-center text-xs sm:text-sm py-2">
        Free delivery on selected orders • Easy returns • Secure payments
      </div>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pt-5">
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm border">

          <div className="grid md:grid-cols-2 min-h-[320px]">

            {/* LEFT */}
            <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">

              <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">
                New Collection • 2026
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mt-3">
                Everything you need,
                <br />
                all in one place.
              </h1>

              <p className="text-gray-500 text-sm md:text-base mt-4 max-w-xl">
                Discover electronics, fashion, home essentials and
                everyday products at great prices.
              </p>

              <div className="flex gap-3 mt-6">

                <Link
                  to="/products"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                >
                  Shop Now
                </Link>

                <Link
                  to="/products"
                  className="bg-white border border-gray-300 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-50 transition"
                >
                  View Products
                </Link>

              </div>

            </div>

            {/* RIGHT IMAGE */}
            <div className="relative hidden md:flex items-center justify-center bg-[#eef3ff] overflow-hidden">

              <div className="absolute w-72 h-72 bg-blue-300/30 rounded-full blur-3xl" />

              <img
                src="https://cdn.shopify.com/b/shopify-brochure2-assets/327b68d9e723dd05c19fbac7d8f3e84b.png"
                alt="Shopping"
                className="relative w-[85%] max-w-md object-contain"
              />

            </div>

          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-10">

        <div className="flex items-end justify-between mb-5">

          <div>
            <p className="text-blue-600 text-xs font-bold uppercase tracking-wider">
              Trending Now
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mt-1">
              Featured Products
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Popular products picked for you
            </p>
          </div>

          <Link
            to="/products"
            className="hidden sm:block text-blue-600 text-sm font-semibold hover:underline"
          >
            View All →
          </Link>

        </div>

        {/* LOADING */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl border animate-pulse overflow-hidden"
              >
                <div className="h-52 bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-5 bg-gray-200 rounded w-1/2" />
                  <div className="h-10 bg-gray-200 rounded" />
                </div>
              </div>
            ))}

          </div>
        )}

        {/* PRODUCTS */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {products.slice(0, 8).map((item) => (

              <div
                key={item._id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >

                {/* IMAGE */}
                <div className="relative h-48 sm:h-52 bg-gray-50 flex items-center justify-center overflow-hidden">

                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />

                  {item.stock > 0 && (
                    <span className="absolute top-3 left-3 bg-white/95 shadow-sm text-green-600 text-[10px] font-bold px-2 py-1 rounded">
                      IN STOCK
                    </span>
                  )}

                </div>

                {/* INFO */}
                <div className="p-4">

                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide">
                    {item.category}
                  </p>

                  <h3 className="font-semibold text-sm sm:text-base mt-1 truncate">
                    {item.name}
                  </h3>

                  <p className="text-xs text-gray-400 mt-1 truncate">
                    {item.artisan || "ShopEasy"}
                  </p>

                  {/* RATING */}
                  <div className="flex items-center gap-2 mt-3">

                    <span className="bg-green-600 text-white text-[10px] px-2 py-1 rounded">
                      ★ 4.5
                    </span>

                    <span className="text-[10px] text-gray-400">
                      100+ ratings
                    </span>

                  </div>

                  {/* PRICE */}
                  <div className="flex items-center gap-2 mt-3">

                    <span className="text-lg font-bold">
                      ₹{item.price}
                    </span>

                    <span className="text-xs text-gray-400 line-through">
                      ₹{Math.round(item.price * 1.2)}
                    </span>

                    <span className="text-[10px] text-green-600 font-bold">
                      20% OFF
                    </span>

                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={() => addToCart(item)}
                    disabled={item.stock <= 0}
                    className={`w-full mt-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                      item.stock > 0
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {item.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

        {/* MOBILE VIEW ALL */}
        <div className="text-center mt-6 sm:hidden">
          <Link
            to="/products"
            className="text-blue-600 font-semibold text-sm"
          >
            View All Products →
          </Link>
        </div>

      </section>

      {/* DEAL SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-12">

        <div className="rounded-2xl overflow-hidden bg-gray-900 text-white">

          <div className="grid md:grid-cols-2">

            <div className="p-8 md:p-10">

              <p className="text-orange-400 text-xs font-bold uppercase tracking-wider">
                Limited Time Offer
              </p>

              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                Great products.
                <br />
                Better prices.
              </h2>

              <p className="text-gray-400 text-sm mt-3 max-w-md">
                Explore our latest products and find something you'll love.
              </p>

              <Link
                to="/products"
                className="inline-block mt-6 bg-white text-gray-900 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-100 transition"
              >
                Explore Deals
              </Link>

            </div>

            <div className="bg-gradient-to-br from-orange-100 to-yellow-50 flex items-center justify-center p-8">

              <div className="text-center">

                <p className="text-6xl font-black text-orange-600">
                  20%
                </p>

                <p className="text-gray-700 font-bold text-sm mt-2">
                  OFF SELECTED PRODUCTS
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* TRUST */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-10">

        <div className="bg-white border rounded-2xl grid grid-cols-2 md:grid-cols-4">

          <div className="p-5 text-center border-b md:border-b-0 md:border-r">
            <div className="text-2xl">🚚</div>
            <h3 className="font-bold text-sm mt-2">
              Fast Delivery
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Quick doorstep delivery
            </p>
          </div>

          <div className="p-5 text-center border-b md:border-b-0 md:border-r">
            <div className="text-2xl">🔒</div>
            <h3 className="font-bold text-sm mt-2">
              Secure Payment
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Safe & secure checkout
            </p>
          </div>

          <div className="p-5 text-center border-r">
            <div className="text-2xl">⭐</div>
            <h3 className="font-bold text-sm mt-2">
              Quality Products
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Carefully selected
            </p>
          </div>

          <div className="p-5 text-center">
            <div className="text-2xl">↩️</div>
            <h3 className="font-bold text-sm mt-2">
              Easy Returns
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Hassle-free returns
            </p>
          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-[#111827] text-gray-400 mt-12">

        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            <div className="col-span-2 md:col-span-1">

              <h2 className="text-2xl font-bold text-white">
                ShopEase
              </h2>

              <p className="text-sm leading-6 mt-3">
                Your everyday shopping destination for quality products
                at great prices.
              </p>

            </div>

            <div>

              <h3 className="text-white font-semibold">
                Shop
              </h3>

              <Link
                to="/"
                className="block text-sm mt-4 hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/products"
                className="block text-sm mt-3 hover:text-white"
              >
                Products
              </Link>

            </div>

            <div>

              <h3 className="text-white font-semibold">
                Help
              </h3>

              <Link
                to="/contact"
                className="block text-sm mt-4 hover:text-white"
              >
                Contact Us
              </Link>

              <p className="text-sm mt-3">
                Shipping
              </p>

              <p className="text-sm mt-3">
                Returns
              </p>

            </div>

            <div>

              <h3 className="text-white font-semibold">
                Contact
              </h3>

              <p className="text-sm mt-4">
                shopeasy@gmail.com
              </p>

              <p className="text-sm mt-3">
                📞 9876543210
              </p>

              <p className="text-sm mt-3">
                📍 Pune, Maharashtra
              </p>

            </div>

          </div>

          <div className="border-t border-gray-800 mt-8 pt-5 text-center text-xs">
            © 2026 ShopEase. All Rights Reserved.
          </div>

        </div>

      </footer>

    </div>
  );
}
