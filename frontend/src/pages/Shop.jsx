import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard.jsx';
import { FALLBACK_PRODUCTS } from '../data/products.js';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
const CATS = ['All','New In','Women','Men','Accessories','Essentials'];

export default function Shop(){
  const [searchParams, setSearchParams] = useSearchParams();
  const cat = searchParams.get('cat') || 'All';
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/products`, { params: { category: cat, search, sort, limit: 20 } });
      setProducts(data.products?.length ? data.products : getFallbackProducts(cat, search));
    } catch { setProducts(getFallbackProducts(cat, search)); }
    setLoading(false);
  };

  const getFallbackProducts = (category, query) => FALLBACK_PRODUCTS.filter(product => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesSearch = !query || `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(()=>{ fetchProducts(); }, [cat, sort]);

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10">
      <div className="flex flex-wrap gap-8 justify-between items-center border-b border-[#ece9e3] pb-8">
        <h1 className="font-serif text-[32px]">{cat === 'All' ? 'All Products' : cat}</h1>
        <div className="flex gap-3">
          <input value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=> e.key==='Enter' && fetchProducts()} placeholder="Search forma..." className="border border-[#ece9e3] bg-white px-4 py-2.5 text-[13px] w-[200px] outline-none" />
          <select value={sort} onChange={e=>setSort(e.target.value)} className="border border-[#ece9e3] bg-white px-4 py-2.5 text-[13px] outline-none">
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      <div className="mt-8 flex gap-3 flex-wrap">
        {CATS.map(c=>(
          <button key={c} onClick={()=>setSearchParams(c==='All'?{}:{cat:c})} className={`px-5 py-2.5 rounded-full text-[11px] tracking-[0.12em] uppercase border ${cat===c ? 'bg-black text-white border-black' : 'bg-white border-[#ece9e3] hover:border-black'}`}>{c}</button>
        ))}
      </div>

      {loading ? <p className="mt-20 text-center text-[13px] text-[#8a8885]">Loading curated pieces...</p> : (
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {products.length===0 ? <p className="col-span-4 text-center py-20 text-[#8a8885]">No products found. Try another filter.</p> : products.map(p=> <ProductCard key={p._id} p={p} />)}
        </div>
      )}
    </div>
  )
}
