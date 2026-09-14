import { useCart } from '../context/CartContext.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { Link } from 'react-router-dom';

export default function Wishlist(){
  const { wishlist } = useCart();
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
      <h1 className="font-serif text-[30px]">Wishlist — {wishlist.length}</h1>
      {wishlist.length===0 ? <p className="mt-20 text-center text-[#8a8885] text-[13px]">No saved items. <Link to="/shop" className="underline">Explore shop</Link></p> : (
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {wishlist.map(p=> <ProductCard key={p._id} p={p} />)}
        </div>
      )}
    </div>
  )
}
