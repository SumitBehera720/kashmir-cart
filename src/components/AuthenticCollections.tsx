"use client";

import { motion } from "framer-motion";
import { Sparkles, Mountain, Droplets, Heart, Coffee, Activity, Sprout, Leaf, Sun, Flame, Compass, Shield } from "lucide-react";
import Link from "next/link";

const COLLECTIONS = [
  {
    name: "Pure Kashmiri Saffron",
    description: "Authentic Pampore Mongra saffron renowned for aroma, color and purity.",
    icon: Sparkles,
    color: "text-[#cc6a12] bg-[#cc6a12]/5"
  },
  {
    name: "Markhor Shilajit",
    description: "Lab-tested Himalayan Shilajit resin sourced from high-altitude mountains.",
    icon: Mountain,
    color: "text-stone-700 bg-stone-100"
  },
  {
    name: "Raw Himalayan Honey",
    description: "Natural forest honey collected from pristine Himalayan landscapes.",
    icon: Droplets,
    color: "text-orange-600 bg-orange-50"
  },
  {
    name: "Premium Kashmiri Nuts",
    description: "Fresh almonds, walnuts and nutrient-rich dry fruits from Kashmir.",
    icon: Heart,
    color: "text-amber-800 bg-amber-50"
  },
  {
    name: "Kashmiri Kehwa & Tea",
    description: "Traditional saffron-infused tea blends inspired by Kashmiri heritage.",
    icon: Coffee,
    color: "text-emerald-700 bg-emerald-50"
  },
  {
    name: "Raya Ayurveda Skin Care",
    description: "Ayurvedic skincare crafted with saffron, herbs and natural botanicals.",
    icon: Shield,
    color: "text-rose-700 bg-rose-50"
  },
  {
    name: "Pahadi Garlic",
    description: "Mountain-grown garlic valued for traditional wellness benefits.",
    icon: Activity,
    color: "text-stone-600 bg-stone-50"
  },
  {
    name: "Gucci Mushrooms",
    description: "Rare wild Himalayan mushrooms treasured for culinary excellence.",
    icon: Sprout,
    color: "text-yellow-700 bg-yellow-50"
  },
  {
    name: "Lavender Oil",
    description: "Premium essential oil distilled from Kashmir lavender fields.",
    icon: Leaf,
    color: "text-violet-600 bg-violet-50"
  },
  {
    name: "Kashmiri Dried Fruits",
    description: "Hand-selected dried fruits naturally preserved for freshness.",
    icon: Sun,
    color: "text-orange-500 bg-orange-50"
  },
  {
    name: "Authentic Kashmiri Spices",
    description: "Traditional spices delivering rich aroma and heritage flavour.",
    icon: Flame,
    color: "text-red-600 bg-red-50"
  },
  {
    name: "Wild Himalayan Berries",
    description: "Nutrient-dense berries sourced from untouched Himalayan regions.",
    icon: Compass,
    color: "text-red-700 bg-red-50"
  },
  {
    name: "Kashmiri Red Chilli",
    description: "Famous for vibrant color, mild heat and distinctive flavour.",
    icon: Flame,
    color: "text-red-800 bg-red-50"
  }
];

export default function AuthenticCollections() {
  return (
    <section className="py-24 bg-sand-light border-b border-sand-medium relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-luxury-pattern opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <p className="font-sans text-[13px] font-bold uppercase tracking-[0.3em] text-[#cc6a12] mb-3">
            DIRECT FROM KASHMIR &bull; TRUSTED SINCE 2016
          </p>
          <h2 className="font-serif text-4xl md:text-5.5xl text-text-dark font-semibold tracking-tight leading-tight">
            Explore Our Complete Collection of Authentic Kashmiri Products
          </h2>
          <div className="flex items-center justify-center gap-4 my-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-antique/50" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold-antique/60" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-antique/50" />
          </div>
        </div>

        {/* 13 Item Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {COLLECTIONS.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.05 }}
                className="bg-white border border-sand-medium p-6 rounded-sm relative group hover:shadow-lg hover:border-gold-antique/50 transition-all duration-300 flex flex-col gap-4 text-left"
              >
                {/* Subtle outer/inner frame design */}
                <div className="absolute inset-2.5 border border-sand-medium/40 group-hover:border-gold-antique/20 transition-colors pointer-events-none rounded-sm" />
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.color} shadow-sm border border-sand-medium/50 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-[17px] font-bold text-text-dark group-hover:text-[#cc6a12] transition-colors leading-tight">
                    {item.name}
                  </h3>
                </div>
                
                <p className="font-sans text-[13px] text-text-muted leading-relaxed relative z-10">
                  {item.description}
                </p>
                
                <Link
                  href="/shop"
                  className="mt-auto text-[10px] font-sans font-bold uppercase tracking-widest text-[#cc6a12] hover:text-[#b35607] transition-colors inline-flex items-center gap-1.5 self-start pt-2 relative z-10"
                >
                  Explore Collection &rarr;
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
