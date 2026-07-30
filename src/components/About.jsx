import React from "react";

export default function About() {
  return (
   <div className="min-h-screen w-full bg-gradient-to-br from-[#dbeafe] via-[#e0c3fc] to-[#fbc2eb]">
      <section className="h-[300px] flex items-center justify-center relative overflow-hidden rounded-b-3xl border-4 border-blue-100"
        style={{
          backgroundImage:
            "url(https://static.vecteezy.com/system/resources/previews/003/240/364/non_2x/shopping-online-on-phone-paper-art-modern-pink-background-gifts-box-free-vector.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className=" relative text-center text-white">
          <h1 className="text-5xl font-extrabold tracking-wide">
            About ShopEase 🛍️
          </h1>
          <p className="mt-3 text-lg text-gray-200">
            Making Online Shopping Simple & Stylish
          </p>
        </div>
      </section>


      <section className="px-10 py-12 text-center">

        <h2 className="text-3xl font-bold text-purple-700">
          Who We Are
        </h2>

        <p className="mt-5 max-w-3xl mx-auto text-gray-600 leading-7">
          ShopEase is a modern e-commerce platform designed for a smooth and
          premium shopping experience. We bring you the latest fashion,
          electronics and accessories at affordable prices with fast delivery
          and secure payments.
        </p>

      </section>



    
<div className="py-16 px-6 bg-gradient-to-r from-blue-50 to-purple-100">
  <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
    Why Choose Us
  </h2>

  <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
  
    <div className="bg-white rounded-2xl border-2 border-black shadow-lg p-6 hover:scale-105 transition duration-300">
      <div className="text-5xl mb-4">🚚</div>
      <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
      <p className="text-gray-600">
        Get your products delivered quickly and safely at your doorstep with our lightning-fast delivery service.
      </p>
    </div>

    <div className="bg-white rounded-2xl border-2 border-black shadow-lg p-6 hover:scale-105 transition duration-300">
      <div className="text-5xl mb-4">🔒</div>
      <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
      <p className="text-gray-600">
        Your transactions are 100% safe and protected with advanced encryption and secure payment gateways.
      </p>
    </div>

  </div>
</div>

      <section className="
      grid md:grid-cols-2 gap-10 items-center px-10 pb-16">
        <img
          src="https://images.unsplash.com/photo-1515168833906-d2a3b82b302a"
          className="rounded-3xl shadow-2xl hover:scale-105 duration-300  " alt="shopping" />

        <div>
          <h2 className="text-3xl font-bold text-purple-700">
            Why Choose Us?
          </h2>

          <p className="mt-4 text-gray-600 leading-7">
            We provide a seamless and enjoyable shopping experience with a
            modern design, smooth performance and customer-first approach.
          </p>

          <ul className="mt-5 space-y-3 text-gray-700">
            <li>✔ Wide product range</li>
            <li>✔ Best price deals</li>
            <li>✔ Easy return policy</li>
            <li>✔ 24/7 support</li>
          </ul>
        </div>
      </section>

      <section className="mx-10 mb-12 p-10 rounded-3xl text-center text-white bg-gradient-to-r from-purple-600 to-pink-500 shadow-xl
      ">
        <h2 className="text-3xl font-bold">
          Ready To Start Shopping?
        </h2>

        <p className="mt-3 text-gray-100">
          Explore our amazing collection and grab best deals now!
        </p>

        <button className=" mt-5 bg-white text-purple-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-200">
 Shop Now → </button>
    </section>

      <footer className="bg-gradient-to-r from-blue-900 via-purple-800 to-pink-700 text-white p-10 text-center ">
        <h2 className="text-2xl font-bold">
          ShopEase 🛍️
        </h2>

        <p className="mt-2">
          Premium Shopping Experience
        </p>

        <p className="mt-4 text-sm">
          © 2026 All Rights Reserved
        </p>

      </footer>


    </div>
  );
}