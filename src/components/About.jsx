import React from "react";

export default function About() {
  return (
   <div className="min-h-screen w-full bg-gradient-to-br from-[#dbeafe] via-[#e0c3fc] to-[#fbc2eb]">

      {/* Hero Section - Height ani Text lahan kela mobile sathi */}
      <section className="h-[220px] md:h-[300px] flex items-center justify-center relative overflow-hidden rounded-b-3xl border-4 border-blue-100"
        style={{
          backgroundImage:
            "url(https://static.vecteezy.com/system/resources/previews/003/240/364/non_2x/shopping-online-on-phone-paper-art-modern-pink-background-gifts-box-free-vector.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide">
            About ShopEase 🛍️
          </h1>
          <p className="mt-2 md:mt-3 text-base md:text-lg text-gray-200">
            Making Online Shopping Simple & Stylish
          </p>
        </div>
      </section>

      {/* Who We Are - padding kami kela */}
      <section className="px-6 md:px-10 py-10 md:py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-700">
          Who We Are
        </h2>
        <p className="mt-4 md:mt-5 max-w-3xl mx-auto text-gray-600 leading-7 text-sm md:text-base">
          ShopEase is a modern e-commerce platform designed for a smooth and
          premium shopping experience. We bring you the latest fashion,
          electronics and accessories at affordable prices with fast delivery
          and secure payments.
        </p>
      </section>

      {/* Why Choose Us */}
      <div className="py-12 md:py-16 px-4 md:px-6 bg-gradient-to-r from-blue-50 to-purple-100">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10 text-gray-800">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl border-2 border-black shadow-lg p-5 md:p-6 hover:scale-105 transition duration-300">
            <div className="text-4xl md:text-5xl mb-3 md:mb-4">🚚</div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Fast Delivery</h3>
            <p className="text-gray-600 text-sm md:text-base">
              Get your products delivered quickly and safely at your doorstep with our lightning-fast delivery service.
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-black shadow-lg p-5 md:p-6 hover:scale-105 transition duration-300">
            <div className="text-4xl md:text-5xl mb-3 md:mb-4">🔒</div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Secure Payment</h3>
            <p className="text-gray-600 text-sm md:text-base">
              Your transactions are 100% safe and protected with advanced encryption and secure payment gateways.
            </p>
          </div>
        </div>
      </div>

      {/* Image + Text Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center px-6 md:px-10 pb-12 md:pb-16">
        <img
          src="https://images.unsplash.com/photo-1515168833906-d2a3b82b302a"
          className="rounded-3xl shadow-2xl hover:scale-105 duration-300 w-full" alt="shopping" />

        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-700">
            Why Choose Us?
          </h2>
          <p className="mt-3 md:mt-4 text-gray-600 leading-7 text-sm md:text-base">
            We provide a seamless and enjoyable shopping experience with a
            modern design, smooth performance and customer-first approach.
          </p>
          <ul className="mt-4 md:mt-5 space-y-2 md:space-y-3 text-gray-700 text-sm md:text-base">
            <li>✔ Wide product range</li>
            <li>✔ Best price deals</li>
            <li>✔ Easy return policy</li>
            <li>✔ 24/7 support</li>
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-4 md:mx-10 mb-10 md:mb-12 p-6 md:p-10 rounded-3xl text-center text-white bg-gradient-to-r from-purple-600 to-pink-500 shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold">
          Ready To Start Shopping?
        </h2>
        <p className="mt-2 md:mt-3 text-gray-100 text-sm md:text-base">
          Explore our amazing collection and grab best deals now!
        </p>
        <button className="mt-4 md:mt-5 bg-white text-purple-700 px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold hover:bg-gray-200 text-sm md:text-base">
          Shop Now →
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 via-purple-800 to-pink-700 text-white p-6 md:p-10 text-center ">
        <h2 className="text-xl md:text-2xl font-bold">
          ShopEase 🛍️
        </h2>
        <p className="mt-1 md:mt-2 text-sm">
          Premium Shopping Experience
        </p>
        <p className="mt-3 md:mt-4 text-xs md:text-sm">
          © 2026 All Rights Reserved
        </p>
      </footer>
    </div>
  );
}