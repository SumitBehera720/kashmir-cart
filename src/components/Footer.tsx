import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-pattern-maroon text-text-white ornate-border-bottom relative">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 border-b border-gold-antique/20 mb-8">
        
        {/* Brand */}
        <div className="lg:col-span-2 space-y-6">
          <Link href="/" className="flex items-center gap-3 group relative h-16 w-48">
            <Image 
              src="/assets/images/logo.png" 
              alt="Kashmir Cart Logo" 
              fill 
              className="object-contain object-left"
            />
          </Link>
          <p className="font-sans text-sm text-text-white/80 leading-relaxed max-w-sm">
            Bringing you the finest authentic Kashmiri products, crafted with tradition, purity, and love from the heart of the Himalayas.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="w-8 h-8 rounded-full border border-gold-antique/30 flex items-center justify-center text-gold-light hover:bg-gold-antique hover:text-maroon-deep transition-colors font-sans text-xs">
              FB
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-gold-antique/30 flex items-center justify-center text-gold-light hover:bg-gold-antique hover:text-maroon-deep transition-colors font-sans text-xs">
              IG
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-gold-antique/30 flex items-center justify-center text-gold-light hover:bg-gold-antique hover:text-maroon-deep transition-colors font-sans text-xs">
              TW
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-gold-antique/30 flex items-center justify-center text-gold-light hover:bg-gold-antique hover:text-maroon-deep transition-colors font-sans text-xs">
              YT
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="font-serif text-lg text-gold-light mb-4">Shop</h3>
          <ul className="space-y-3 font-sans text-sm text-text-white/70">
            <li><Link href="/shop/premium-kashmiri-saffron" className="hover:text-gold-light transition-colors">Kashmiri Saffron</Link></li>
            <li><Link href="/shop/kashmiri-kahwa-tea" className="hover:text-gold-light transition-colors">Kahwa Collection</Link></li>
            <li><Link href="/shop/wild-kashmir-honey" className="hover:text-gold-light transition-colors">Kashmiri Honey</Link></li>
            <li><Link href="/shop" className="hover:text-gold-light transition-colors">Dry Fruits</Link></li>
            <li><Link href="/shop" className="hover:text-gold-light transition-colors">Gift Sets</Link></li>
            <li><Link href="/shop" className="hover:text-gold-light transition-colors">All Products</Link></li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h3 className="font-serif text-lg text-gold-light mb-4">Information</h3>
          <ul className="space-y-3 font-sans text-sm text-text-white/70">
            <li><Link href="/about-kashmir" className="hover:text-gold-light transition-colors">About Kashmir</Link></li>
            <li><Link href="/our-story" className="hover:text-gold-light transition-colors">Our Story</Link></li>
            <li><Link href="/blog" className="hover:text-gold-light transition-colors">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-gold-light transition-colors">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:text-gold-light transition-colors">FAQ</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="font-serif text-lg text-gold-light mb-4">Customer Care</h3>
          <ul className="space-y-3 font-sans text-sm text-text-white/70">
            <li><Link href="/shipping" className="hover:text-gold-light transition-colors">Shipping Policy</Link></li>
            <li><Link href="/returns" className="hover:text-gold-light transition-colors">Returns & Refund</Link></li>
            <li><Link href="/privacy" className="hover:text-gold-light transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-gold-light transition-colors">Terms & Conditions</Link></li>
            <li><Link href="/track-order" className="hover:text-gold-light transition-colors">Track Order</Link></li>
          </ul>
        </div>

        {/* Certs & Payments */}
        <div>
          <h3 className="font-serif text-lg text-gold-light mb-4">Certifications</h3>
          <div className="flex flex-col gap-2 mb-6">
            <span className="text-xs border border-gold-antique/30 px-3 py-1 text-center text-text-white/80 bg-gold-antique/10 uppercase tracking-widest">GI Tagged Origin</span>
            <span className="text-xs border border-gold-antique/30 px-3 py-1 text-center text-text-white/80 bg-gold-antique/10 uppercase tracking-widest">100% Organic</span>
            <span className="text-xs border border-gold-antique/30 px-3 py-1 text-center text-text-white/80 bg-gold-antique/10 uppercase tracking-widest">Lab Tested</span>
          </div>
          <h3 className="font-serif text-lg text-gold-light mb-4">We Accept</h3>
          <div className="flex gap-2">
            <span className="text-[10px] font-bold bg-white text-black px-2 py-1 rounded-sm">VISA</span>
            <span className="text-[10px] font-bold bg-white text-black px-2 py-1 rounded-sm">MC</span>
            <span className="text-[10px] font-bold bg-white text-black px-2 py-1 rounded-sm">RUPAY</span>
            <span className="text-[10px] font-bold bg-white text-black px-2 py-1 rounded-sm">UPI</span>
          </div>
        </div>

      </div>

      <div className="border-t border-gold-antique/20 py-6 text-center text-xs text-text-white/50 font-sans">
        <p>&copy; {new Date().getFullYear()} Kashmir Heritage. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
