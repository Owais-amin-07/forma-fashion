import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function ProductCard({ p }){
  const { toggleWishlist, wishlist } = useCart();
  const isWish = wishlist.find(w=>w._id===p._id);
  return (
    <div className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f1eeea]">
        <Link to={`/product/${p._id}`}>
          <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
        </Link>
        {p.originalPrice && <span className="absolute top-3 left-3 bg-white px-2.5 py-1 text-[10px] tracking-widest uppercase">Sale</span>}
        <button onClick={()=>toggleWishlist(p)} className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-full grid place-items-center text-[14px]">{isWish ? '♥' : '♡'}</button>
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Link to={`/product/${p._id}`} className="block bg-[#0a0a0a] text-white text-center py-3 text-[11px] tracking-[0.14em] uppercase">Quick View</Link>
        </div>
      </div>
      <div className="pt-4 flex justify-between items-start">
        <div>
          <Link to={`/product/${p._id}`} className="text-[13px] tracking-wide leading-5 line-clamp-1">{p.name}</Link>
          <p className="text-[11px] text-[#8a8885] mt-1 uppercase tracking-widest">{p.category} · {p.colors?.[0]}</p>
        </div>
        <div className="text-right">
          <p className="text-[13px] font-medium">${p.price}</p>
          {p.originalPrice && <p className="text-[11px] line-through text-[#9a9895]">${p.originalPrice}</p>}
        </div>
      </div>
    </div>
  )
}
