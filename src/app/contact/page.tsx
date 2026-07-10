"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="pt-28 pb-24 bg-parchment-base min-h-screen">
      <div className="max-w-6xl mx-auto px-6 font-sans">
        
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark mb-3 block">
            Get In Touch
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-maroon-royal leading-tight mb-6">
            Contact Palace Boutique
          </h1>
          <div className="flex items-center justify-center">
            <div className="h-[1px] w-16 bg-gold-antique"></div>
            <div className="w-3 h-3 rotate-45 border border-gold-antique mx-2"></div>
            <div className="h-[1px] w-16 bg-gold-antique"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Details */}
          <div className="bg-parchment-light border border-gold-antique p-8 relative flex flex-col justify-between">
            <div className="absolute inset-1.5 border border-gold-antique/25 pointer-events-none" />
            
            <div className="space-y-8 relative z-10">
              <h2 className="font-serif text-2xl text-maroon-royal mb-6 pb-2 border-b border-gold-antique/25">
                Our Corporate Offices
              </h2>
              <p className="text-text-muted leading-relaxed text-sm">
                For wholesale inquiries, laboratory batch certifications, bulk orders, or support questions, please feel free to reach out to our support team.
              </p>

              <div className="space-y-6 text-sm">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-gold-dark mt-0.5" />
                  <div>
                    <h3 className="font-serif text-maroon-royal font-semibold">Boutique & Factory Location</h3>
                    <p className="text-text-muted mt-1">Palace Road, Srinagar, Jammu & Kashmir - 190001</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-gold-dark mt-0.5" />
                  <div>
                    <h3 className="font-serif text-maroon-royal font-semibold">Client Hotline</h3>
                    <p className="text-text-muted mt-1">+91 98765 43210 (Mon-Sat, 9AM - 6PM)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-gold-dark mt-0.5" />
                  <div>
                    <h3 className="font-serif text-maroon-royal font-semibold">Support Desk</h3>
                    <p className="text-text-muted mt-1">contact@kashmirheritage.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gold-antique/20 pt-6 mt-8 text-xs text-gold-dark uppercase tracking-widest font-semibold relative z-10">
              GI Tagged Saffron origin guaranteed by laboratory testing.
            </div>
          </div>

          {/* Form */}
          <div className="bg-white border border-gold-antique/30 p-8 shadow-sm">
            <h2 className="font-serif text-2xl text-maroon-royal mb-6 pb-2 border-b border-gold-antique/20">
              Send Us A Message
            </h2>

            {submitted ? (
              <div className="bg-forest-green/5 border border-forest-green/30 text-forest-green p-6 text-center rounded-sm">
                <CheckCircle2 className="w-12 h-12 text-forest-green mx-auto mb-4" />
                <h3 className="font-semibold text-md mb-2">Message Sent Successfully</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Thank you for writing. An heritage concierge agent will reach back to your inquiry shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">Full Name *</label>
                  <input
                    type="text" required value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    className="w-full bg-white border border-gold-antique/40 px-3.5 py-2.5 outline-none focus:border-maroon-royal text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">Email Address *</label>
                  <input
                    type="email" required value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    className="w-full bg-white border border-gold-antique/40 px-3.5 py-2.5 outline-none focus:border-maroon-royal text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">Message / Inquiry *</label>
                  <textarea
                    required rows={5} value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                    className="w-full bg-white border border-gold-antique/40 px-3.5 py-2.5 outline-none focus:border-maroon-royal text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-maroon-royal text-text-white text-xs font-bold uppercase tracking-wider border border-gold-antique hover:bg-maroon-dark hover:text-gold-light transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
