import React, { useState } from "react";

export default function Home() {

  const [cart, setCart] = useState([]);

  const products = [
    {
      name:"Premium Shoes",
      price:"₹1999",
      image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },
    
    {
      name:"Smart Watch",
      price:"₹2999",
      image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    {
      name:"Fashion Bag",
      price:"₹1499",
      image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
    },
    {
      name:"Headphones",
      price:"₹2499",
      image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      name:"Laptop",
      price:"₹55000",
      image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
    },
    {
      name:"Mobile Phone",
      price:"₹20000",
      image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    },
    {
      name:"Camera",
      price:"₹35000",
      image:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
    },
    {
      name:"T-Shirt",
      price:"₹699",
      image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
    },
    {
      name:"Perfume",
      price:"₹999",
      image:"https://images.unsplash.com/photo-1541643600914-78b084683601"
    },
    {
      name:"Sunglasses",
      price:"₹1299",
      image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083"
    }
  ];
  const addCart = (item)=>{
    setCart([...cart,item]);
  };
  return (

<div className="bg-gray-200">
<section 
className="h-[380px] bg-cover bg-center flex items-center px-10 border-4 border-black
rounded-2xl mx-6 mt-4 overflow-hidden p-5"
style={{backgroundImage:
"url(https://cdn.shopify.com/b/shopify-brochure2-assets/327b68d9e723dd05c19fbac7d8f3e84b.png)"
}} >

<div className=" bg-white/80 backdrop-blur-sm p-8
rounded-2xl max-w-md shadow-xl">

<h1 className=" text-4xl font-bold text-blue-700">
Big Sale 🛍️ </h1>

<h2 className=" text-2xl font-semibold mt-2">
Shop Latest Products
</h2>

<p className=" text-gray-600 mt-3">
Fashion, Electronics & More  
at best prices. </p>

<button className="mt-5 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800">
Shop Now → </button>

</div>

</section>
<br/>
<br/>
<br/>



<div className="bg-gradient-to-r from-pink-500 to-orange-400 text-white text-center px-4
border-2 border-pink-300 rounded-lg mx-4 mt-2 overflow-hidden p-1">

<h2 className="text-3xl font-bold p-4 ">
🔥 Mega Sale 50% OFF 🔥
</h2>

<p>
Grab your favourite products today
</p>

</div>



<h1 className=" text-center text-3xl
font-bold text-blue-600 mt-8">Trending Products </h1>

<div className="
grid
grid-cols-2
md:grid-cols-5
gap-5
p-12">
  
 

{products.map((item, index) => (
  <div
    key={index}
    className=" gap-10 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative w-[280px] h-[430px]"
  >
    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
      🔥 20% OFF
    </span>

   
    <span className="absolute top-3 right-3 bg-white rounded-full p-2 shadow cursor-pointer">
      🤍
    </span>

    
    <img
      src={item.image}
      alt={item.name}
      className="h-52 w-full object-cover hover:scale-110 transition-transform duration-500"
    />

   
    <div className="p-4">
      <h2 className="text-lg font-bold">{item.name}</h2>

      <p className="text-yellow-500 text-sm mt-1">
        ⭐⭐⭐⭐⭐ (4.8)
      </p>

      <div className="flex items-center gap-2 mt-2">
        <p className="text-green-600 text-xl font-bold">
          {item.price}
        </p>
        <span className="text-gray-400 line-through">
          ₹3999
        </span>
      </div>

      <button
        onClick={() => addCart(item)}
        className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-4 py-3 rounded-xl font-semibold"
      >
        🛒 Add To Cart
      </button>
    </div>
  </div>
))}
</div>


<div className="gap-10 bg-white mx-8 my-8 p-6 rounded-2xl shadow-xl">

<h2 className=" text-3xl font-bold text-blue-600 mb-5">🛒 Your Cart</h2>

{
cart.length === 0 ? (

<p className=" gap-10 text-gray-500">
Your cart is empty
</p>

):(

<div className="
grid
md:grid-cols-3
gap-5">

{
cart.map((item,index)=>(

<div
key={index}
className="  border rounded-xl p-4 flex gap-10 items-center shadow-md">

<img
src={item.image}
className=" h-20 w-20 rounded-lg object-cover"/>

<div>

<h3 className="font-bold">{item.name}</h3>

<p className="text-green-600">
{item.price}</p>

</div>
</div>

))
}

</div>

)}
</div>


<footer className=" bg-gradient-to-r from-blue-900 via-purple-800 to-pink-700 text-white p-12">

<div className=" grid md:grid-cols-3 gap-10"><div>

<h1 className="text-4xlfont-bold">ShopEasy 🛍️</h1>

<p className="mt-3">
Your online shopping partner.</p>
</div>


<div>
<h2 className="text-2xl font-bold"> Quick Links</h2>

<p className="mt-3">Home</p>

<p>Products</p>
<p>Contact</p>
</div>

<div>
<h2 className="text-2xl font-bold">Contact Us</h2>

<p className="mt-3"> shopeasy@gmail.com</p>

<p>📞 9876543210</p>

<p>📍 Pune, Maharashtra</p>
</div>
</div>

<hr className="my-8"/>

<p className="text-center">© 2026 ShopEasy | All Rights Reserved</p>

</footer>



</div>

  );
}