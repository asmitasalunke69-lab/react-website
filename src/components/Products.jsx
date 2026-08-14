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
        .products-page { background: #f6f7f9; min-height: 100vh; padding-bottom: 40px; font-family: Arial, sans-serif; }
        
        /* HEADER - SIZE KAMI */
        .products-header { background: white; padding: 20px 5% 20px; border-bottom: 1px solid #e5e7eb; }
        .products-header-inner { max-width: 1250px; margin: auto; display: flex; justify-content: space-between; align-items: flex-end; }
        .small-title { color: #2563eb; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; margin-bottom: 6px; }
        .products-header h1 { margin: 0; color: #111827; font-size: 28px; font-weight: 800; letter-spacing: -1px; } /* 42px > 28px */
        .products-header p { margin: 6px 0 0; color: #6b7280; font-size: 14px; } /* 16px > 14px */
        .product-count { color: #374151; font-size: 13px; padding-bottom: 4px; }
        .product-count strong { color: #111827; font-size: 14px; }
        
        .products-container { max-width: 1250px; margin: 20px auto 0; padding: 0 12px; } /* padding kami */
        
        /* CATEGORY - SIZE KAMI */
        .category-box { background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 10px; display: flex; gap: 8px; overflow-x: auto; margin-bottom: 20px; }
        .category-btn { border: none; background: #f8fafc; color: #374151; padding: 9px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; white-space: nowrap; transition: 0.25s; } /* padding ani font kami */
        .category-btn.active { background: #2563eb; color: white; box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25); }
        
        /* GRID - MOBILE 2 COLUMN */
        .products-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; } /* 4 > 2, gap kami */
        
        /* CARD - SIZE KAMI */
        .product-card { background: white; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; position: relative; transition: all 0.28s ease; }
        .product-card:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,0,0,0.08); }
        .product-image-box { height: 180px; background: #f3f4f6; position: relative; overflow: hidden; } /* 250px > 180px */
        .product-image { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.45s ease; }
        .category-label { position: absolute; top: 10px; left: 10px; background: rgba(255,255,255,0.95); color: #374151; font-size: 10px; padding: 5px 8px; border-radius: 4px; text-transform: uppercase; z-index: 2; } /* font kami */
        .wishlist-btn { position: absolute; right: 10px; top: 10px; width: 30px; height: 30px; border: none; border-radius: 50%; background: rgba(255,255,255,0.95); color: #9ca3af; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 3; }
        
        .product-info { padding: 12px 12px 12px; } /* padding kami */
        .product-name { color: #111827; font-size: 14px; font-weight: 700; margin: 0 0 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } /* 18px > 14px */
        .product-description { color: #9ca3af; font-size: 12px; margin-bottom: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .rating-row { display: flex; align-items: center; gap: 6px; margin-bottom: 10px; }
        .rating { background: #16a34a; color: white; padding: 4px 6px; border-radius: 4px; font-size: 11px; font-weight: 700; display: flex; align-items: center; gap: 3px; }
        .price-row { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; margin-bottom: 6px; }
        .current-price { font-size: 16px; color: #111827; font-weight: 800; } /* 21px > 16px */
        .old-price { color: #9ca3af; text-decoration: line-through; font-size: 11px; }
        .discount { color: #16a34a; font-size: 10px; font-weight: 800; }
        .stock { color: #16a34a; font-size: 11px; margin-bottom: 10px; display: flex; align-items: center; gap: 4px; }
        .card-buttons { display: flex; gap: 6px; }
        .add-cart-btn { flex: 1; border: none; border-radius: 6px; padding: 9px 6px; background: #2563eb; color: white; font-size: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px; }
        .details-btn { width: 36px; border: 1px solid #dbe0e7; background: white; color: #374151; border-radius: 6px; display: flex; justify-content: center; align-items: center; text-decoration: none; }
        
        .loading-container, .error-container { min-height: 350px; display: flex; flex-direction: column; justify-content: center; align-items: center; color: #6b7280; gap: 10px; }
        .empty-products { background: white; border-radius: 12px; padding: 40px 15px; text-align: center; color: #6b7280; border: 1px solid #e5e7eb; }

        /* DESKTOP - MOTHYA SCREEN SATHI */
        @media (min-width: 768px) { 
            .products-grid { grid-template-columns: repeat(3, 1fr); gap: 18px; } 
            .product-image-box { height: 220px; }
        }
        @media (min-width: 1100px) { 
            .products-grid { grid-template-columns: repeat(4, 1fr); gap: 22px; } 
            .products-header { padding: 38px 9% 34px; }
            .products-header h1 { font-size: 42px; }
            .product-image-box { height: 250px; }
        }
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