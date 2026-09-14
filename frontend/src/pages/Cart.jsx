import { useCart } from '../context/CartContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
export default function Cart(){
  const { items, updateQty, removeFromCart, total } = useCart();
  const nav = useNavigate();
  return (
    <div className="max-w-[900px] mx-auto px-6 lg:px-10 py-16">
      <h1 className="font-serif text-[32px] mb-10">Shopping Bag ({items.length})</h1>
      {items.length===0 ? <div className="text-center py-20"><p className="text-[#8a8885]">Your bag is empty.</p><Link to="/shop" className="mt-6 inline-block btn-primary">Shop Now</Link></div> : (
        <div className="grid lg:grid-cols-[1.5fr_0.7fr] gap-12">
          <div className="space-y-6">
            {items.map((it,i)=>(
              <div key={i} className="flex gap-5 border-b border-[#ece9e3] pb-6">
                <img src={it.image} className="w-24 h-28 object-cover bg-[#f1eeea]" />
                <div className="flex-1"><p className="text-[14px]">{it.name}</p><p className="text-[11px] text-[#8a8885] uppercase mt-1">{it.size} · {it.color}</p><div className="mt-4 flex items-center gap-2"><button onClick={()=>updateQty(it._id,it.size,it.color,it.qty-1)} className="w-8 h-8 border">-</button><span className="w-8 text-center text-[13px]">{it.qty}</span><button onClick={()=>updateQty(it._id,it.size,it.color,it.qty+1)} className="w-8 h-8 border">+</button></div></div>
                <div className="text-right"><p className="font-medium text-[14px]">${(it.price*it.qty).toFixed(2)}</p><button onClick={()=>removeFromCart(it._id,it.size,it.color)} className="mt-3 text-[11px] uppercase underline">Remove</button></div>
              </div>
            ))}
          </div>
          <div className="bg-[#f5f3ef] p-7 h-fit sticky top-24">
            <h3 className="text-[12px] tracking-[0.18em] uppercase mb-6">Order Summary</h3>
            <div className="space-y-3 text-[13px]"><div className="flex justify-between"><span>Subtotal</span><span>${total.toFixed(2)}</span></div><div className="flex justify-between"><span>Shipping</span><span>Calculated at checkout</span></div><div className="flex justify-between font-medium text-[15px] pt-4 border-t mt-4"><span>Total</span><span>${total.toFixed(2)}</span></div></div>
            <button onClick={()=>nav('/checkout')} className="mt-8 w-full btn-primary">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  )
}
