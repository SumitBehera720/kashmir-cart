"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, ArrowLeft, Loader2, CheckCircle2, ShoppingBag, MapPin, CreditCard } from "lucide-react";
import Link from "next/link";
import { placeOrder, fetchProducts } from "@/data/api";

export default function CheckoutPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [cartItem, setCartItem] = useState({
    product_id: 1, // Default Saffron ID
    name: "Premium Kashmiri Saffron Grade A++ (1g)",
    price: 2999,
    quantity: 1,
  });

  const [paymentMethod, setPaymentMethod] = useState("cod"); // "cod", "card", "upi"
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [placedOrder, setPlacedOrder] = useState<any>(null);

  useEffect(() => {
    // Check authentication
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData((prev) => ({
        ...prev,
        email: parsedUser.email || "",
        firstName: parsedUser.name?.split(" ")[0] || "",
        lastName: parsedUser.name?.split(" ").slice(1).join(" ") || "",
      }));
    }

    // Try to load dynamic product if configured, or fall back to default
    fetchProducts().then(products => {
      if (products && products.length > 0) {
        const saffron = products.find((p: any) => p.slug === "premium-kashmiri-saffron") || products[0];
        setCartItem({
          product_id: saffron.id,
          name: saffron.name,
          price: parseFloat(saffron.price),
          quantity: 1,
        });
      }
    }).catch(err => console.log("Failed loading catalog", err));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("Please sign in to place an order.");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const orderData = {
      shipping_address: `${formData.firstName} ${formData.lastName}, ${formData.address}, ${formData.city} - ${formData.postalCode}`,
      payment_method: paymentMethod,
      items: [
        {
          product_id: cartItem.product_id,
          quantity: cartItem.quantity,
        }
      ]
    };

    try {
      const res = await placeOrder(orderData, token);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to place your order.");
      }

      setPlacedOrder(data.order);
      setSuccess("Order placed successfully!");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // If order is placed, show confirmation screen/receipt
  if (placedOrder) {
    return (
      <div className="pt-28 pb-24 bg-parchment-base min-h-screen flex items-center justify-center font-sans">
        <div className="max-w-xl w-full mx-6 bg-parchment-light border-[1.5px] border-gold-antique p-8 relative shadow-2xl">
          <div className="absolute inset-1.5 border border-gold-antique/30 pointer-events-none" />
          
          <div className="text-center mb-8 relative z-20">
            <CheckCircle2 className="w-16 h-16 text-forest-green mx-auto mb-4" />
            <h1 className="font-serif text-3xl text-maroon-royal uppercase tracking-wider mb-2">
              Order Confirmed
            </h1>
            <p className="text-xs text-text-muted uppercase tracking-widest">
              Thank you for shopping at Palace Boutique
            </p>
          </div>

          <div className="space-y-6 relative z-20 border-t border-b border-gold-antique/20 py-6 mb-8 text-sm">
            <div className="flex justify-between items-center pb-3 border-b border-gold-antique/10">
              <span className="text-text-muted">Order ID</span>
              <span className="font-semibold text-maroon-royal">#KH-{placedOrder.id}</span>
            </div>
            
            <div className="space-y-2">
              <span className="font-semibold text-xs text-gold-dark uppercase tracking-wider flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5" /> Items ordered
              </span>
              <div className="flex justify-between pl-5">
                <span className="text-text-muted">{cartItem.name} x {cartItem.quantity}</span>
                <span className="font-semibold text-maroon-royal">₹{cartItem.price.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-semibold text-xs text-gold-dark uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Shipping Address
              </span>
              <p className="text-text-muted pl-5 leading-relaxed">{placedOrder.shipping_address}</p>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-semibold text-xs text-gold-dark uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5" /> Payment Method
              </span>
              <span className="text-maroon-royal uppercase font-bold text-xs tracking-wider bg-maroon-royal/5 border border-maroon-royal/20 px-2.5 py-1">
                {placedOrder.payment_method === "cod" ? "Cash On Delivery (COD)" : placedOrder.payment_method === "card" ? "Credit/Debit Card" : "UPI"}
              </span>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gold-antique/10 font-serif text-2xl text-maroon-royal">
              <span>Total Paid</span>
              <span className="font-bold">₹{parseFloat(placedOrder.total_amount).toLocaleString("en-IN")}</span>
            </div>
          </div>

          <div className="text-center relative z-20">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 py-3.5 px-8 bg-maroon-royal text-text-white font-sans text-xs font-semibold uppercase tracking-[0.15em] border-[1.5px] border-gold-antique hover:bg-maroon-dark hover:border-gold-light hover:text-gold-light transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-parchment-base min-h-screen">
      <div className="max-w-6xl mx-auto px-6 font-sans">
        
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl md:text-4xl text-maroon-royal uppercase tracking-wider mb-2">
            Secure Checkout
          </h1>
          <div className="flex items-center justify-center gap-2 text-text-muted font-sans text-sm">
            <Lock className="w-4 h-4 text-gold-dark" /> <span>256-bit SSL Encryption</span>
          </div>
        </div>

        {!token && (
          <div className="max-w-4xl mx-auto mb-8 bg-gold-antique/10 border border-gold-antique/30 p-4 text-center text-sm text-maroon-royal flex items-center justify-between">
            <span>Already have an account? Sign in for faster checkout.</span>
            <Link href="/login" className="px-4 py-1.5 bg-maroon-royal text-text-white text-xs font-bold uppercase tracking-wider hover:bg-maroon-dark transition-colors">
              Sign In
            </Link>
          </div>
        )}

        {error && (
          <div className="max-w-4xl mx-auto mb-8 bg-maroon-royal/5 border border-maroon-royal/30 p-4 text-center text-sm text-maroon-royal">
            {error}
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Form fields */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-parchment-light border border-gold-antique p-8">
              <h2 className="font-serif text-2xl text-maroon-royal mb-6 border-b border-gold-antique/30 pb-4">
                1. Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-gold-antique/50 px-4 py-3 outline-none focus:border-maroon-royal transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-gold-antique/50 px-4 py-3 outline-none focus:border-maroon-royal transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-gold-antique/50 px-4 py-3 outline-none focus:border-maroon-royal transition-colors text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="bg-parchment-light border border-gold-antique p-8">
              <h2 className="font-serif text-2xl text-maroon-royal mb-6 border-b border-gold-antique/30 pb-4">
                2. Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Address *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-gold-antique/50 px-4 py-3 outline-none focus:border-maroon-royal transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-gold-antique/50 px-4 py-3 outline-none focus:border-maroon-royal transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Postal Code *</label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-gold-antique/50 px-4 py-3 outline-none focus:border-maroon-royal transition-colors text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="bg-parchment-light border border-gold-antique p-8">
              <h2 className="font-serif text-2xl text-maroon-royal mb-6 border-b border-gold-antique/30 pb-4">
                3. Payment Method
              </h2>
              
              <div className="space-y-4">
                <div className={`p-4 border ${paymentMethod === 'cod' ? 'border-maroon-royal bg-maroon-royal/5' : 'border-gold-antique/40 bg-white'} flex items-center gap-3 cursor-pointer`} onClick={() => setPaymentMethod("cod")}>
                  <input type="radio" name="payment" id="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod("cod")} className="accent-maroon-royal w-4 h-4" />
                  <label htmlFor="cod" className="font-sans font-semibold text-maroon-royal uppercase tracking-wider text-sm cursor-pointer">Cash on Delivery (COD)</label>
                </div>
                
                <div className={`p-4 border ${paymentMethod === 'card' ? 'border-maroon-royal bg-maroon-royal/5' : 'border-gold-antique/40 bg-white'} flex items-center gap-3 cursor-pointer`} onClick={() => setPaymentMethod("card")}>
                  <input type="radio" name="payment" id="cc" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod("card")} className="accent-maroon-royal w-4 h-4" />
                  <label htmlFor="cc" className="font-sans font-semibold text-text-muted uppercase tracking-wider text-sm cursor-pointer">Credit / Debit Card</label>
                </div>

                <div className={`p-4 border ${paymentMethod === 'upi' ? 'border-maroon-royal bg-maroon-royal/5' : 'border-gold-antique/40 bg-white'} flex items-center gap-3 cursor-pointer`} onClick={() => setPaymentMethod("upi")}>
                  <input type="radio" name="payment" id="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod("upi")} className="accent-maroon-royal w-4 h-4" />
                  <label htmlFor="upi" className="font-sans font-semibold text-text-muted uppercase tracking-wider text-sm cursor-pointer">UPI / Razorpay</label>
                </div>
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
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">{cartItem.name} x {cartItem.quantity}</span>
                  <span className="font-semibold text-maroon-royal">₹{cartItem.price.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="space-y-2 mb-6 pb-6 border-b border-gold-antique/30 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">Subtotal</span>
                  <span className="font-semibold text-maroon-royal">₹{cartItem.price.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Shipping</span>
                  <span className="font-semibold text-gold-dark uppercase text-xs">Free</span>
                </div>
              </div>

              <div className="flex justify-between font-serif text-2xl text-maroon-royal mb-8">
                <span>Total</span>
                <span className="font-semibold">₹{cartItem.price.toLocaleString("en-IN")}</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-maroon-royal text-text-white font-sans text-sm font-semibold uppercase tracking-[0.15em] border-[1.5px] border-gold-antique hover:bg-maroon-dark hover:border-gold-light hover:text-gold-light transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Lock className="w-4 h-4" />
                )}
                {loading ? "PLACING ORDER..." : "Place Order"}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-text-muted mt-4">
                <ShieldCheck className="w-4 h-4 text-gold-dark" /> Authentic Kashmiri Products
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
