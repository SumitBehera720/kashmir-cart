import Link from "next/link";
import { fetchFooter } from "@/data/api";
import FooterClientWrapper from "@/components/FooterClientWrapper";

export default async function Footer() {
  const footerData = await fetchFooter().catch(() => null) || {};

  return (
    <footer className="bg-sand-medium text-text-dark border-t border-sand-medium relative">
      <FooterClientWrapper>
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 border-b border-sand-medium/40 mb-8">
        
        {/* Brand */}
        <div className="lg:col-span-2 space-y-6">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-serif text-[24px] font-bold tracking-[0.08em] text-gold-antique group-hover:text-gold-dark transition-colors uppercase">
              KASHMIR CART
            </span>
          </Link>
          <p className="font-sans text-[13px] text-text-muted leading-relaxed max-w-sm">
            Bringing you the authentic bounty of Jammu & Kashmir. Directly sourced, lab-tested, and ethically traded.
          </p>
          
          <p className="font-sans text-sm text-text-muted leading-relaxed max-w-sm mt-4">
            <b>Office Address:</b> {footerData.address || "Hyderpora Srinagar Kashmir"}
          </p>
          <p className="font-sans text-sm text-text-muted leading-relaxed max-w-sm">
            <b>Email:</b> {footerData.email || "support@kashmircart.com"}
          </p>
          <p className="font-sans text-sm text-text-muted leading-relaxed max-w-sm mb-4">
            <b>Phone:</b> {footerData.phone || "+91-9876543210"}
          </p>

          <div className="flex items-center gap-4">
            {footerData.facebook_url && (
              <a href={footerData.facebook_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-gold-antique/30 flex items-center justify-center text-gold-antique hover:bg-gold-antique hover:text-white transition-all hover:scale-110 hover:rotate-12 duration-300 font-sans text-xs">
                FB
              </a>
            )}
            {footerData.instagram_url && (
              <a href={footerData.instagram_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-gold-antique/30 flex items-center justify-center text-gold-antique hover:bg-gold-antique hover:text-white transition-all hover:scale-110 hover:rotate-12 duration-300 font-sans text-xs">
                IG
              </a>
            )}
            {footerData.twitter_url && (
              <a href={footerData.twitter_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-gold-antique/30 flex items-center justify-center text-gold-antique hover:bg-gold-antique hover:text-white transition-all hover:scale-110 hover:rotate-12 duration-300 font-sans text-xs">
                TW
              </a>
            )}
            {footerData.youtube_url && (
              <a href={footerData.youtube_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-gold-antique/30 flex items-center justify-center text-gold-antique hover:bg-gold-antique hover:text-white transition-all hover:scale-110 hover:rotate-12 duration-300 font-sans text-xs">
                YT
              </a>
            )}
            {footerData.whatsapp_url && (
              <a href={footerData.whatsapp_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-gold-antique/30 flex items-center justify-center text-gold-antique hover:bg-gold-antique hover:text-white transition-all hover:scale-110 hover:rotate-12 duration-300 font-sans text-xs">
                WA
              </a>
            )}
            {footerData.pinterest_url && (
              <a href={footerData.pinterest_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-gold-antique/30 flex items-center justify-center text-gold-antique hover:bg-gold-antique hover:text-white transition-all hover:scale-110 hover:rotate-12 duration-300 font-sans text-xs">
                PT
              </a>
            )}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="font-serif text-lg text-text-dark mb-4">Shop</h3>
          <ul className="space-y-3 font-sans text-sm text-text-muted">
            <li><Link href="/shop" className="hover:text-terracotta transition-colors">Kashmiri Saffron</Link></li>
            <li><Link href="/shop" className="hover:text-terracotta transition-colors">Kahwa Collection</Link></li>
            <li><Link href="/shop" className="hover:text-terracotta transition-colors">Kashmiri Honey</Link></li>
            <li><Link href="/shop" className="hover:text-terracotta transition-colors">Dry Fruits</Link></li>
            <li><Link href="/shop" className="hover:text-terracotta transition-colors">Gift Sets</Link></li>
            <li><Link href="/shop" className="hover:text-terracotta transition-colors">All Products</Link></li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h3 className="font-serif text-lg text-text-dark mb-4">Information</h3>
          <ul className="space-y-3 font-sans text-sm text-text-muted">
            <li><Link href="/about-kashmir" className="hover:text-terracotta transition-colors">About Kashmir</Link></li>
            <li><Link href="/our-story" className="hover:text-terracotta transition-colors">Our Story</Link></li>
            <li><Link href="/blog" className="hover:text-terracotta transition-colors">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-terracotta transition-colors">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:text-terracotta transition-colors">FAQ</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="font-serif text-lg text-text-dark mb-4">Customer Care</h3>
          <ul className="space-y-3 font-sans text-sm text-text-muted">
            <li><Link href="/shipping" className="hover:text-terracotta transition-colors">Shipping Policy</Link></li>
            <li><Link href="/returns" className="hover:text-terracotta transition-colors">Returns & Refund</Link></li>
            <li><Link href="/privacy" className="hover:text-terracotta transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-terracotta transition-colors">Terms & Conditions</Link></li>
            <li><Link href="/track-order" className="hover:text-terracotta transition-colors">Track Order</Link></li>
          </ul>
        </div>

        {/* Certs & Payments */}
        <div>
          <h3 className="font-serif text-lg text-text-dark mb-4">Certifications</h3>
          <div className="flex flex-col gap-2 mb-6">
            <span className="text-xs border border-gold-antique/30 px-3 py-1 text-center text-text-dark bg-gold-antique/5 uppercase tracking-widest font-medium">GI Tagged Origin</span>
            <span className="text-xs border border-gold-antique/30 px-3 py-1 text-center text-text-dark bg-gold-antique/5 uppercase tracking-widest font-medium">100% Organic</span>
            <span className="text-xs border border-gold-antique/30 px-3 py-1 text-center text-text-dark bg-gold-antique/5 uppercase tracking-widest font-medium">Lab Tested</span>
          </div>
          <h3 className="font-serif text-lg text-text-dark mb-4">We Accept</h3>
          <div className="flex gap-2">
            <span className="text-[10px] font-bold bg-white text-text-dark border border-sand-medium px-2 py-1 rounded-sm">VISA</span>
            <span className="text-[10px] font-bold bg-white text-text-dark border border-sand-medium px-2 py-1 rounded-sm">MC</span>
            <span className="text-[10px] font-bold bg-white text-text-dark border border-sand-medium px-2 py-1 rounded-sm">RUPAY</span>
            <span className="text-[10px] font-bold bg-white text-text-dark border border-sand-medium px-2 py-1 rounded-sm">UPI</span>
          </div>
        </div>

      </div>

      <div className="border-t border-sand-medium/40 py-6 text-center text-xs text-text-muted/65 font-sans">
        <p>&copy; {new Date().getFullYear()} Kashmir Cart. All Rights Reserved.</p>
      </div>
      </FooterClientWrapper>
    </footer>
  );
}
