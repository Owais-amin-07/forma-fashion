import { createContext, useContext, useState, useEffect } from 'react';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(()=> {
    const s = localStorage.getItem('forma_cart');
    return s ? JSON.parse(s) : [];
  });
  const [wishlist, setWishlist] = useState(()=> {
    const s = localStorage.getItem('forma_wish');
    return s ? JSON.parse(s) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(()=> localStorage.setItem('forma_cart', JSON.stringify(items)), [items]);
  useEffect(()=> localStorage.setItem('forma_wish', JSON.stringify(wishlist)), [wishlist]);

  const addToCart = (product, qty=1, size='M', color) => {
    setItems(prev => {
      const idx = prev.findIndex(p => p._id===product._id && p.size===size && p.color===color);
      if(idx>-1){
        const copy=[...prev]; copy[idx].qty+=qty; return copy;
      }
      return [...prev, { _id: product._id, name: product.name, price: product.price, image: product.images[0], qty, size, color: color||product.colors?.[0] }];
    });
    setIsCartOpen(true);
  };
  const removeFromCart = (id, size, color) => setItems(prev=> prev.filter(p=> !(p._id===id && p.size===size && p.color===color)));
  const updateQty = (id, size, color, qty) => {
    if(qty<=0) return removeFromCart(id,size,color);
    setItems(prev=> prev.map(p=> p._id===id && p.size===size && p.color===color ? {...p, qty} : p));
  };
  const clearCart = () => setItems([]);
  const total = items.reduce((s,i)=> s + i.price*i.qty, 0);
  const count = items.reduce((s,i)=> s + i.qty, 0);

  const toggleWishlist = (product) => {
    setWishlist(prev=> prev.find(p=>p._id===product._id) ? prev.filter(p=>p._id!==product._id) : [...prev, product]);
  };

  return <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, total, count, wishlist, toggleWishlist, isCartOpen, setIsCartOpen }}>{children}</CartContext.Provider>;
};
export const useCart = () => useContext(CartContext);
