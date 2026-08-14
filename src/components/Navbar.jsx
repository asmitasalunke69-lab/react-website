import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";

function Navbar({ cart = [] }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 shadow-xl sticky top-0 z-50">

      {/* Top Bar */}
      <div className="h-16 md:h-20 px-3 md:px-8 flex items-center justify-between"> {/* px-3 kela mobile sathi */}

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-white h-10 w-10 md:h-14 md:w-14 rounded-xl flex items-center justify-center shadow-md">
            <img src="/image.png" className="h-6 md:h-10" alt="logo"/>
          </div>
          <h1 className="text-lg md:text-3xl font-extrabold text-white tracking-wide"> {/* text-lg kela */}
            ShopEase 🛍️
          </h1>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex bg-white/20 backdrop-blur-lg px-5 py-2.5 rounded-full border border-white/40 shadow-md">
          <div className="flex gap-3 font-semibold">
            <Link to="/" className="text-white px-4 py-2 rounded-full hover:bg-white hover:text-purple-600 transition duration-300">Home</Link>
            <Link to="/about" className="text-white px-4 py-2 rounded-full hover:bg-white hover:text-purple-600 transition duration-300">About</Link>
            <Link to="/products" className="text-white px-4 py-2 rounded-full hover:bg-white hover:text-purple-600 transition duration-300">Products</Link>
            <Link to="/contact" className="text-white px-4 py-2 rounded-full hover:bg-white hover:text-purple-600 transition duration-300">Contact</Link>
            <Link to="/login" className="text-white px-4 py-2 rounded-full hover:bg-white hover:text-purple-600 transition duration-300">🔐 Login</Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Search - Desktop */}
          <div className="hidden md:flex items-center bg-white rounded-full px-3 py-1 shadow-md">
            <FaSearch className="text-gray-500 mr-2" />
            <input type="text" placeholder="Search..." className="outline-none px-2 py-1 text-sm w-32 md:w-48 bg-transparent"/>
          </div>

          {/* Cart */}
          <Link to="/cart">
            <div className="relative bg-white rounded-full h-10 w-10 md:h-12 md:w-12 flex items-center justify-center text-xl shadow-md hover:scale-110 transition cursor-pointer"> {/* text-2xl hatavla */}
              🛒
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow"> {/* badge lahan kela */}
                  {cart.length}
                </span>
              )}
            </div>
          </Link>

          {/* Hamburger - Mobile */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white text-2xl p-1">
            {menuOpen? <FaTimes/> : <FaBars/>}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown - Animation add kela */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg px-4 py-4 flex-col gap-1 animate-slideDown border-t border-white/20">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-purple-600 font-semibold py-3 px-2 rounded-lg hover:bg-purple-50">Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="text-purple-600 font-semibold py-3 px-2 rounded-lg hover:bg-purple-50">About</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)} className="text-purple-600 font-semibold py-3 px-2 rounded-lg hover:bg-purple-50">Products</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="text-purple-600 font-semibold py-3 px-2 rounded-lg hover:bg-purple-50">Contact</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)} className="text-purple-600 font-semibold py-3 px-2 rounded-lg hover:bg-purple-50">🔐 Login</Link>

          {/* Search - Mobile */}
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 mt-2">
            <FaSearch className="text-gray-500 mr-2" />
            <input type="text" placeholder="Search..." className="outline-none bg-transparent w-full"/>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;