"use client";

import { useRef } from "react";
import ProductCard from "./ProductCard";
import { mockProducts } from "@/data/mockProducts";

export default function ProductGrid() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.clientWidth * 0.8;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-24 bg-pattern-maroon text-text-white ornate-border-top ornate-border-bottom relative z-20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-14 relative flex flex-col items-center justify-center text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-gold-light uppercase tracking-wider mb-4">
            Treasures From The Valley
          </h2>
          <div className="divider-ornate mb-8">
            <div className="divider-ornate-icon" />
          </div>
        </div>

        {/* Product Slider/Grid */}
        <div className="relative -mx-6 px-6 md:mx-0 md:px-0">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {mockProducts.map((product) => (
              <div key={product.id} className="min-w-[220px] md:min-w-[240px] flex-shrink-0 snap-start h-auto">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
