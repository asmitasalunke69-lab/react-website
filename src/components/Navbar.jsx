import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";


function Navbar({ cart = [] }) {  // ✅ default value (IMPORTANT)

  return (
    <div className="
      h-20 
      bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 
      px-8 flex items-center justify-between shadow-xl">

      {/* Logo */}
      <div className="flex items-center gap-4">
        <div className="bg-white h-14 w-14 rounded-xl flex items-center justify-center shadow-md">
          <img src="/image.png" className="h-10" alt="logo"/>
        </div>

        <h1 className="text-3xl font-extrabold text-white tracking-wide">
          ShopEase 🛍️
        </h1>
      </div>

      {/* Nav Links */}
      <div className="
        bg-white/20 backdrop-blur-lg px-5 py-2.5 rounded-full 
        border border-white/40 shadow-md">

        <div className="flex gap-3 font-semibold">
          <Link to="/" className="text-white px-5 py-2 rounded-full hover:bg-white hover:text-purple-600 transition duration-300">Home</Link>

          <Link to="/about" className="text-white px-5 py-2 rounded-full hover:bg-white hover:text-purple-600 transition duration-300">About</Link>

          <Link to="/products" className="text-white px-5 py-2 rounded-full hover:bg-white hover:text-purple-600 transition duration-300">Products</Link>

          <Link to="/contact" className="text-white px-5 py-2 rounded-full hover:bg-white hover:text-purple-600 transition duration-300">Contact</Link>
       <Link
  to="/login"
  className="text-white px-5 py-2 rounded-full hover:bg-white hover:text-purple-600 transition duration-300"
>
  🔐 Login
</Link>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {/* 🔍 Search */}
        <div className="flex items-center bg-white rounded-full px-3 py-1 shadow-md">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="outline-none px-2 py-1 text-sm w-32 md:w-48"
          />
        </div>

        {/* 🛒 Cart */}
        <Link to="/cart">
          <div className="relative bg-white rounded-full h-12 w-12 flex items-center justify-center text-2xl shadow-md hover:scale-110 transition cursor-pointer">
            🛒

            {/* 🔴 Count */}
            {cart.length > 0 && (
              <span className="
                absolute -top-2 -right-2 
                bg-red-500 text-white text-xs font-bold 
                px-2 py-0.5 rounded-full shadow">
                {cart.length}
              </span>
            )}
          </div>
        </Link>

      </div>
    </div>
  );
}

export default Navbar;