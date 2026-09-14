import { useCart } from '../context/CartContext.jsx';
import { Link, useNavigate } from 'react-router-dom';

export default function CartDrawer(){
  const { items, isCartOpen, setIsCartOpen, updateQty, removeFromCart, total } = useCart();
  const nav = useNavigate();
  if(!isCartOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={()=>setIsCartOpen(false)} />
      <div className="relative w-full max-w-[440px] bg-[#fcfbf9] h-full flex flex-col shadow-2xl">
        <div className="p-7 flex justify-between items-center border-b border-[#ece9e3]">
          <h3 className="text-[13px] tracking-[0.18em] uppercase">Cart — {items.length} items</h3>
          <button onClick={()=>setIsCartOpen(false)} className="text-xl">✕</button>
        </div>
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {items.length===0 && <p className="text-[13px] text-[#8a8885] text-center mt-20">Your cart is empty. Curate your minimalist wardrobe.</p>}
          {items.map((it,i)=>(
            <div key={i} className="flex gap-4">
              <img src={it.image} className="w-20 h-24 object-cover bg-[#f1eeea]" />
              <div className="flex-1">
                <p className="text-[13px]">{it.name}</p>
                <p className="text-[11px] text-[#8a8885] mt-1 uppercase">{it.size} · {it.color}</p>
                <div className="mt-3 flex items-center gap-3">
                  <button onClick={()=>updateQty(it._id,it.size,it.color,it.qty-1)} className="w-7 h-7 border">-</button>
                  <span className="text-[13px]">{it.qty}</span>
                  <button onClick={()=>updateQty(it._id,it.size,it.color,it.qty+1)} className="w-7 h-7 border">+</button>
                  <button onClick={()=>removeFromCart(it._id,it.size,it.color)} className="ml-auto text-[11px] uppercase underline">Remove</button>
                </div>
              </div>
              <p className="text-[13px] font-medium">${it.price*it.qty}</p>
            </div>
          ))}
        </div>
        <div className="p-7 border-t border-[#ece9e3] bg-[#f5f3ef]">
          <div className="flex justify-between text-[13px]"><span>Subtotal</span><span className="font-medium">${total.toFixed(2)}</span></div>
          <p className="text-[11px] text-[#8a8885] mt-2">Shipping & taxes calculated at checkout</p>
          <button onClick={()=>{setIsCartOpen(false); nav('/checkout')}} disabled={items.length===0} className="mt-6 w-full btn-primary disabled:opacity-30">Checkout</button>
          <Link to="/shop" onClick={()=>setIsCartOpen(false)} className="mt-3 block text-center text-[11px] uppercase tracking-widest underline">Continue Shopping</Link>
        </div>
      </div>
    </div>
  )
}
