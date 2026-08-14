import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaEye,
  FaCheck,
  FaSpinner,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [addedId, setAddedId] = useState(null);

  // LocalStorage support for Wishlist
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Fetch Products
  useEffect(() => {
    const controller = new AbortController();

    axios
      .get("https://backend-riqg.onrender.com/api/v1/products", {
        signal: controller.signal,
      })
      .then((res) => {
        setProducts(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        console.error("Products Error:", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  // -----------------------------------------------------------
  // CHANGE: "All" chya samor fakt 6 unique categories dakhvlyatil
  // -----------------------------------------------------------
  const categories = useMemo(() => {
    const allCategories = products
      .map((product) => product.category)
      .filter(Boolean);

    const uniqueCategories = Array.from(new Set(allCategories)).slice(0, 6);

    return ["All", ...uniqueCategories];
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter(
      (product) =>
        product.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [products, selectedCategory]);

  const handleAddToCart = (product) => {
    if (addToCart) addToCart(product);

    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculateOldPrice = (price) => Math.round(Number(price || 0) * 1.25);

  const calculateDiscount = (price) => {
    const oldPrice = calculateOldPrice(price);
    if (!oldPrice || !price) return 0;
    return Math.round(((oldPrice - price) / oldPrice) * 100);
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .products-page { background: #f6f7f9; min-height: 100vh; padding-bottom: 60px; font-family: Arial, sans-serif; }
        .products-header { background: white; padding: 38px 9% 34px; border-bottom: 1px solid #e5e7eb; }
        .products-header-inner { max-width: 1250px; margin: auto; display: flex; justify-content: space-between; align-items: flex-end; }
        .small-title { color: #2563eb; font-size: 14px; font-weight: 800; letter-spacing: 1.5px; margin-bottom: 10px; }
        .products-header h1 { margin: 0; color: #111827; font-size: 42px; font-weight: 800; letter-spacing: -1px; }
        .products-header p { margin: 10px 0 0; color: #6b7280; font-size: 16px; }
        .product-count { color: #374151; font-size: 15px; padding-bottom: 4px; }
        .product-count strong { color: #111827; font-size: 16px; }
        .products-container { max-width: 1250px; margin: 28px auto 0; padding: 0 20px; }
        .category-box { background: white; border: 1px solid #e5e7eb; border-radius: 15px; padding: 13px; display: flex; gap: 9px; overflow-x: auto; margin-bottom: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.03); }
        .category-box::-webkit-scrollbar { height: 4px; }
        .category-box::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 20px; }
        .category-btn { border: none; background: #f8fafc; color: #374151; padding: 12px 22px; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; white-space: nowrap; transition: 0.25s; }
        .category-btn:hover { background: #eef2ff; color: #2563eb; }
        .category-btn.active { background: #2563eb; color: white; box-shadow: 0 5px 12px rgba(37, 99, 235, 0.25); }
        .products-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; }
        .product-card { background: white; border: 1px solid #e5e7eb; border-radius: 15px; overflow: hidden; position: relative; transition: all 0.28s ease; min-width: 0; }
        .product-card:hover { transform: translateY(-5px); box-shadow: 0 14px 35px rgba(0,0,0,0.10); border-color: #dbe3ef; }
        .product-image-box { height: 250px; background: #f3f4f6; position: relative; overflow: hidden; }
        .product-image { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.45s ease; }
        .product-card:hover .product-image { transform: scale(1.05); }
        .category-label { position: absolute; top: 13px; left: 13px; background: rgba(255,255,255,0.95); color: #374151; font-size: 11px; font-weight: 800; padding: 7px 10px; border-radius: 5px; text-transform: uppercase; z-index: 2; }
        .wishlist-btn { position: absolute; right: 13px; top: 13px; width: 35px; height: 35px; border: none; border-radius: 50%; background: rgba(255,255,255,0.95); color: #9ca3af; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 3; transition: 0.2s; }
        .wishlist-btn:hover, .wishlist-btn.liked { color: #ef4444; }
        .product-info { padding: 19px 17px 18px; }
        .product-name { color: #111827; font-size: 18px; font-weight: 700; margin: 0 0 7px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .product-description { color: #9ca3af; font-size: 13px; margin-bottom: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .rating-row { display: flex; align-items: center; gap: 7px; margin-bottom: 14px; }
        .rating { background: #16a34a; color: white; padding: 6px 8px; border-radius: 4px; font-size: 12px; font-weight: 700; display: flex; align-items: center; gap: 4px; }
        .rating-star { font-size: 10px; }
        .rating-text { color: #9ca3af; font-size: 12px; }
        .price-row { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 7px; }
        .current-price { font-size: 21px; color: #111827; font-weight: 800; }
        .old-price { color: #9ca3af; text-decoration: line-through; font-size: 13px; }
        .discount { color: #16a34a; font-size: 12px; font-weight: 800; }
        .stock { color: #16a34a; font-size: 13px; margin-bottom: 15px; display: flex; align-items: center; gap: 5px; }
        .out-stock { color: #dc2626; }
        .card-buttons { display: flex; gap: 8px; }
        .add-cart-btn { flex: 1; border: none; border-radius: 8px; padding: 11px 8px; background: #2563eb; color: white; font-size: 13px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 7px; transition: 0.25s; }
        .add-cart-btn:hover { background: #1d4ed8; transform: translateY(-1px); }
        .add-cart-btn:disabled { background: #9ca3af; cursor: not-allowed; }
        .add-cart-btn.added { background: #16a34a; }
        .details-btn { width: 43px; border: 1px solid #dbe0e7; background: white; color: #374151; border-radius: 8px; display: flex; justify-content: center; align-items: center; text-decoration: none; transition: 0.2s; }
        .details-btn:hover { background: #f3f4f6; color: #2563eb; }
        .loading-container, .error-container { min-height: 450px; display: flex; flex-direction: column; justify-content: center; align-items: center; color: #6b7280; gap: 12px; }
        .loading-icon { font-size: 30px; color: #2563eb; animation: spin 1s linear infinite; }
        .error-icon { font-size: 30px; color: #dc2626; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .empty-products { background: white; border-radius: 15px; padding: 70px 20px; text-align: center; color: #6b7280; border: 1px solid #e5e7eb; }
        .empty-products h3 { color: #111827; margin-bottom: 8px; }
        @media (max-width: 1100px) { .products-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 800px) { .products-header { padding: 30px 20px; } .products-header-inner { align-items: flex-start; flex-direction: column; gap: 15px; } .products-header h1 { font-size: 34px; } .products-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 520px) { .products-container { padding: 0 12px; } .products-grid { grid-template-columns: 1fr; } .product-image-box { height: 280px; } }
      `}</style>

      <div className="products-page">
        {/* HEADER */}
        <section className="products-header">
          <div className="products-header-inner">
            <div>
              <div className="small-title">SHOPEASY STORE</div>
              <h1>All Products</h1>
              <p>Discover products you'll love at great prices.</p>
            </div>
            <div className="product-count">
              <strong>{filteredProducts.length}</strong> products
            </div>
          </div>
        </section>

        {/* MAIN BODY */}
        <main className="products-container">
          {/* CATEGORY FILTER */}
          {!loading && !error && products.length > 0 && (
            <div className="category-box">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-btn ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* LOADING */}
          {loading && (
            <div className="loading-container">
              <FaSpinner className="loading-icon" />
              <span>Loading products...</span>
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="error-container">
              <FaExclamationTriangle className="error-icon" />
              <span>{error}</span>
            </div>
          )}

          {/* PRODUCTS GRID */}
          {!loading && !error && filteredProducts.length > 0 && (
            <div className="products-grid">
              {filteredProducts.map((product) => {
                const price = Number(product.price || 0);
                const oldPrice = calculateOldPrice(price);
                const discount = calculateDiscount(price);
                const rating = product.rating || 4.5;
                const ratingCount = product.ratingCount || "100+";
                const inStock =
                  product.stock === undefined || Number(product.stock) > 0;

                return (
                  <div className="product-card" key={product._id}>
                    {/* IMAGE */}
                    <div className="product-image-box">
                      <span className="category-label">
                        {product.category || "Product"}
                      </span>

                      <button
                        className={`wishlist-btn ${
                          wishlist.includes(product._id) ? "liked" : ""
                        }`}
                        onClick={() => toggleWishlist(product._id)}
                      >
                        <FaHeart />
                      </button>

                      <img
                        src={
                          product.imageUrl ||
                          "https://via.placeholder.com/600x600?text=Product"
                        }
                        alt={product.name}
                        className="product-image"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/600x600?text=Product";
                        }}
                      />
                    </div>

                    {/* DETAILS */}
                    <div className="product-info">
                      <h2 className="product-name">{product.name}</h2>
                      <div className="product-description">
                        {product.description || "Premium quality product"}
                      </div>

                      {/* RATING */}
                      <div className="rating-row">
                        <span className="rating">
                          {rating} <FaStar className="rating-star" />
                        </span>
                        <span className="rating-text">
                          {ratingCount} ratings
                        </span>
                      </div>

                      {/* PRICE */}
                      <div className="price-row">
                        <span className="current-price">
                          ₹{price.toLocaleString("en-IN")}
                        </span>
                        {oldPrice > price && (
                          <>
                            <span className="old-price">
                              ₹{oldPrice.toLocaleString("en-IN")}
                            </span>
                            <span className="discount">{discount}% OFF</span>
                          </>
                        )}
                      </div>

                      {/* STOCK */}
                      <div className={`stock ${!inStock ? "out-stock" : ""}`}>
                        {inStock ? (
                          <>
                            <FaCheck /> In Stock
                          </>
                        ) : (
                          "Out of Stock"
                        )}
                      </div>

                      {/* BUTTONS */}
                      <div className="card-buttons">
                        <button
                          className={`add-cart-btn ${
                            addedId === product._id ? "added" : ""
                          }`}
                          disabled={!inStock}
                          onClick={() => handleAddToCart(product)}
                        >
                          {addedId === product._id ? (
                            <>
                              <FaCheck /> Added
                            </>
                          ) : (
                            <>
                              <FaShoppingCart /> Add to Cart
                            </>
                          )}
                        </button>

                        <Link
                          to={`/products/${product._id}`}
                          state={{ product }}
                          className="details-btn"
                          title="View Product"
                        >
                          <FaEye />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* EMPTY */}
          {!loading && !error && filteredProducts.length === 0 && (
            <div className="empty-products">
              <h3>No products found</h3>
              <p>There are no products in this category yet.</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}