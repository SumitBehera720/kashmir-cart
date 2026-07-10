"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
    image: "/assets/images/product_saffron_jar.png",
    price: "₹3,499"
  },
  {
    name: "Pure Kesar Infused Treatment Serum",
    subCategory: "Kashmiri Saffron",
    tagline: "Highly concentrated Pampore Saffron extract skin remedy.",
    benefit: "Deep cellular rejuvenation, intense radiance boost, and antioxidant cover.",
    image: "/assets/images/product_saffron_jar.png",
    price: "₹2,999"
  },
  {
    name: "Himalayan Mud & Kesar Glow Mask",
    subCategory: "Natural Beauty",
    tagline: "Purifying clay mask enriched with saffron and rose petals.",
    benefit: "Extracts impurities, tightens pores, and gives an instant royal glow.",
    image: "/assets/images/product_saffron_jar.png",
    price: "₹1,899"
  },
  {
    name: "Double-Distilled Kashmiri Rose Mist",
    subCategory: "Rose Water",
    tagline: "100% pure steam-distilled organic rose floral water.",
    benefit: "Hydrates instantly, balances skin pH, and cools irritated complexions.",
    image: "/assets/images/product_saffron_jar.png",
    price: "₹890"
  },
  {
    name: "Shilajit & Kesar Anti-Wrinkle Night Cream",
    subCategory: "Anti Aging",
    tagline: "Restorative night cream with mineral-rich shilajit & saffron.",
    benefit: "Firms loose skin, fills fine lines, and boosts overnight collagen production.",
    image: "/assets/images/product_saffron_jar.png",
    price: "₹2,499"
  },
  {
    name: "Neem, Basil & Turmeric Clarifying Gel",
    subCategory: "Herbal Skincare",
    tagline: "Non-stripping organic daily facial cleanser for clear skin.",
    benefit: "Deeply purifies pores, reduces acne breakouts, and calms redness.",
    image: "/assets/images/product_saffron_jar.png",
    price: "₹950"
  },
  {
    name: "Saffron Brightening Hydra-Gel",
    subCategory: "Glowing Skin",
    tagline: "Lightweight oil-free cream for ultimate hydration.",
    benefit: "Provides 24-hour dewiness, locks in skin moisture, and brightens tone.",
    image: "/assets/images/product_saffron_jar.png",
    price: "₹1,490"
  },
  {
    name: "Royal Kesar Rejuvenating Night Elixir",
    subCategory: "Premium Ayurveda",
    tagline: "Luxury gold-infused restorative overnight oil.",
    benefit: "Enhances skin elasticity, combats dullness, and gives unparalleled luster.",
    image: "/assets/images/product_saffron_jar.png",
    price: "₹4,200"
  }
];

export default function RayaAyurvedaPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProducts = activeTab === "All"
    ? rayaProducts
    : rayaProducts.filter(p => p.subCategory === activeTab);

  return (
    <div className="pt-28 pb-24 bg-[#fdfaf4] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-[#8c672b] hover:text-[#3d0c11] transition-colors mb-8 text-sm font-semibold uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-[#8c672b] mb-3 font-semibold">
            Premium Skincare Range
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-[#3d0c11] uppercase tracking-wider mb-6">
            RAYA <span className="text-[#8c672b] italic">Ayurveda</span>
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-[#cba358]/50" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#cba358]/60" />
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-[#cba358]/50" />
          </div>
          <p className="font-sans text-sm text-[#5a4a3a] max-w-3xl mx-auto mt-6 leading-relaxed">
            Ancient Ayurvedic wisdom meets modern skincare science. Each RAYA formula is crafted with 
            Himalayan botanicals, lab-tested ingredients, and zero harsh chemicals — designed for the 
            discerning skin that deserves only the finest nature has to offer.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 max-w-4xl mx-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 border ${
                activeTab === tab
                  ? "bg-[#3d0c11] text-[#d6af65] border-[#3d0c11] shadow-md"
                  : "bg-white text-[#8c672b] border-[#cba358]/35 hover:bg-[#fdf5e8] hover:border-[#cba358]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="min-h-[400px]">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white border border-[#cba358]/30 p-6 flex flex-col justify-between relative hover:shadow-2xl hover:border-[#cba358]/70 transition-all duration-300"
                >
                  <div>
                    {/* Decorative top line */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#cba358] to-[#3d0c11]" />

                    {/* Subcategory Label */}
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#8c672b] block mb-4">
                      {product.subCategory}
                    </span>

                    {/* Image */}
                    <div className="w-full aspect-square relative overflow-hidden bg-[#fdfaf4] border border-[#cba358]/20 flex items-center justify-center p-6 mb-6">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>

                    <h3 className="font-serif text-lg text-[#3d0c11] font-semibold mb-2 leading-tight">
                      {product.name}
                    </h3>
                    <p className="font-sans text-xs text-[#8c672b] italic mb-4 leading-relaxed">
                      {product.tagline}
                    </p>
                    <p className="font-sans text-xs text-[#5a4a3a] leading-relaxed border-t border-[#fdf5e8] pt-4 mb-4">
                      {product.benefit}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#fdf5e8] flex items-center justify-between">
                    <span className="font-serif text-lg font-bold text-[#3d0c11]">{product.price}</span>
                    <Link
                      href="/checkout"
                      className="px-4 py-2 bg-[#3d0c11] text-[#d6af65] font-serif text-[10px] font-bold tracking-widest uppercase hover:bg-[#6b1f28] transition-colors"
                    >
                      Buy Now
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
