import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Address() {
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product; // 👈 Shop Now product

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/payment", {
      state: { product } // 👈 पुढे pass कर
    });
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-5">📍 Delivery Address</h1>

      {/* 🔥 Selected Product Show */}
      {product && (
        <div className="bg-white p-4 mb-5 rounded shadow">
          <h2 className="font-bold">{product.name}</h2>
          <p>{product.price}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4 max-w-lg">
        
        <input placeholder="Full Name" required className="w-full border p-2"
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />

        <input placeholder="Phone Number" required className="w-full border p-2"
          onChange={(e)=>setForm({...form,phone:e.target.value})}
        />

        <input placeholder="Address" required className="w-full border p-2"
          onChange={(e)=>setForm({...form,address:e.target.value})}
        />

        <input placeholder="City" required className="w-full border p-2"
          onChange={(e)=>setForm({...form,city:e.target.value})}
        />

        <input placeholder="Pincode" required className="w-full border p-2"
          onChange={(e)=>setForm({...form,pincode:e.target.value})}
        />

        <button className="w-full bg-green-500 text-white py-2 rounded">
          Continue 💳
        </button>

      </form>
    </div>
  );
}