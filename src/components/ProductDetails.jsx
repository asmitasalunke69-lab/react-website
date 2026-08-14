import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductDetails({ addToCart }) {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(` https://backend-riqg.onrender.com/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        console.log("API Response:", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!product) {
    console.log(products);
console.log(products.length);
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-pink-200 flex justify-center items-center p-10">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-4xl flex flex-col md:flex-row gap-10">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-80 h-80 object-cover rounded-2xl"
        />

        <div>
          <h1 className="text-4xl font-bold text-purple-700">
            {product.name}
          </h1>

          <h2 className="text-2xl text-green-600 font-bold mt-4">
            ₹{product.price}
          </h2>

          <p className="mt-5 text-gray-600">
            {product.description}
          </p>

          <p className="mt-4 font-bold">
            Category : {product.category}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-bold"
          >
            🛒 Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}