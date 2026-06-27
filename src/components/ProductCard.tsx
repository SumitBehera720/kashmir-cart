"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag } from "lucide-react";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-[#fdfaf4] p-1.5 text-center flex flex-col h-full relative group transition-all duration-300 hover:shadow-xl shadow-md border border-gold-antique/40">
      
      {/* Inner border to match screenshot */}
      <div className="absolute inset-1.5 border border-gold-antique/30 pointer-events-none z-10" />

      {/* Product Image */}
      <div className="h-40 md:h-48 relative w-full mb-4 flex items-center justify-center p-2 z-0">
        <div className="relative w-full h-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-md"
          />
        </div>
      </div>

      <div className="relative z-20 flex flex-col flex-grow items-center justify-between pb-2 px-3">
        
        <div className="mb-2">
          {/* Title */}
          <Link href={`/shop/${product.slug}`} className="block mb-1">
            <h3 className="font-serif text-[14px] text-[#3d0c11] leading-tight hover:text-gold-dark transition-colors px-2">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="w-full flex flex-col items-center">
          {/* Price */}
          <div className="font-serif text-[18px] font-medium text-[#2c080b] mb-4">
            {product.currency === "INR" ? "₹" : product.currency}
            {product.price.toLocaleString("en-IN")}
          </div>

          {/* Action Button */}
          <Link
            href={`/checkout`}
            className="w-[85%] py-2 bg-[#3d0c11] text-[#d6af65] font-serif text-[11px] font-bold tracking-widest transition-all duration-300 hover:bg-[#2c080b] hover:text-[#fdfaf4] block mx-auto rounded-[2px]"
          >
            ADD TO CART
          </Link>
        </div>
      </div>
    </div>
  );
}
