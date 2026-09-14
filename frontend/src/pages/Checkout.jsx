import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export default function Checkout(){
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ fullName: user?.name||'', address:'', city:'', postalCode:'', country:'Pakistan', paymentMethod:'COD' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      const orderItems = items.map(i=>({ product: i._id, name: i.name, image: i.image, price: i.price, qty: i.qty, size: i.size, color: i.color }));
      const { data } = await axios.post(`${API}/orders`, { orderItems, shippingAddress: form, paymentMethod: form.paymentMethod, itemsPrice: total, shippingPrice: 0, taxPrice: 0, totalPrice: total }, { headers: { Authorization: `Bearer ${user?.token}` } });
      clearCart();
      nav(`/account?success=${data._id}`);
    } catch(err){ alert(err.response?.data?.message || 'Checkout failed. Please login first.'); }
    setLoading(false);
  };

  if(items.length===0) return <p className="p-20 text-center">No items to checkout. <a href="/shop" className="underline">Shop</a></p>;

  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-12 grid lg:grid-cols-2 gap-16">
      <form onSubmit={handleSubmit} className="space-y-8">
        <h2 className="font-serif text-[28px]">Checkout</h2>
        <div>
          <h3 className="text-[11px] tracking-[0.18em] uppercase mb-4">Shipping Address</h3>
          <div className="grid gap-4">
            {[
              ['fullName','Full Name'],
              ['address','Street Address'],
              ['city','City'],
              ['postalCode','Postal Code'],
              ['country','Country'],
            ].map(([k,label])=>(
              <input key={k} required placeholder={label} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} className="border border-[#ece9e3] bg-white px-4 py-3.5 text-[13px] outline-none focus:border-black" />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-[11px] tracking-[0.18em] uppercase mb-4">Payment</h3>
          <div className="flex gap-3">
            <label className={`flex-1 border p-4 text-[12px] uppercase cursor-pointer ${form.paymentMethod==='COD'?'border-black bg-[#f5f3ef]':''}`}><input type="radio" name="pay" checked={form.paymentMethod==='COD'} onChange={()=>setForm({...form,paymentMethod:'COD'})} className="mr-2" /> Cash on Delivery</label>
            <label className={`flex-1 border p-4 text-[12px] uppercase cursor-pointer ${form.paymentMethod==='Card'?'border-black bg-[#f5f3ef]':''}`}><input type="radio" name="pay" checked={form.paymentMethod==='Card'} onChange={()=>setForm({...form,paymentMethod:'Card'})} className="mr-2" /> Card (Stripe)</label>
          </div>
        </div>
        <button disabled={loading} className="w-full btn-primary">{loading?'Processing...':`Pay $${total.toFixed(2)}`}</button>
      </form>
      <div className="bg-[#f5f3ef] p-8 h-fit">
        <h3 className="text-[11px] tracking-[0.18em] uppercase mb-6">Order Summary — {items.length} items</h3>
        <div className="space-y-4">{items.map((it,i)=><div key={i} className="flex gap-4 text-[13px]"><img src={it.image} className="w-14 h-16 object-cover" /><div className="flex-1"><p>{it.name}</p><p className="text-[11px] text-[#8a8885] uppercase">{it.size} x {it.qty}</p></div><span>${(it.price*it.qty).toFixed(2)}</span></div>)}</div>
        <div className="border-t mt-6 pt-6 flex justify-between font-medium"><span>Total</span><span>${total.toFixed(2)}</span></div>
      </div>
    </div>
  )
}
