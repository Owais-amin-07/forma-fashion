import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export default function Admin(){
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name:'', price:'', category:'Women', countInStock:10, description:'', images:'', colors:'Sand, Black', sizes:'XS,S,M,L' });

  useEffect(()=>{
    if(user?.token){
      axios.get(`${API}/orders`, { headers:{ Authorization:`Bearer ${user.token}` }}).then(r=>setOrders(r.data)).catch(()=>{});
      axios.get(`${API}/products?limit=100`).then(r=>setProducts(r.data.products)).catch(()=>{});
    }
  },[user]);

  const createProduct = async (e)=>{
    e.preventDefault();
    const payload = {
      name: form.name, price: Number(form.price), category: form.category, countInStock: Number(form.countInStock),
      description: form.description, images: form.images.split(',').map(s=>s.trim()).filter(Boolean),
      colors: form.colors.split(',').map(s=>s.trim()), sizes: form.sizes.split(',').map(s=>s.trim())
    };
    await axios.post(`${API}/products`, payload, { headers:{ Authorization:`Bearer ${user.token}` }});
    alert('Created'); location.reload();
  };

  if(!user || user.role!=='admin') return <p className="p-20 text-center">Admin only. Change your user role to 'admin' in MongoDB.</p>;

  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-12">
      <h1 className="font-serif text-[30px]">Admin — FORMA</h1>
      <div className="mt-10 grid lg:grid-cols-2 gap-12">
        <div>
          <h3 className="text-[11px] tracking-[0.18em] uppercase mb-4">Create Product</h3>
          <form onSubmit={createProduct} className="space-y-3 bg-white border p-6">
            <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required className="w-full border px-3 py-2 text-[13px]" />
            <input placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} required className="w-full border px-3 py-2 text-[13px]" />
            <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="w-full border px-3 py-2 text-[13px]"><option>Women</option><option>Men</option><option>Accessories</option><option>New In</option><option>Essentials</option></select>
            <input placeholder="Images URLs (comma separated, use Unsplash)" value={form.images} onChange={e=>setForm({...form,images:e.target.value})} required className="w-full border px-3 py-2 text-[13px]" />
            <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} required className="w-full border px-3 py-2 text-[13px] h-24" />
            <div className="grid grid-cols-3 gap-2"><input placeholder="Colors" value={form.colors} onChange={e=>setForm({...form,colors:e.target.value})} className="border px-3 py-2 text-[13px]" /><input placeholder="Sizes" value={form.sizes} onChange={e=>setForm({...form,sizes:e.target.value})} className="border px-3 py-2 text-[13px]" /><input placeholder="Stock" type="number" value={form.countInStock} onChange={e=>setForm({...form,countInStock:e.target.value})} className="border px-3 py-2 text-[13px]" /></div>
            <button className="w-full btn-primary">Create</button>
          </form>
        </div>
        <div>
          <h3 className="text-[11px] tracking-[0.18em] uppercase mb-4">Recent Orders — {orders.length}</h3>
          <div className="space-y-2 max-h-[600px] overflow-auto">
            {orders.map(o=>(
              <div key={o._id} className="border bg-white p-4 text-[12px] flex justify-between">
                <div><p className="font-medium">{o.user?.name} · ${o.totalPrice}</p><p className="text-[#8a8885]">{o.status} · {o.paymentMethod}</p></div>
                <select value={o.status} onChange={async e=>{ await axios.put(`${API}/orders/${o._id}/status`, { status: e.target.value }, { headers:{ Authorization:`Bearer ${user.token}` }}); setOrders(orders.map(x=> x._id===o._id ? {...x,status:e.target.value} : x)) }} className="border text-[11px] h-8"><option>Processing</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option></select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
