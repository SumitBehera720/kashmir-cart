"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProductCard from "./ProductCard";
import { mockProducts } from "@/data/mockProducts";

interface ProductGridProps {
  products: any[];
}

export default function ProductGrid({ products = [] }: ProductGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Select the 4 key best-sellers from the mockup
  const desiredSlugs = [
    "premium-kashmiri-saffron",
    "pure-himalayan-shilajit-resin",
    "kashmiri-walnut-kernels",
    "wild-kashmir-honey"
  ];

  // Try to find them in the dynamic product list, otherwise fall back to mockProducts
  const bestSellers = desiredSlugs.map(slug => {
    const dynamicProduct = products.find(p => p.slug === slug);
    if (dynamicProduct) return dynamicProduct;
    return mockProducts.find(p => p.slug === slug);
  }).filter(Boolean);

  // Track scroll for rotating mandala
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 60]);

  if (bestSellers.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-24 bg-white border-b border-sand-medium relative z-20 overflow-hidden">
      
      {/* Decorative Rotating Mandala Background */}
      <motion.div
        style={{ rotate }}
        className="absolute right-[-120px] top-[15%] w-[320px] h-[320px] opacity-[0.03] text-gold-antique pointer-events-none z-0"
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <circle cx="50" cy="50" r="45" strokeDasharray="1 1" />
          <polygon points="50,5 95,50 50,95 5,50" />
          <polygon points="50,15 85,50 50,85 15,50" />
          <polygon points="50,25 75,50 50,75 25,50" />
          <circle cx="50" cy="50" r="15" />
          <line x1="50" y1="5" x2="50" y2="95" />
          <line x1="5" y1="50" x2="95" y2="50" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <p className="font-sans text-[13px] font-bold uppercase tracking-[0.35em] text-[#cc6a12] mb-3">
            TRUSTED SINCE 2016 • AUTHENTIC HIMALAYAN COLLECTION
          </p>
          <h2 className="font-serif text-4xl md:text-5.5xl text-text-dark font-semibold mb-4 leading-tight">
            Discover Kashmir&apos;s Most Loved Products
          </h2>
          <div className="flex items-center justify-center gap-4 my-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-antique/50" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold-antique/60" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-antique/50" />
          </div>
          <p className="font-sans text-[14px] md:text-[15px] text-text-muted leading-relaxed max-w-3xl mx-auto font-medium">
            For generations, the valleys of Kashmir have produced some of the world&apos;s most treasured natural products. At KashmirCart, we bring these authentic Himalayan treasures directly from trusted farmers, growers, and local artisans to customers across India. Explore our bestselling collection featuring Premium Kashmiri Saffron from Pampore, Himalayan Markhor Shilajit Resin, wild mountain honey, nutrient-rich dry fruits, wellness essentials, traditional Kehwa, natural skincare, and carefully selected Himalayan products known for their purity, authenticity, and exceptional quality.
          </p>
        </div>

        {/* 4-Column Grid with Scroll Stagger Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 60, scale: 0.95, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.8, delay: index * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
              className="h-full"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
