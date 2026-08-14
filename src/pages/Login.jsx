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

      // Backend response मधून user ID
      const userId =
        response.data.user?._id ||
        response.data._id ||
        response.data.userId;

      if (!userId) {
        alert("Login successful but User ID not received");
        return;
      }

      // Save user ID
      localStorage.setItem("userId", userId);

      // Optional: save user data
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
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "white",
          padding: "35px",
          borderRadius: "25px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            color: "#333",
          }}
        >
          🔐 Login
        </h1>
<p> Don't have an account? <a href="/register">Sign up</a></p>
        <p
          style={{
            textAlign: "center",
            color: "#777",
            marginBottom: "25px",
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
            padding: "13px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            boxSizing: "border-box",
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
            padding: "13px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            boxSizing: "border-box",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "13px",
            border: "none",
            borderRadius: "25px",
            background:
              "linear-gradient(90deg, #667eea, #764ba2)",
            color: "white",
            fontSize: "16px",
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
            marginTop: "12px",
            padding: "12px",
            border: "none",
            borderRadius: "25px",
            background: "#eee",
            color: "#333",
            cursor: "pointer",
          }}
        >
          ← Back to Home
        </button>
      </form>
    </div>
  );
}