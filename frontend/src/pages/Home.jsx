import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard.jsx';
import { FALLBACK_PRODUCTS } from '../data/products.js';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export default function Home(){
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);

  useEffect(()=>{
    axios.get(`${API}/products?featured=true&limit=8`).then(r=>{ if(r.data.products?.length) setProducts(r.data.products) }).catch(()=>{});
  },[]);

  return (
    <div>
      {/* HERO */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 mt-6">
          <div className="relative h-[72vh] lg:h-[84vh] overflow-hidden bg-[#efebe4]">
            <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop" alt="hero" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-8 lg:left-12 text-white max-w-[420px]">
              <p className="text-[11px] tracking-[0.22em] uppercase mb-4">Fall Winter 2026</p>
              <h1 className="font-serif text-[42px] lg:text-[58px] leading-[0.95] font-[400]">The quiet<br/>luxury of<br/>less.</h1>
              <Link to="/shop" className="inline-block mt-8 bg-white text-black px-8 py-3.5 text-[11px] tracking-[0.18em] uppercase">Shop Collection</Link>
            </div>
          </div>
          <div className="grid grid-rows-2 gap-6">
            <div className="relative overflow-hidden bg-[#f1eeea] h-[36vh] lg:h-auto">
              <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop" alt="women" className="absolute inset-0 w-full h-full object-cover" />
              <Link to="/shop?cat=Women" className="absolute bottom-6 left-6 bg-[#fcfbf9] px-6 py-3 text-[11px] tracking-[0.16em] uppercase">Women</Link>
            </div>
            <div className="relative overflow-hidden bg-[#f1eeea] h-[36vh] lg:h-auto">
              <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop" alt="men" className="absolute inset-0 w-full h-full object-cover" />
              <Link to="/shop?cat=Men" className="absolute bottom-6 left-6 bg-[#fcfbf9] px-6 py-3 text-[11px] tracking-[0.16em] uppercase">Men</Link>
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="max-w-[900px] mx-auto px-6 py-24 text-center">
        <p className="font-serif text-[26px] lg:text-[32px] leading-[1.25]">FORMA is built on restraint. Fewer, better pieces. Natural fabrics. Neutral palette. Designed to last beyond seasons.</p>
        <p className="mt-6 text-[11px] tracking-[0.2em] uppercase text-[#8a8885]">Minimalist · Sustainable · Timeless</p>
      </section>

      {/* FEATURED */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-end mb-10">
          <h2 className="font-serif text-[28px] tracking-wide">Curated Essentials</h2>
          <Link to="/shop" className="text-[11px] tracking-[0.16em] uppercase underline underline-offset-8">View All</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {products.map(p=> <ProductCard key={p._id} p={p} />)}
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-28 grid lg:grid-cols-2 gap-10 items-center">
        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop" alt="editorial" className="aspect-[4/5] object-cover w-full" />
        <div className="lg:pl-16">
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#8a8885] mb-6">The Forma Standard</p>
          <h3 className="font-serif text-[36px] leading-[1.1]">Clothing that<br/>disappears so<br/>you can appear.</h3>
          <p className="mt-6 text-[14px] leading-7 text-[#5a5957] max-w-[420px]">Every seam, every fabric, every proportion is considered. No logos. No noise. Just form, texture, and quiet confidence. Less branding, more you.</p>
          <Link to="/shop?cat=Essentials" className="inline-block mt-8 btn-outline">Explore Essentials</Link>
        </div>
      </section>
    </div>
  )
}
