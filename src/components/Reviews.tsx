"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

const REVIEWS = [
  {
    quote: "The saffron aroma is absolutely divine — a deep crimson color and the most authentic flavor I've ever experienced. Worth every rupee!",
    name: "Neha Sharma",
    location: "Delhi",
    rating: 5,
  },
  {
    quote: "I've been using the Shilajit for 3 months now — the energy and clarity I feel is unmatched. Lab-tested quality gives me full confidence.",
    name: "Arjun Mehta",
    location: "Bangalore",
    rating: 5,
  },
  {
    quote: "The Kahwa tea is so refreshing and pure. I brew it every morning and it genuinely feels like a sip of Kashmir in every cup.",
    name: "Priya Iyer",
    location: "Mumbai",
    rating: 5,
  },
];

export default function Reviews() {
  return (
    <section className="py-24 bg-3d-paper border-b border-sand-medium relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-[13px] font-bold uppercase tracking-[0.35em] text-[#cc6a12] mb-3">
            TESTIMONIALS
          </p>
          <h2 className="font-serif text-4xl md:text-5.5xl text-text-dark font-semibold mb-4">
            Voices of Provenance
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-antique/50" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold-antique/60" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-antique/50" />
          </div>
        </motion.div>

        {/* 3-Column Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="bg-white border border-sand-medium p-8 pt-10 flex flex-col justify-between text-center group transition-all duration-500 hover:shadow-lg hover:border-gold-antique/50 rounded-sm hover:-translate-y-1.5 transform-gpu will-change-transform"
            >
              {/* Luxury Quote Mark */}
              <span className="font-serif text-[56px] leading-none text-gold-antique/30 font-bold -mt-2 -mb-2 block">“</span>

              {/* Stars */}
              <div className="flex justify-center gap-0.5 mb-5">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold-antique text-gold-antique" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-serif text-[15px] italic text-text-dark leading-relaxed flex-grow mb-6">
                &quot;{review.quote}&quot;
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-sand-medium">
                <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-[#cc6a12] block">
                  {review.name}
                </span>
                <span className="font-sans text-[9px] uppercase tracking-wider text-text-muted mt-1.5 block">
                  {review.location} · Verified Buyer
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
