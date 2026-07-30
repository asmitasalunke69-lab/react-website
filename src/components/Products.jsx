import React from "react";
import Navbar from "./Navbar";
import { BiBold } from "react-icons/bi";

export default function Products() {

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "£449",
      img: "https://headsetsindia.com/wp-content/uploads/2020/06/evolve2_65b-1-scaled.jpg"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "£979",
      img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSZCvB1qhAUXOlH6v_pCOlwN6eDOUhmNeSzMOxWkJcOH_bd4FX1tdIuxXYSG_XK30ZjhqJAwLbYaUSLQvQkNigoyrPFFJOnNRCV5Nb1PZv8gQpk9t_nWf7O"
    },
    {
      id: 3,
      name: "Shoes",
      price: "£1159",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },
    {
      id: 4,
      name: "Laptop",
      price: "£110899",
      img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
    },
    {
      id: 5,
      name: "Camera",
      price: "£11499",
      img: "https://png.pngtree.com/png-vector/20240905/ourmid/pngtree-black-dslr-camera-with-large-lens-clipart-illustration-stock-photo-png-image_13758787.png"
    },
    {
      id: 6,
      name: "Gaming Mouse",
      price: "£1029",
      img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7"
    },
    {
      id: 7,
      name: "Backpack",
      price: "£739",
      img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
    },
    {
      id: 8,
      name: "Sunglasses",
      price: "£1500",
      img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083"
    },
    {
      id: 9,
      name: "Phone",
      price: "£35999",
      img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    },
    {
      id: 10,
      name: "Perfume",
      price: "£299",
      img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad"
    }
  ];

  return (
    <div
      style={{ background: `
          linear-gradient(135deg, #eef2f3, #dfe9f3),url("https://www.transparenttextures.com/patterns/white-wall.png") `,
        backgroundBlendMode: "overlay", minHeight: "100vh"
      }} >
      
      <Navbar />

      <h1
        style={{  font:"bold", textAlign: "center", padding: "20px", color: "black", letterSpacing: "1px" }}
      >  Our Products  </h1>

      <div
        style={{display: "grid",gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "25px", padding: "20px"
        }}  >

        {products.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#fff", borderRadius: "18px", padding: "15px",
              textAlign: "center",boxShadow: "0 10px 25px rgba(0,0,0,0.15)", transition: "0.3s"
            }}
          >
            
            <img
              src={item.img}
              alt={item.name}
              style={{
                width: "100%",height: "200px",  objectFit: "contain",
              }} />

            <h3 style={{ margin: "10px 0" }}>{item.name}</h3>

            <p style={{ fontWeight: "bold", color: "#555" }}>
              {item.price}</p>

            <button
              style={{
                background: "linear-gradient(90deg, #667eea, #764ba2)", color: "#fff", border: "none",
                padding: "10px 18px", borderRadius: "25px", cursor: "pointer",fontWeight: "bold"
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {/* Customer Reviews */}

<div
  style={{
    marginTop: "40px",
    padding: "50px 20px",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    textAlign: "center",
  }}
>

<h2
  style={{
    color:"#fff",
    fontSize:"30px",
    marginBottom:"30px",
    letterSpacing:"1px"
  }}
>
  ⭐ Customer Reviews
</h2>


<div
 style={{
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
  gap:"25px",
  maxWidth:"1000px",
  margin:"auto"
 }}
>
<div style={{
 background:"rgba(255,255,255,0.15)",
 backdropFilter:"blur(10px)",
 padding:"25px",
 borderRadius:"20px",
 color:"#fff",
 boxShadow:"0 10px 25px rgba(0,0,0,0.2)"
}}>
<h3>⭐⭐⭐⭐⭐</h3>
<p>
Amazing products & fast delivery!
</p>
<h4> Priya</h4>
</div>



<div style={{
 background:"rgba(255,255,255,0.15)",
 backdropFilter:"blur(10px)",
 padding:"25px",
 borderRadius:"20px",
 color:"#fff",
 boxShadow:"0 10px 25px rgba(0,0,0,0.2)"
}}>
<h3>⭐⭐⭐⭐⭐</h3>
<p>
Loved the quality. Highly recommended!
</p>
<h4> Rahul</h4>
</div>



<div style={{
 background:"rgba(255,255,255,0.15)",
 backdropFilter:"blur(10px)",
 padding:"25px",
 borderRadius:"20px",
 color:"#fff",
 boxShadow:"0 10px 25px rgba(0,0,0,0.2)"
}}>
<h3>⭐⭐⭐⭐</h3>
<p>
Great shopping experience.
</p>
<h4>Sneha</h4>
</div>


</div>

</div>
    </div>
  );
}