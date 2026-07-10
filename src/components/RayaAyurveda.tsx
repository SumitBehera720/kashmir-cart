"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const TABS = [
  "All",
  "Ayurvedic Skincare",
  "Kashmiri Saffron",
  "Natural Beauty",
  "Rose Water",
  "Anti Aging",
  "Herbal Skincare",
  "Glowing Skin",
  "Premium Ayurveda"
];

const rayaProducts = [
  {
    name: "Kumkumadi Radiance Face Elixir",
    subCategory: "Ayurvedic Skincare",
    tagline: "Illuminating oil with pure Kashmiri Saffron & 26 rare herbs.",
    benefit: "Fades dark spots, improves texture, and restores golden youthfulness.",
    image: "/assets/images/product_saffron_jar.png"
  },
  {
    name: "Pure Kesar Infused Treatment Serum",
    subCategory: "Kashmiri Saffron",
    tagline: "Highly concentrated Pampore Saffron extract skin remedy.",
    benefit: "Deep cellular rejuvenation, intense radiance boost, and antioxidant cover.",
    image: "/assets/images/product_saffron_jar.png"
  },
  {
    name: "Himalayan Mud & Kesar Glow Mask",
    subCategory: "Natural Beauty",
    tagline: "Purifying clay mask enriched with saffron and rose petals.",
    benefit: "Extracts impurities, tightens pores, and gives an instant royal glow.",
    image: "/assets/images/product_saffron_jar.png"
  },
  {
    name: "Double-Distilled Kashmiri Rose Mist",
    subCategory: "Rose Water",
    tagline: "100% pure steam-distilled organic rose floral water.",
    benefit: "Hydrates instantly, balances skin pH, and cools irritated complexions.",
    image: "/assets/images/product_saffron_jar.png"
  },
  {
    name: "Shilajit & Kesar Anti-Wrinkle Night Cream",
    subCategory: "Anti Aging",
    tagline: "Restorative night cream with mineral-rich shilajit & saffron.",
    benefit: "Firms loose skin, fills fine lines, and boosts overnight collagen production.",
    image: "/assets/images/product_saffron_jar.png"
  },
  {
    name: "Neem, Basil & Turmeric Clarifying Gel",
    subCategory: "Herbal Skincare",
    tagline: "Non-stripping organic daily facial cleanser for clear skin.",
    benefit: "Deeply purifies pores, reduces acne breakouts, and calms redness.",
    image: "/assets/images/product_saffron_jar.png"
  },
  {
    name: "Saffron Brightening Hydra-Gel",
    subCategory: "Glowing Skin",
    tagline: "Lightweight oil-free cream for ultimate hydration.",
    benefit: "Provides 24-hour dewiness, locks in skin moisture, and brightens tone.",
    image: "/assets/images/product_saffron_jar.png"
  },
  {
    name: "Royal Kesar Rejuvenating Night Elixir",
    subCategory: "Premium Ayurveda",
    tagline: "Luxury gold-infused restorative overnight oil.",
    benefit: "Enhances skin elasticity, combats dullness, and gives unparalleled luster.",
    image: "/assets/images/product_saffron_jar.png"
  }
];

export default function RayaAyurveda() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProducts = activeTab === "All"
    ? rayaProducts
    : rayaProducts.filter(p => p.subCategory === activeTab);

  return (
    <section className="py-24 bg-gradient-to-tr from-[#faf5ef] via-[#faf5ef] to-[#f4e9dd] border-y border-sand-medium relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-luxury-pattern opacity-[0.03] pointer-events-none" />
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gold-antique/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-terracotta/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-sans text-[13px] font-bold uppercase tracking-[0.4em] text-[#cc6a12] mb-3">
              Introducing
            </p>
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-antique" />
              <h2 className="font-serif text-4xl md:text-6xl text-text-dark tracking-tight font-semibold text-glow-gold">
                RAYA <span className="text-gold-antique italic font-medium">Ayurveda</span>
              </h2>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-antique" />
            </div>
            <p className="font-serif text-xl text-text-muted italic mb-4">
              Skincare Collection
            </p>
            <p className="font-sans text-[15px] text-text-muted max-w-2xl mx-auto leading-relaxed">
              Ancient Ayurvedic wisdom meets modern skincare science. Each RAYA formula is crafted with 
              Himalayan botanicals, lab-tested ingredients, and zero harsh chemicals — designed for the 
              discerning skin that deserves only the finest nature has to offer.
            </p>
          </motion.div>
        </div>

        {/* Category Tabs with Premium Sliding Background */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 border relative rounded-sm ${
                activeTab === tab
                  ? "text-white border-terracotta z-10"
                  : "bg-white text-text-muted border-sand-medium hover:bg-sand-light hover:text-text-dark"
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeRayaTab"
                  className="absolute inset-0 bg-terracotta rounded-sm"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {tab}
            </button>
          ))}
        </div>

        {/* Products Display */}
        <div className="min-h-[300px]">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.name}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  className="group transform-gpu will-change-transform"
                >
                  <div className="bg-white border border-sand-medium p-6 text-center hover:shadow-md hover:border-gold-antique/40 transition-all duration-300 h-full flex flex-col gap-4 relative rounded-sm">
                    {/* Decorative top line */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-gold-antique to-terracotta" />

                    {/* Subcategory Label */}
                    <span className="text-[8px] font-bold uppercase tracking-widest text-[#cc6a12] block mt-1">
                      {product.subCategory}
                    </span>

                    {/* Skincare Product Image Placeholder */}
                    <div className="w-full aspect-square relative overflow-hidden bg-[#fafafa] border border-sand-medium flex items-center justify-center p-4 rounded-sm">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="max-h-full max-w-full object-contain group-hover:scale-103 transition-transform duration-500" 
                      />
                    </div>

                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-[15px] text-text-dark font-medium mb-2 leading-tight">
                          {product.name}
                        </h3>
                        <p className="font-sans text-[12px] text-gold-antique italic mb-3 leading-relaxed">
                          {product.tagline}
                        </p>
                      </div>
                      <p className="font-sans text-[11px] text-text-muted leading-relaxed mt-2 border-t border-sand-light pt-3">
                        {product.benefit}
                      </p>
                    </div>

                    <Link
                      href="/raya-ayurveda"
                      className="mt-auto inline-block text-[10px] font-bold uppercase tracking-widest text-text-dark border-b border-text-dark/40 pb-px hover:border-text-dark transition-colors"
                    >
                      Shop Now →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/raya-ayurveda"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-terracotta text-white font-sans text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-terracotta-hover transition-colors shadow-md rounded-sm"
          >
            Explore RAYA Collection →
          </Link>
        </div>

      </div>
    </section>
  );
}
