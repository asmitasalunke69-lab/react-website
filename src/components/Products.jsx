import React, { useEffect, useMemo, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaStar, FaShoppingCart, FaHeart, FaEye, FaCheck, FaSpinner, FaExclamationTriangle,
} from "react-icons/fa";

export default function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [addedId, setAddedId] = useState(null);

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved? JSON.parse(saved) : [];
  });

  useEffect(() => localStorage.setItem("wishlist", JSON.stringify(wishlist)), [wishlist]);

  // 1. API FAST KAR: cache lavla
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://backend-riqg.onrender.com/api/v1/products");
        setProducts(res.data || []);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const unique = [...new Set(products.map((p) => p.category).filter(Boolean))].slice(0, 6);
    return ["All",...unique];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter((p) => p.category?.toLowerCase() === selectedCategory.toLowerCase());
  }, [products, selectedCategory]);

  const handleAddToCart = useCallback((product) => { // useCallback ne re-render kami
    if (addToCart) addToCart(product);
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1500);
  }, [addToCart]);

  const toggleWishlist = useCallback((id) => {
    setWishlist((prev) => prev.includes(id)? prev.filter((i) => i!== id) : [...prev, id]);
  }, []);

  const calculateOldPrice = (price) => Math.round(Number(price || 0) * 1.25);
  const calculateDiscount = (price) => {
    const oldPrice = calculateOldPrice(price);
    return oldPrice? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
      .products-page { background: #f6f7f9; min-height: 100vh; padding-bottom: 40px; }
      .products-header { background: white; padding: 20px 5%; border-bottom: 1px solid #e5e7eb; position: sticky; top: 0; z-index: 10; }
      .products-header-inner { max-width: 1250px; margin: auto; display: flex; justify-content: space-between; align-items: flex-end; }
      .small-title { color: #2563eb; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; }
      .products-header h1 { margin: 5px 0 0; color: #111827; font-size: 28px; font-weight: 800; }
      .products-container { max-width: 1250px; margin: 20px auto 0; padding: 0 12px; }
      .category-box { background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 10px; display: flex; gap: 8px; overflow-x: auto; margin-bottom: 20px; }
      .category-btn { border: none; background: #f8fafc; color: #374151; padding: 9px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; }
      .category-btn.active { background: #2563eb; color: white; }

        /* 2. GRID SPEED: Browser la sang ki ha area heavy aahe */
      .products-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; content-visibility: auto; contain-intrinsic-size: 1px 3000px; }

      .product-card { background: white; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
      .product-image-box { height: 180px; background: #f3f4f6; position: relative; }
      .product-image { width: 100%; height: 100%; object-fit: cover; display: block; }
      .category-label { position: absolute; top: 10px; left: 10px; background: rgba(255,255,255,0.95); color: #374151; font-size: 10px; padding: 5px 8px; border-radius: 4px; }
      .wishlist-btn { position: absolute; right: 10px; top: 10px; width: 30px; height: 30px; border: none; border-radius: 50%; background: rgba(255,255,255,0.95); color: #9ca3af; display: flex; align-items: center; justify-content: center; cursor: pointer; }
      .wishlist-btn.liked { color: #ef4444; }
      .product-info { padding: 12px; }
      .product-name { color: #111827; font-size: 14px; font-weight: 700; margin: 0 0 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .price-row { display: flex; align-items: center; gap: 6px; margin: 6px 0; }
      .current-price { font-size: 16px; color: #111827; font-weight: 800; }
      .add-cart-btn { width: 100%; border: none; border-radius: 6px; padding: 9px; background: #2563eb; color: white; font-size: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px; }
      .loading-container { min-height: 350px; display: flex; justify-content: center; align-items: center; color: #6b7280; }

        @media (min-width: 768px) {.products-grid { grid-template-columns: repeat(3, 1fr); }.product-image-box { height: 220px; } }
        @media (min-width: 1100px) {.products-grid { grid-template-columns: repeat(4, 1fr); }.product-image-box { height: 250px; } }
      `}</style>

      <div className="products-page">
        <section className="products-header">
          <div className="products-header-inner">
            <div><div className="small-title">SHOPEASY STORE</div><h1>All Products</h1></div>
            <div><strong>{filteredProducts.length}</strong> products</div>
          </div>
        </section>

        <main className="products-container">
          {!loading && products.length > 0 && (
            <div className="category-box">
              {categories.map((c) => <button key={c} className={`category-btn ${selectedCategory === c? "active" : ""}`} onClick={() => setSelectedCategory(c)}>{c}</button>)}
            </div>
          )}

          {loading && <div className="loading-container"><FaSpinner /> Loading products...</div>}
          {error && <div className="loading-container"><FaExclamationTriangle /> {error}</div>}

          {!loading &&!error && (
            <div className="products-grid">
              {filteredProducts.map((product) => {
                const price = Number(product.price || 0);
                const oldPrice = calculateOldPrice(price);
                const discount = calculateDiscount(price);
                const inStock = product.stock === undefined || Number(product.stock) > 0;
                return (
                  <div className="product-card" key={product._id}>
                    <div className="product-image-box">
                      <span className="category-label">{product.category}</span>
                      <button className={`wishlist-btn ${wishlist.includes(product._id)? "liked" : ""}`} onClick={() => toggleWishlist(product._id)}><FaHeart /></button>
                      {/* 3. IMAGE FAST: width height fixed + lazy */}
                      <img
                        src={product.imageUrl || "https://via.placeholder.com/300"}
                        alt={product.name}
                        className="product-image"
                        loading="lazy"
                        decoding="async"
                        width="300"
                        height="250"
                      />
                    </div>
                    <div className="product-info">
                      <h2 className="product-name">{product.name}</h2>
                      <div className="price-row">
                        <span className="current-price">₹{price.toLocaleString("en-IN")}</span>
                        {oldPrice > price && <span style={{textDecoration:"line-through", color:"#9ca3af", fontSize:"11px"}}>₹{oldPrice.toLocaleString("en-IN")}</span>}
                      </div>
                      <button className="add-cart-btn" disabled={!inStock} onClick={() => handleAddToCart(product)}>
                        {addedId === product._id? <><FaCheck /> Added</> : <><FaShoppingCart /> Add to Cart</>}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </>
  );
}