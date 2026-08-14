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
    if (!form.name || !form.email || !form.message) {
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

      // Reset form
      setForm({
        name: "",
        email: "",
        message: "",
      });
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
    <>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg,#667eea,#764ba2)",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "450px",
            padding: "35px",
            borderRadius: "25px",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(15px)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
            color: "#fff",
            animation: "fadeIn 1s ease",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "25px",
              fontSize: "28px",
              letterSpacing: "1px",
            }}
          >
            📩 Contact Us
          </h2>

          {/* Name */}
          <div style={inputBox}>
            <FaUser />

            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              style={input}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>

          {/* Email */}
          <div style={inputBox}>
            <FaEnvelope />

            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              style={input}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
          </div>

          {/* Message */}
          <div style={inputBox}>
            <FaCommentDots />

            <textarea
              placeholder="Your Message"
              rows="4"
              value={form.message}
              style={{
                ...input,
                resize: "none",
              }}
              onChange={(e) =>
                setForm({
                  ...form,
                  message: e.target.value,
                })
              }
            />
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "15px",
              background: loading
                ? "#999"
                : "linear-gradient(90deg,#ff7eb3,#ff758c)",
              border: "none",
              borderRadius: "30px",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = "scale(1.05)";
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
            }}
          >
            {loading ? "Sending..." : "Send Message 🚀"}
          </button>
        </div>
      </div>
    </>
  );
}

/* Styles */

const inputBox = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  background: "rgba(255,255,255,0.2)",
  padding: "10px 15px",
  borderRadius: "15px",
  marginBottom: "15px",
};

const input = {
  border: "none",
  outline: "none",
  background: "transparent",
  width: "100%",
  color: "#fff",
  fontSize: "14px",
};