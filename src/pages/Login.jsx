import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "https://backend-riqg.onrender.com/api/v1/users/login",
        formData
      );

      console.log("LOGIN RESPONSE:", response.data);

      const userId =
        response.data.user?._id ||
        response.data._id ||
        response.data.userId;

      if (!userId) {
        alert("Login successful but User ID not received");
        return;
      }

      localStorage.setItem("userId", userId);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user || response.data)
      );

      alert("Login Successful! 🎉");
      navigate("/products");
    } catch (error) {
      console.error(
        "LOGIN ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #667eea, #764ba2)",
        padding: "12px", // 20px > 12px
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: "380px", // 420px > 380px
          background: "white",
          padding: "25px", // 35px > 25px
          borderRadius: "20px", // 25px > 20px
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "8px",
            color: "#333",
            fontSize: "24px" // font kami kela
          }}
        >
          🔐 Login
        </h1>
        <p style={{textAlign: "center", marginBottom: "15px"}}> Don't have an account? <a href="/register" style={{color: "#667eea", fontWeight: "600"}}>Sign up</a></p>
        <p
          style={{
            textAlign: "center",
            color: "#777",
            marginBottom: "20px", // 25px > 20px
            fontSize: "14px" // font kami
          }}
        >
          Login to continue shopping
        </p>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px", // 13px > 12px
            marginBottom: "12px", // 15px > 12px
            borderRadius: "8px", // 10px > 8px
            border: "1px solid #ddd",
            boxSizing: "border-box",
            fontSize: "14px"
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "18px", // 20px > 18px
            borderRadius: "8px",
            border: "1px solid #ddd",
            boxSizing: "border-box",
            fontSize: "14px"
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px", // 13px > 12px
            border: "none",
            borderRadius: "20px", // 25px > 20px
            background:
              "linear-gradient(90deg, #667eea, #764ba2)",
            color: "white",
            fontSize: "15px", // 16px > 15px
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {loading ? "Logging in..." : "🔐 Login"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          style={{
            width: "100%",
            marginTop: "10px", // 12px > 10px
            padding: "11px", // 12px > 11px
            border: "none",
            borderRadius: "20px",
            background: "#eee",
            color: "#333",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          ← Back to Home
        </button>
      </form>
    </div>
  );
}