import { useNavigate } from "react-router-dom";

export default function Checkout({ cart }) {
  const navigate = useNavigate();

  // ✅ Total calculate
  const totalPrice = cart.reduce((total, item) => {
    return total + parseInt(item.price);
  }, 0);

  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6 text-center">
        🧾 Order Summary
      </h1>

      {cart.length === 0 ? (
        <h2 className="text-center text-xl">Cart is Empty</h2>
      ) : (
        <>
          {/* ✅ Items */}
          <div className="grid md:grid-cols-3 gap-6">
            {cart.map((item, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow">
                
                <img
                  src={item.image || item.img}
                  className="h-32 w-full object-cover"
                />

                <h2 className="font-bold mt-2">{item.name}</h2>
                <p className="text-green-600">{item.price}</p>

              </div>
            ))}
          </div>

          {/* ✅ Total */}
          <h2 className="text-2xl font-bold mt-8 text-center">
            Total: ₹ {totalPrice}
          </h2>

          {/* ✅ Button */}
          <div className="text-center mt-6">
            <button
              onClick={() => navigate("/address")}
              className="bg-green-500 text-white px-6 py-3 rounded-lg"
            >
              Proceed to Address 📍
            </button>
          </div>
        </>
      )}
    </div>
  );
}