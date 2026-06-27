"use client";

import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-20 bg-pattern-maroon text-text-white ornate-border-top border-b border-gold-antique/30">
      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left: Text */}
        <div className="flex items-center gap-6 md:w-1/2">
          <div className="text-gold-light hidden sm:block">
            <Mail className="w-12 h-12" strokeWidth={1} />
          </div>
          <div>
            <h2 className="font-serif text-xl md:text-2xl text-gold-light uppercase tracking-wider mb-2">
              Join The Kashmir Journal
            </h2>
            <p className="font-sans text-[11px] text-text-white/80">
              Receive stories, offers and heritage discoveries.
            </p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="w-full md:w-1/2">
          <form className="flex w-full" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow bg-maroon-dark border border-gold-antique/50 px-4 py-3 font-sans text-sm text-text-white placeholder-text-white/40 focus:outline-none focus:border-gold-light"
              required
            />
            <button
              type="submit"
              className="bg-gold-antique text-maroon-deep font-sans text-[11px] font-bold uppercase tracking-widest px-6 transition-colors hover:bg-gold-light whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
