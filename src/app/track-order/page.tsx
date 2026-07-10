"use client";

import { useState } from "react";
import { Package, Truck, Search, Loader2 } from "lucide-react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<any>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setStatus({
        id: orderId,
        status: "In Transit",
        carrier: "BlueDart Express",
        estimatedDelivery: "July 02, 2026",
        currentLocation: "Delhi Transit Hub",
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="pt-28 pb-24 bg-parchment-base min-h-screen">
      <div className="max-w-xl mx-auto px-6 font-sans">
        
        <div className="text-center mb-10">
          <Package className="w-12 h-12 text-gold-dark mx-auto mb-4" />
          <h1 className="font-serif text-3xl text-maroon-royal uppercase tracking-wider mb-2">
            Track Your Shipment
          </h1>
          <p className="text-xs text-text-muted uppercase tracking-widest">
            Enter order identifier to fetch live tracking records
          </p>
        </div>

        <div className="bg-parchment-light border border-gold-antique p-8 relative shadow-lg">
          <div className="absolute inset-1.5 border border-gold-antique/25 pointer-events-none" />
          
          <form onSubmit={handleTrack} className="space-y-4 relative z-10">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">Order ID or tracking number</label>
              <div className="flex gap-2">
                <input
                  type="text" required value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. KH-5"
                  className="flex-grow bg-white border border-gold-antique/40 px-3.5 py-2.5 outline-none focus:border-maroon-royal text-sm"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 bg-maroon-royal hover:bg-maroon-dark text-text-white text-xs font-bold uppercase tracking-wider border border-gold-antique transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Search className="w-3.5 h-3.5" />
                  )}
                  {loading ? "SEARCHING..." : "TRACK"}
                </button>
              </div>
            </div>
          </form>

          {status && (
            <div className="mt-8 border-t border-gold-antique/20 pt-6 space-y-4 relative z-10 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Order ID:</span>
                <span className="font-bold text-maroon-royal">#{status.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Delivery Status:</span>
                <span className="font-bold text-forest-green flex items-center gap-1">
                  <Truck className="w-4 h-4" /> {status.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Carrier Service:</span>
                <span className="font-semibold text-text-muted">{status.carrier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Current Location:</span>
                <span className="font-semibold text-text-muted">{status.currentLocation}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gold-antique/10">
                <span className="text-text-muted">Estimated Delivery:</span>
                <span className="font-bold text-maroon-royal">{status.estimatedDelivery}</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
