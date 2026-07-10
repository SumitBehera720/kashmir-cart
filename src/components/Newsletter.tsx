"use client";

import { Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Newsletter() {
  return (
    <section className="py-20 bg-maroon-dark text-white border-b border-sand-medium relative overflow-hidden">
      {/* Ornate Inner Frame */}
      <div className="absolute inset-[8px] border border-gold-antique/30 pointer-events-none rounded-sm z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10 relative z-20"
      >
        
        {/* Left: Text */}
        <div className="flex items-center gap-6 md:w-1/2">
          <div className="text-gold-light hidden sm:block">
            <Mail className="w-12 h-12" strokeWidth={1} />
          </div>
          <div className="text-left">
            <h2 className="font-serif text-2xl md:text-3.5xl text-gold-light uppercase tracking-wide mb-2 text-glow-gold font-semibold">
              Join The Kashmir Journal
            </h2>
            <p className="font-sans text-[13.5px] text-text-white/80">
              Receive stories, offers and heritage discoveries direct from the valleys.
            </p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="w-full md:w-1/2">
          <form className="flex w-full animate-pulse-subtle" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow bg-[#1b0204] border border-gold-antique/30 px-5 py-4 font-sans text-[15px] text-white placeholder-white/35 focus:outline-none focus:border-gold-light rounded-l-sm"
              required
            />
            <button
              type="submit"
              className="bg-terracotta text-white font-sans text-[12px] font-bold uppercase tracking-widest px-8 transition-colors hover:bg-terracotta-hover whitespace-nowrap rounded-r-sm shadow-md shimmer-effect cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>

      </motion.div>
    </section>
  );
}
