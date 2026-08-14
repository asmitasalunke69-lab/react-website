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
      className="min-h-screen p-4 md:p-10"
      style={{
        background:
          "linear-gradient(135deg, #e0f7fa, #e1bee7, #fce4ec)",
      }}
    >
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-10">
        🛒 Your Cart
      </h1>

      {cart.length === 0 ? (
        <h2 className="text-center text-lg md:text-xl">
          Cart is Empty
        </h2>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
            {cart.map((item, index) => (
              <div
                key={item._id || index}
                className="bg-white p-4 md:p-5 rounded-xl shadow-lg text-center"
              >
                {/* Product Image */}
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-32 md:h-40 w-full object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />

                {/* Product Name */}
                <h2 className="text-base md:text-lg font-bold mt-2 md:mt-3">
                  {item.name}
                </h2>

                {/* Price */}
                <p className="text-green-600 font-bold text-base md:text-lg">
                  ₹{Number(item.price || 0)}
                </p>

                {/* Category */}
                {item.category && (
                  <p className="text-gray-500 mt-1 text-sm">
                    {item.category}
                  </p>
                )}

                {/* Buttons */}
                <div className="flex flex-col gap-2 mt-3">
                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(index)}
                    className="w-full px-4 py-2 rounded-full font-semibold shadow-md transition duration-300 text-sm md:text-base"
                    style={{
                      background:
                        "linear-gradient(135deg, #fdfbfb, #ebedee)",
                      color: "#333",
                    }}
                  >
                    ❌ Remove
                  </button>

                  {/* Shop Now */}
                  <button
                    onClick={() =>
                      navigate("/address", {
                        state: { product: item },
                      })
                    }
                    className="w-full px-4 py-2 rounded-full font-bold shadow-md transition duration-300 text-sm md:text-base"
                    style={{
                      background:
                        "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
                      color: "#333",
                    }}
                  >
                    🛒 Shop Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div
            className="mt-6 md:mt-10 mx-auto max-w-md bg-white p-5 md:p-6 rounded-2xl shadow-lg text-center"
          >
            <h2 className="text-xl md:text-2xl font-bold">
              Total: ₹{getTotal()}
            </h2>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-4 md:mt-5 w-full md:w-auto px-6 md:px-8 py-2 md:py-3 rounded-full text-white font-bold text-sm md:text-base"
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