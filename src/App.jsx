import { Route, Routes, useLocation } from "react-router-dom";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Home from "./components/Home.jsx";
import Products from "./components/Products.jsx";
import Services from "./components/Services.jsx";
import Navbar from "./components/Navbar.jsx";

export default function App() {
  const location = useLocation();

  return (
    <>
      {/* ❌ Products page वर main navbar hide */}
      {location.pathname !== "/products" && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}