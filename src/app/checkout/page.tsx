import { Metadata } from "next";
import { ShieldCheck, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Checkout | Kashmir Heritage",
  description: "Secure checkout for Kashmir Heritage.",
};

export default function CheckoutPage() {
  return (
    <div className="pt-28 pb-24 bg-parchment-base min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl md:text-4xl text-maroon-royal uppercase tracking-wider mb-2">
            Secure Checkout
          </h1>
          <div className="flex items-center justify-center gap-2 text-text-muted font-sans text-sm">
            <Lock className="w-4 h-4" /> <span>256-bit SSL Encryption</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Form */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-parchment-light border border-gold-antique p-8">
              <h2 className="font-serif text-2xl text-maroon-royal mb-6 border-b border-gold-antique/30 pb-4">
                1. Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Email Address *</label>
                  <input type="email" className="w-full bg-white border border-gold-antique/50 px-4 py-3 outline-none focus:border-maroon-royal transition-colors" />
                </div>
                <div>
                  <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">First Name *</label>
                  <input type="text" className="w-full bg-white border border-gold-antique/50 px-4 py-3 outline-none focus:border-maroon-royal transition-colors" />
                </div>
                <div>
                  <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Last Name *</label>
                  <input type="text" className="w-full bg-white border border-gold-antique/50 px-4 py-3 outline-none focus:border-maroon-royal transition-colors" />
                </div>
              </div>
            </div>

            <div className="bg-parchment-light border border-gold-antique p-8">
              <h2 className="font-serif text-2xl text-maroon-royal mb-6 border-b border-gold-antique/30 pb-4">
                2. Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Address *</label>
                  <input type="text" className="w-full bg-white border border-gold-antique/50 px-4 py-3 outline-none focus:border-maroon-royal transition-colors" />
                </div>
                <div>
                  <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">City *</label>
                  <input type="text" className="w-full bg-white border border-gold-antique/50 px-4 py-3 outline-none focus:border-maroon-royal transition-colors" />
                </div>
                <div>
                  <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Postal Code *</label>
                  <input type="text" className="w-full bg-white border border-gold-antique/50 px-4 py-3 outline-none focus:border-maroon-royal transition-colors" />
                </div>
              </div>
            </div>

            <div className="bg-parchment-light border border-gold-antique p-8">
              <h2 className="font-serif text-2xl text-maroon-royal mb-6 border-b border-gold-antique/30 pb-4">
                3. Payment Method
              </h2>
              <div className="p-4 border border-maroon-royal bg-maroon-royal/5 flex items-center gap-3 mb-4 cursor-pointer">
                <input type="radio" name="payment" id="cc" defaultChecked className="accent-maroon-royal w-4 h-4" />
                <label htmlFor="cc" className="font-sans font-semibold text-maroon-royal uppercase tracking-wider text-sm cursor-pointer">Credit / Debit Card</label>
              </div>
              <div className="p-4 border border-gold-antique/50 bg-white flex items-center gap-3 cursor-pointer">
                <input type="radio" name="payment" id="upi" className="accent-maroon-royal w-4 h-4" />
                <label htmlFor="upi" className="font-sans font-semibold text-text-muted uppercase tracking-wider text-sm cursor-pointer">UPI / Razorpay</label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-parchment-light border border-gold-antique p-8 sticky top-32">
              <h2 className="font-serif text-2xl text-maroon-royal mb-6 border-b border-gold-antique/30 pb-4">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6 pb-6 border-b border-gold-antique/30">
                <div className="flex justify-between font-sans text-sm">
                  <span className="text-text-muted">Premium Kashmiri Saffron Grade A++ (1g) x 1</span>
                  <span className="font-semibold text-maroon-royal">₹2,999</span>
                </div>
              </div>

              <div className="space-y-2 mb-6 pb-6 border-b border-gold-antique/30 font-sans text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">Subtotal</span>
                  <span className="font-semibold text-maroon-royal">₹2,999</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Shipping</span>
                  <span className="font-semibold text-gold-dark uppercase text-xs">Free</span>
                </div>
              </div>

              <div className="flex justify-between font-serif text-2xl text-maroon-royal mb-8">
                <span>Total</span>
                <span className="font-semibold">₹2,999</span>
              </div>

              <button className="w-full py-4 bg-maroon-royal text-text-white font-sans text-sm font-semibold uppercase tracking-[0.15em] border-[1.5px] border-gold-antique hover:bg-maroon-dark hover:border-gold-light hover:text-gold-light transition-all mb-4 flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" /> Place Order
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-text-muted font-sans mt-4">
                <ShieldCheck className="w-4 h-4 text-gold-dark" /> Authentic Kashmiri Products
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
