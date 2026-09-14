export default function Footer(){
  return (
    <footer className="mt-20 border-t border-[#ece9e3] bg-[#f5f3ef]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-4 gap-12">
        <div>
          <h4 className="font-serif text-[20px] tracking-[0.2em] mb-4">FORMA</h4>
          <p className="text-[13px] leading-6 text-[#6b6864] max-w-[280px]">Minimalist fashion house based on timeless essentials. Designed for longevity, made to be worn.</p>
        </div>
        <div className="text-[12px] tracking-[0.12em] uppercase">
          <p className="font-medium mb-4">Shop</p>
          <div className="flex flex-col gap-3 text-[#6b6864]">
            <a href="/shop?cat=Women">Women</a><a href="/shop?cat=Men">Men</a><a href="/shop?cat=New In">New In</a><a href="/shop">All Products</a>
          </div>
        </div>
        <div className="text-[12px] tracking-[0.12em] uppercase">
          <p className="font-medium mb-4">Help</p>
          <div className="flex flex-col gap-3 text-[#6b6864]">
            <span>Shipping & Returns</span><span>Size Guide</span><span>Contact</span><span>FAQs</span>
          </div>
        </div>
        <div>
          <p className="text-[12px] tracking-[0.12em] uppercase font-medium mb-4">Newsletter — 10% off</p>
          <div className="flex border-b border-black">
            <input placeholder="Email address" className="bg-transparent py-3 w-full outline-none text-[13px]" />
            <button className="text-[12px] uppercase tracking-widest">Join</button>
          </div>
          <p className="mt-6 text-[11px] text-[#8a8885]">© 2026 FORMA FASHION. Minimalist store crafted for performance.</p>
        </div>
      </div>
    </footer>
  )
}
