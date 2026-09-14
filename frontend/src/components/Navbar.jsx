import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useState } from 'react';

export default function Navbar(){
  const { count, setIsCartOpen, wishlist } = useCart();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const loc = useLocation();
  const nav = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-[#fcfbf9]/90 backdrop-blur-xl border-b border-[#ece9e3]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
        <div className="flex items-center gap-10">
          <button className="lg:hidden text-xl" onClick={()=>setMenuOpen(!menuOpen)}>☰</button>
          <Link to="/" className="font-serif text-[22px] tracking-[0.22em] font-medium">FORMA</Link>
          <nav className="hidden lg:flex gap-8 text-[12px] tracking-[0.14em] uppercase">
            <Link to="/shop?cat=New In" className={loc.search.includes('New In')?'underline underline-offset-8':''}>New In</Link>
            <Link to="/shop?cat=Women">Women</Link>
            <Link to="/shop?cat=Men">Men</Link>
            <Link to="/shop?cat=Accessories">Accessories</Link>
            <Link to="/shop?cat=Essentials">Essentials</Link>
          </nav>
        </div>

        <div className="flex items-center gap-6 text-[12px] tracking-[0.12em] uppercase">
          <button onClick={()=>nav('/shop')} className="hidden md:block">Search</button>
          <Link to={user ? '/account' : '/login'}>{user ? user.name.split(' ')[0] : 'Account'}</Link>
          <Link to="/wishlist" className="relative">Wishlist <span className="ml-1 text-[10px]">({wishlist.length})</span></Link>
          <button onClick={()=>setIsCartOpen(true)} className="relative">Cart <span className="ml-1 bg-black text-white rounded-full px-2 py-0.5 text-[10px]">{count}</span></button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t bg-[#fcfbf9] px-6 py-8 flex flex-col gap-6 text-[13px] tracking-[0.12em] uppercase">
          {['All','New In','Women','Men','Accessories','Essentials'].map(c=>(
            <Link key={c} to={`/shop?cat=${c}`} onClick={()=>setMenuOpen(false)}>{c}</Link>
          ))}
        </div>
      )}
    </header>
  )
}
