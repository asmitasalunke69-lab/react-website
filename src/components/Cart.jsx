import { useNavigate } from "react-router-dom";

export default function Cart({ cart = [], removeFromCart }) {
  const navigate = useNavigate();

  const getTotal = () => {
    return cart.reduce((total, item) => {
      return total + Number(item.price || 0);
    }, 0);
  };

  return (
    <div
      className="min-h-screen p-10"
      style={{
        background:
          "linear-gradient(135deg, #e0f7fa, #e1bee7, #fce4ec)",
      }}
    >
      <h1 className="text-3xl font-bold text-center mb-10">
        🛒 Your Cart
      </h1>

      {cart.length === 0 ? (
        <h2 className="text-center text-xl">
          Cart is Empty
        </h2>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-8">
            {cart.map((item, index) => (
              <div
                key={item._id || index}
                className="bg-white p-5 rounded-xl shadow-lg text-center"
              >
                {/* Product Image */}
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-40 w-full object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />

                {/* Product Name */}
                <h2 className="text-lg font-bold mt-3">
                  {item.name}
                </h2>

                {/* Price */}
                <p className="text-green-600 font-bold text-lg">
                  ₹{Number(item.price || 0)}
                </p>

                {/* Category */}
                {item.category && (
                  <p className="text-gray-500 mt-1">
                    {item.category}
                  </p>
                )}

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(index)}
                  className="mt-3 px-5 py-2 rounded-full font-semibold shadow-md transition duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, #fdfbfb, #ebedee)",
                    color: "#333",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 15px rgba(0,0,0,0.15)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 3px 10px rgba(0,0,0,0.1)";
                  }}
                >
                  ❌ Remove
                </button>

                <br />

                {/* Shop Now */}
                <button
                  onClick={() =>
                    navigate("/address", {
                      state: { product: item },
                    })
                  }
                  className="mt-3 px-6 py-2 rounded-full font-bold shadow-md transition duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
                    color: "#333",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.07)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 15px rgba(0,0,0,0.15)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 3px 10px rgba(0,0,0,0.1)";
                  }}
                >
                  🛒 Shop Now
                </button>
              </div>
            ))}
          </div>

          {/* Total */}
          <div
            className="mt-10 mx-auto max-w-md bg-white p-6 rounded-2xl shadow-lg text-center"
          >
            <h2 className="text-2xl font-bold">
              Total: ₹{getTotal()}
            </h2>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-5 px-8 py-3 rounded-full text-white font-bold"
              style={{
                background:
                  "linear-gradient(90deg, #667eea, #764ba2)",
              }}
            >
              Proceed to Checkout 💳
            </button>
          </div>
        </>
      )}
    </div>
  );
}