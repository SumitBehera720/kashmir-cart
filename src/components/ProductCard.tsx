"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag } from "lucide-react";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasImage = product.images && product.images.length > 0;
  
  // Custom mock rating & review counts for visual fidelity matching Figma
  const getRatingInfo = (id: string) => {
    switch (id) {
      case "saffron-1":
        return { rating: 5, reviews: 142, badge: "ORGANIC" };
      case "shilajit-1":
        return { rating: 5, reviews: 84, badge: "PURE GRADE A" };
      case "honey-1":
        return { rating: 5, reviews: 98, badge: "RAW & PURE" };
      case "walnuts-1":
        return { rating: 5, reviews: 76, badge: "HANDPICKED" };
      case "almonds-1":
        return { rating: 5, reviews: 114, badge: "PREMIUM" };
      case "kahwa-1":
        return { rating: 5, reviews: 88, badge: "BEST SELLER" };
      default:
        return { rating: 5, reviews: 45, badge: "LIMITED" };
    }
  };

  const { rating, reviews, badge } = getRatingInfo(product.id.toString());

  return (
    <div className="bg-white group flex flex-col h-full relative transition-all duration-500 hover:shadow-2xl border border-sand-medium hover:border-gold-antique/50 cursor-pointer rounded-sm overflow-hidden p-3.5 hover:-translate-y-2 transform-gpu will-change-transform">
      <Link href={`/shop/${product.slug}`} className="flex flex-col h-full flex-grow">
        
        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4 z-20 bg-white/95 border border-gold-antique/30 text-gold-dark text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 shadow-sm rounded-sm">
            {badge}
          </div>
        )}

        {/* Product Image and Hover Actions */}
        <div className="aspect-square relative w-full mb-4 flex items-center justify-center bg-[#fafafa] overflow-hidden rounded-sm border border-sand-medium/30">
          {hasImage ? (
            <div className="relative w-full h-full p-4">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-contain transition-transform duration-700 group-hover:scale-106"
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center opacity-20">
              <ShoppingBag className="w-12 h-12 text-text-dark" />
            </div>
          )}

          {/* Luxury Slide-Up Add To Cart Panel */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm py-3.5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20 text-center border-t border-sand-medium/40 shadow-sm flex items-center justify-center gap-1.5 hover:!bg-terracotta group/btn">
            <ShoppingBag className="w-3.5 h-3.5 text-text-dark group-hover/btn:text-white transition-colors" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-text-dark group-hover/btn:text-white transition-colors">
              Add to Cart
            </span>
          </div>
        </div>

        {/* Product Info (Left-aligned) */}
        <div className="flex flex-col flex-grow text-left space-y-2.5 px-1">
          {/* Star Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {Array.from({ length: rating }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-gold-antique text-gold-antique" />
              ))}
            </div>
            <span className="font-sans text-[11px] text-text-muted font-medium">({reviews})</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-[16px] md:text-[17px] font-semibold text-text-dark leading-snug group-hover:text-terracotta transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Price */}
          <div className="pt-1 mt-auto">
            <span className="font-serif text-[19px] font-bold text-text-dark">
              {product.currency === "INR" ? "₹" : product.currency}
              {product.price.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
