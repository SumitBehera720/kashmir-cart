"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const CATEGORY_ITEMS = [
  {
    title: "Kashmiri Mongra Saffron",
    subtitle: "100% PURE & GI-TAGGED",
    slugKey: "saffron",
    imageUrl: "/assets/images/category_saffron.png",
    colSpan: "md:col-span-6",
    height: "h-[300px] md:h-[350px]"
  },
  {
    title: "Himalayan Shilajit",
    subtitle: "HIGH-ALTITUDE MINERALS",
    slugKey: "shilajit",
    imageUrl: "/assets/images/category_shilajit.png",
    colSpan: "md:col-span-4",
    height: "h-[300px] md:h-[350px]"
  },
  {
    title: "Acacia White Honey",
    subtitle: "ORGANIC & UNFILTERED",
    slugKey: "honey",
    imageUrl: "/assets/images/category_honey.png",
    colSpan: "md:col-span-4",
    height: "h-[300px] md:h-[350px]"
  },
  {
    title: "Premium Dry Fruits & Nuts",
    subtitle: "PREMIUM SUN-DRIED",
    slugKey: "dry",
    imageUrl: "/assets/images/category_dry_fruits.png",
    colSpan: "md:col-span-6",
    height: "h-[300px] md:h-[350px]"
  }
];

export default function CategoryShowcase({ categories = [] }: { categories?: any[] }) {
  // Find Skincare separately for the promo banner
  const skincareCat = categories.find((c: any) => c.name.toLowerCase().includes("raya") || c.name.toLowerCase().includes("skin"));
  const skincareLink = skincareCat ? `/shop?category=${skincareCat.id}` : "/shop";
  const skincareImg = skincareCat?.image_url || "/assets/images/category-placeholder.png";

  return (
    <section className="py-24 bg-3d-paper border-b border-sand-medium relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-[13px] font-bold uppercase tracking-[0.35em] text-[#cc6a12] mb-3">
            Categories
          </p>
          <h2 className="font-serif text-4xl md:text-5.5xl text-text-dark font-semibold mb-4">
            Explore the Valley&apos;s Finest
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-antique/50" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold-antique/60" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-antique/50" />
          </div>
        </div>

        {/* Categories Grid (Asymmetrical 4 items) */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 mb-12">
          {CATEGORY_ITEMS.map((item, index) => {
            // Find if there is a matching category in database
            const dbCat = categories.find(
              (c: any) => c.name.toLowerCase().includes(item.slugKey) || c.slug.toLowerCase().includes(item.slugKey)
            );
            const categoryLink = dbCat ? `/shop?category=${dbCat.id}` : "/shop";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${item.colSpan} relative group overflow-hidden border border-sand-medium shadow-md hover:shadow-2xl hover:scale-[1.01] hover:rotate-[0.3deg] transition-all duration-500 rounded-sm`}
              >
                <Link href={categoryLink} className="block relative w-full h-full">
                  {/* Signature Luxury Inner Gold Frame */}
                  <div className="inner-gold-frame" />

                  {/* Image Container */}
                  <div className={`relative w-full ${item.height} overflow-hidden`}>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover scale-100 group-hover:scale-106 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Bottom-heavy gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
                  </div>

                  {/* Text Overlay (Bottom Left) */}
                  <div className="absolute bottom-0 left-0 p-8 z-10 text-left">
                    <span className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-[#d6af65] mb-2 block">
                      {item.subtitle}
                    </span>
                    <h3 className="font-serif text-[24px] md:text-[32px] text-white leading-tight font-semibold text-glow-gold">
                      {item.title}
                    </h3>
                  </div>

                  {/* Ornate corner hover effect */}
                  <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t-[1.5px] border-l-[1.5px] border-white/20 group-hover:border-white group-hover:w-5 group-hover:h-5 transition-all duration-500" />
                  <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t-[1.5px] border-r-[1.5px] border-white/20 group-hover:border-white group-hover:w-5 group-hover:h-5 transition-all duration-500" />
                  <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b-[1.5px] border-l-[1.5px] border-white/20 group-hover:border-white group-hover:w-5 group-hover:h-5 transition-all duration-500" />
                  <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b-[1.5px] border-r-[1.5px] border-white/20 group-hover:border-white group-hover:w-5 group-hover:h-5 transition-all duration-500" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Separated Skincare Promo Banner - styled in new light-beige */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="relative bg-sand-light text-text-dark border border-sand-medium p-[6px] shadow-md overflow-hidden mt-20 group rounded-sm"
        >
          <div className="absolute inset-[6px] border border-gold-antique/20 pointer-events-none z-10" />
          
          <div className="relative z-20 flex flex-col md:flex-row items-center gap-10 p-8 md:p-12 bg-gradient-to-r from-[#faf8f5] via-[#faf6f0] to-[#eae2d5]">
            {/* Floating Image Container */}
            <motion.div 
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="w-full md:w-1/3 aspect-[4/3] md:aspect-square overflow-hidden border border-sand-medium relative shadow-sm rounded-sm"
            >
              <div className="absolute inset-0 bg-black/5 z-10" />
              <img 
                src={skincareImg} 
                alt="Raya Ayurveda Skincare Collection" 
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-in-out"
              />
            </motion.div>

            {/* Text & Action */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-[#cc6a12] border-b border-[#cc6a12]/30 pb-1">
                Featured Collection
              </span>
              <h3 className="font-serif text-2.5xl md:text-4.5xl text-text-dark tracking-wide uppercase">
                Raya Ayurveda Skin Care
              </h3>
              <p className="font-sans text-sm text-text-muted leading-relaxed max-w-xl">
                Elevate your daily ritual with botanical skincare formulated with pure Kashmiri Saffron, Himalayan herbs, and natural essential oils. 100% clean, therapeutic luxury.
              </p>
              <div className="pt-2">
                <Link
                  href={skincareLink}
                  className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#cc6a12] text-white font-sans text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-[#b35607] transition-all duration-300 shadow-md rounded-sm shimmer-effect cursor-pointer"
                >
                  Explore Raya Skincare →
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
