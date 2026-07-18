"use client";

import { motion } from "framer-motion";

const PUBLICATIONS = [
  { name: "Times of India", desc: "Digital Press" },
  { name: "Hindustan Times", desc: "Himalayan Wellness Spotlight" },
  { name: "YourStory", desc: "Artisanal Impact Story" },
  { name: "Financial Express", desc: "Direct-to-Consumer Growth" },
  { name: "The Hindu", desc: "Pampore Saffron Heritage" }
];

export default function FeaturedPublications() {
  return (
    <section className="py-20 bg-white border-t border-b border-sand-medium relative overflow-hidden">
      <div className="absolute inset-0 bg-luxury-pattern opacity-[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <p className="font-sans text-[13px] font-bold uppercase tracking-[0.3em] text-[#cc6a12] mb-3">
            FEATURED ACROSS LEADING PUBLICATIONS
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-text-dark font-semibold tracking-tight leading-tight">
            Trusted By Thousands. <br />Recognised Across India&apos;s Digital Media.
          </h2>
          <div className="flex items-center justify-center gap-4 my-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-antique/40" />
            <div className="w-1 h-1 rotate-45 bg-gold-antique/50" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-antique/40" />
          </div>
          <p className="font-sans text-[14px] md:text-[15px] text-text-muted leading-relaxed max-w-3xl mx-auto font-medium">
            KashmirCart has been featured by leading online publications for bringing authentic Kashmiri saffron, Himalayan Shilajit, premium dry fruits, wellness products, and traditional Himalayan treasures directly from the valleys of Kashmir to customers across India.
          </p>
        </div>

        {/* Logos Display Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-center mt-12 max-w-5xl mx-auto">
          {PUBLICATIONS.map((pub, idx) => (
            <motion.div
              key={pub.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-sand-light border border-sand-medium/60 p-6 text-center hover:border-gold-antique/40 hover:shadow-md transition-all duration-300 rounded-sm relative group cursor-pointer"
            >
              <div className="absolute inset-1 border border-sand-medium/20 pointer-events-none group-hover:border-gold-antique/10 transition-colors rounded-sm" />
              
              <span className="font-serif text-[17px] font-extrabold uppercase tracking-widest text-text-dark/45 group-hover:text-[#cc6a12] transition-colors duration-300 block">
                {pub.name}
              </span>
              <span className="font-sans text-[8px] font-bold uppercase tracking-[0.2em] text-text-muted/60 mt-1 block">
                {pub.desc}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
