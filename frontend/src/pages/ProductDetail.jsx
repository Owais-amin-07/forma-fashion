import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext.jsx';
import { findFallbackProduct } from '../data/products.js';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export default function ProductDetail(){
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState('M');
  const [color, setColor] = useState('');
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(()=>{
    axios.get(`${API}/products/${id}`).then(r=>{ setP(r.data); setColor(r.data.colors?.[0]||''); setSize(r.data.sizes?.[0]||'M'); }).catch(()=>{
      const fallback = findFallbackProduct(id);
      if(fallback){ setP(fallback); setColor(fallback.colors?.[0]||''); setSize(fallback.sizes?.[0]||'M'); }
    });
  },[id]);

  if(!p) return <p className="p-20 text-center text-[#8a8885]">Loading product...</p>;

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-12">
      <div className="grid grid-cols-[80px_1fr] gap-6">
        <div className="flex flex-col gap-4">
          {p.images.map((img,i)=>(
            <button key={i} onClick={()=>setActiveImg(i)} className={`aspect-[3/4] overflow-hidden border ${activeImg===i?'border-black':'border-transparent'}`}><img src={img} className="w-full h-full object-cover" /></button>
          ))}
        </div>
        <div className="aspect-[4/5] bg-[#f1eeea] overflow-hidden">
          <img src={p.images[activeImg]} className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="lg:pl-10">
        <p className="text-[11px] tracking-[0.18em] uppercase text-[#8a8885]">{p.category} · {p.countInStock>0?'In Stock':'Sold Out'}</p>
        <h1 className="font-serif text-[32px] mt-3 leading-[1.1]">{p.name}</h1>
        <div className="mt-4 flex gap-4 items-baseline">
          <p className="text-[20px] font-medium">${p.price}</p>
          {p.originalPrice && <p className="line-through text-[#9a9895] text-[14px]">${p.originalPrice}</p>}
          <span className="ml-auto text-[11px]">★ {p.rating} ({p.numReviews})</span>
        </div>
        <p className="mt-8 text-[14px] leading-7 text-[#5a5957]">{p.description}</p>

        <div className="mt-10">
          <p className="text-[11px] tracking-[0.18em] uppercase mb-3">Color — {color}</p>
          <div className="flex gap-2">{p.colors?.map(c=> <button key={c} onClick={()=>setColor(c)} className={`px-4 py-2 border text-[12px] uppercase ${color===c?'bg-black text-white border-black':'border-[#ece9e3]'}`}>{c}</button>)}</div>
        </div>

        <div className="mt-8">
          <p className="text-[11px] tracking-[0.18em] uppercase mb-3">Size — {size}</p>
          <div className="flex gap-2 flex-wrap">{p.sizes?.map(s=> <button key={s} onClick={()=>setSize(s)} className={`w-12 h-11 border text-[12px] ${size===s?'bg-black text-white border-black':'border-[#ece9e3] hover:border-black'}`}>{s}</button>)}</div>
        </div>

        <div className="mt-10 flex gap-4">
          <div className="flex border border-[#ece9e3]">
            <button onClick={()=>setQty(Math.max(1,qty-1))} className="w-12 h-[50px]">-</button>
            <span className="w-12 grid place-items-center text-[14px]">{qty}</span>
            <button onClick={()=>setQty(qty+1)} className="w-12 h-[50px]">+</button>
          </div>
          <button onClick={()=>addToCart(p, qty, size, color)} className="flex-1 btn-primary h-[50px]">Add to Cart — ${(p.price*qty).toFixed(0)}</button>
        </div>

        <div className="mt-12 border-t border-[#ece9e3] pt-8 space-y-4 text-[12px]">
          <div className="flex justify-between"><span className="uppercase tracking-widest text-[#8a8885]">Fabric</span><span>Organic / Natural Blend</span></div>
          <div className="flex justify-between"><span className="uppercase tracking-widest text-[#8a8885]">Shipping</span><span>Free over $150 · 2-4 days</span></div>
          <div className="flex justify-between"><span className="uppercase tracking-widest text-[#8a8885]">Returns</span><span>30 days minimalist returns</span></div>
        </div>
      </div>
    </div>
  )
}
