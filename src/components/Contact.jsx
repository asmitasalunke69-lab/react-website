import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name ||!form.email ||!form.message) {
      alert("Please fill all fields ❌");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://backend-riqg.onrender.com/api/v1/contact",
        form
      );

      alert(response.data.message || "Message Sent Successfully 🚀");

      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact Error:", error);
      alert(
        error.response?.data?.message ||
          "Message send failed. Please try again ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#667eea] to-[#764ba2] p-4 md:p-6">
      <div className="w-full max-w-[450px] p-6 md:p-8 rounded-3xl bg-white/15 backdrop-blur-[15px] shadow-2xl text-white animate-fadeIn">

        <h2 className="text-center mb-6 text-2xl md:text-3xl font-bold tracking-wide">
          📩 Contact Us
        </h2>

        {/* Name */}
        <div className="flex items-center gap-3 bg-white/20 p-3 rounded-2xl mb-4">
          <FaUser className="text-lg" />
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            className="border-none outline-none bg-transparent w-full text-white placeholder-white/70 text-sm"
            onChange={(e) => setForm({...form, name: e.target.value })}
          />
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 bg-white/20 p-3 rounded-2xl mb-4">
          <FaEnvelope className="text-lg" />
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            className="border-none outline-none bg-transparent w-full text-white placeholder-white/70 text-sm"
            onChange={(e) => setForm({...form, email: e.target.value })}
          />
        </div>

        {/* Message */}
        <div className="flex items-start gap-3 bg-white/20 p-3 rounded-2xl mb-4">
          <FaCommentDots className="text-lg mt-1" />
          <textarea
            placeholder="Your Message"
            rows="4"
            value={form.message}
            className="border-none outline-none bg-transparent w-full text-white placeholder-white/70 text-sm resize-none"
            onChange={(e) => setForm({...form, message: e.target.value })}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 mt-2 rounded-full text-white font-bold transition duration-300 ${
            loading
             ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-[#ff7eb3] to-[#ff758c] hover:scale-105"
          }`}
        >
          {loading? "Sending..." : "Send Message 🚀"}
        </button>
      </div>
    </div>
  );
}