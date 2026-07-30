import React from "react";
import Navbar from "./Navbar";
export default function Contact() {
  return (
    <div
      style={{minHeight: "100vh",display: "flex", justifyContent: "center", alignItems: "center",
        background: ` linear-gradient(135deg, #c3cfe2, #f5f7fa),
          url("https://www.transparenttextures.com/patterns/cubes.png")
        `,
        backgroundBlendMode: "overlay",
        padding: "20px"
      }}
    >
      <div
        style={{
        width: "420px",padding: "30px", borderRadius: "20px", background: "rgba(255,255,255,0.85)",backdropFilter: "blur(12px)", boxShadow: "0 15px 40px rgba(0,0,0,0.2)"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Contact Us 📩
        </h2>

        <input type="text" placeholder="Your Name" style={inputStyle} />
        <input type="email" placeholder="Your Email" style={inputStyle} />
        <textarea placeholder="Your Message" rows="4" style={inputStyle}></textarea>

        <button
          style={{
            width: "100%",padding: "12px", marginTop: "10px",  background: "linear-gradient(90deg, #667eea, #764ba2)", 
            border: "none",borderRadius: "25px",color: "#fff",fontSize: "16px",fontWeight: "bold",cursor: "pointer"
          }}
        >
          Send Message 🚀
        </button>
      </div>
    </div>
  );
}


const inputStyle = { width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "12px",
  border: "1px solid #ddd", outline: "none",fontSize: "14px", background: "#f9f9f9"
};