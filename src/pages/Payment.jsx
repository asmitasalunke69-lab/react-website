import { useLocation, useNavigate } from "react-router-dom";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product;

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #a1c4fd, #c2e9fb)"
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
          width: "320px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          textAlign: "center"
        }}
      >
        <h1 style={{ fontSize: "22px", marginBottom: "15px" }}>
          💳 Payment
        </h1>

        {product && (
          <div
            style={{
              background: "#f9f9f9",
              padding: "15px",
              borderRadius: "12px",
              marginBottom: "20px"
            }}
          >
            <h2 style={{ marginBottom: "5px" }}>{product.name}</h2>
            <p style={{ fontWeight: "bold", color: "#555" }}>
              {product.price}
            </p>
          </div>
        )}

        <button
          onClick={() => navigate("/success")}
          style={{
            background: "linear-gradient(90deg, #667eea, #764ba2)",
            color: "#fff",
            border: "none",
            padding: "12px",
            width: "100%",
            borderRadius: "25px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            transition: "0.3s"
          }}
          onMouseOver={(e) =>
            (e.target.style.boxShadow =
              "0 0 15px #667eea, 0 0 25px #764ba2")
          }
          onMouseOut={(e) =>
            (e.target.style.boxShadow =
              "0 5px 15px rgba(0,0,0,0.2)")
          }
        >
          Confirm Order ✅
        </button>
      </div>
    </div>
  );
}