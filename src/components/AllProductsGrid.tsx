"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import ProductCard from "./ProductCard";

interface AllProductsGridProps {
  products: any[];
}

export default function AllProductsGrid({ products = [] }: AllProductsGridProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll for counter-rotating mandala
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -60]);

  if (products.length === 0) return null;

  // Show up to 10 products
  const displayProducts = products.slice(0, 10);
  const hasMore = products.length > 10;

  return (
    <section ref={sectionRef} className="py-24 bg-3d-paper border-t border-sand-medium relative z-20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-luxury-pattern opacity-[0.03] pointer-events-none" />

      {/* Counter-Rotating Mandala Background (Left Side) */}
      <motion.div
        style={{ rotate }}
        className="absolute left-[-120px] top-[20%] w-[320px] h-[320px] opacity-[0.03] text-gold-antique pointer-events-none z-0"
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
        <div className="mb-14 relative flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          <p className="font-sans text-[13px] font-bold uppercase tracking-[0.35em] text-[#cc6a12] mb-3">
            AUTHENTIC HIMALAYAN HERITAGE &bull; TRUSTED SINCE 2016
          </p>
          <h2 className="font-serif text-4xl md:text-5.5xl text-text-dark font-semibold tracking-tight leading-tight">
            Explore Our Complete Collection of Authentic Kashmiri Products
          </h2>
          <div className="flex items-center justify-center gap-4 my-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-antique/50" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold-antique/60" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-antique/50" />
          </div>
          <div className="space-y-4 font-sans text-[14px] md:text-[15px] text-text-muted leading-relaxed text-center font-medium max-w-3xl mx-auto">
            <p>
              Welcome to KashmirCart, India&apos;s trusted destination for authentic Kashmiri products sourced directly from the valleys, mountains, farms, and traditional communities of Kashmir. Our carefully curated collection brings together premium Himalayan treasures known for their purity, quality, traditional value, and natural goodness.
            </p>
            <p>
              Discover world-famous Kashmiri Saffron from Pampore, authentic Himalayan Markhor Shilajit Resin, raw mountain honey, premium walnuts, almonds, cashews, dried fruits, natural spices, Kehwa tea, medicinal herbs, wild mushrooms, lavender products, herbal skincare, essential oils, natural wellness products, and traditional Himalayan foods trusted for generations.
            </p>
            <p>
              Every product in our collection is selected through strict quality standards and sourced from trusted farmers, growers, producers, and local communities. We focus on authenticity, freshness, traceability, and customer satisfaction while preserving the rich cultural and agricultural heritage of Kashmir.
            </p>
            <p>
              Whether you are searching for premium dry fruits online, pure Kashmiri saffron, natural Shilajit resin, healthy snacks, Ayurvedic wellness products, herbal teas, skincare essentials, gourmet ingredients, or authentic Himalayan products, KashmirCart offers a complete collection for health-conscious families and wellness enthusiasts across India.
            </p>
            <p>
              As an ISO Certified company with nationwide delivery, KashmirCart is committed to bringing genuine products from Kashmir directly to your doorstep. Experience the authentic taste, aroma, wellness benefits, and traditions of the Himalayas through our premium collection trusted by customers throughout India.
            </p>
          </div>
        </div>

        {/* Product Grid with Scroll Reveals */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {displayProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50, scale: 0.96, rotateX: 6 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: false, amount: 0.08 }}
              transition={{ duration: 0.7, delay: (index % 5) * 0.06, ease: [0.215, 0.61, 0.355, 1] }}
              className="h-full"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {hasMore && (
          <div className="text-center mt-14">
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-terracotta text-white font-sans text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-terracotta-hover transition-colors shadow-md rounded-sm"
            >
              View All Products →
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
