import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export default function Account(){
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [params] = useSearchParams();
  const success = params.get('success');

  useEffect(()=>{
    if(user?.token) axios.get(`${API}/orders/my`, { headers: { Authorization: `Bearer ${user.token}` } }).then(r=>setOrders(r.data)).catch(()=>{});
  },[user]);

  if(!user) return <div className="max-w-[600px] mx-auto p-20 text-center"><p>Please login</p><Link to="/login" className="mt-4 inline-block btn-primary">Login</Link></div>;

  return (
    <div className="max-w-[1000px] mx-auto px-6 lg:px-10 py-12">
      {success && <div className="bg-[#0a0a0a] text-white p-4 text-[12px] tracking-widest uppercase mb-8">✓ Order placed successfully! Order ID: {success}</div>}
      <div className="flex justify-between items-center">
        <h1 className="font-serif text-[30px]">Hello, {user.name}</h1>
        <button onClick={logout} className="text-[11px] uppercase underline">Logout</button>
      </div>
      <p className="text-[12px] text-[#8a8885] mt-2">{user.email} · {user.role}</p>

      <h2 className="mt-12 text-[11px] tracking-[0.18em] uppercase">Order History — {orders.length}</h2>
      <div className="mt-6 space-y-4">
        {orders.length===0 && <p className="text-[13px] text-[#8a8885] py-10">No orders yet. Start curating your wardrobe.</p>}
        {orders.map(o=>(
          <div key={o._id} className="border border-[#ece9e3] bg-white p-6 flex justify-between">
            <div>
              <p className="text-[12px] tracking-widest uppercase">#{o._id.slice(-6).toUpperCase()} · {new Date(o.createdAt).toLocaleDateString()} · {o.status}</p>
              <p className="mt-2 text-[13px]">{o.orderItems.map(i=>`${i.name} x${i.qty}`).join(', ')}</p>
              <p className="text-[11px] text-[#8a8885] mt-1 uppercase">{o.paymentMethod} · {o.shippingAddress?.city}</p>
            </div>
            <p className="font-medium">${o.totalPrice?.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
