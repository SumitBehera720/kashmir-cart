"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { fetchCategories } from "@/data/api";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.error("Error categories:", err))
      .finally(() => setLoading(false));
  }, []);

  const catImages: Record<string, string> = {
    saffron: "/assets/images/product_saffron_jar.png",
    tea: "/assets/images/product_kahwa.png",
    honey: "/assets/images/product_honey_jar.png",
    default: "/assets/images/product_almonds.png",
  };

  if (loading) {
    return (
      <div className="pt-28 pb-24 bg-parchment-base min-h-screen flex items-center justify-center font-sans">
        <Loader2 className="w-10 h-10 animate-spin text-maroon-royal" />
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-parchment-base min-h-screen">
      <div className="max-w-7xl mx-auto px-6 font-sans">
        
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark mb-3 block">
            Our Collections
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-maroon-royal leading-tight mb-6">
            Shop By Heritage Category
          </h1>
          <div className="flex items-center justify-center">
            <div className="h-[1px] w-16 bg-gold-antique"></div>
            <div className="w-3 h-3 rotate-45 border border-gold-antique mx-2"></div>
            <div className="h-[1px] w-16 bg-gold-antique"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => {
            const key = cat.name.toLowerCase();
            const imagePath = catImages[key] || (key.includes("saffron") ? catImages.saffron : key.includes("tea") ? catImages.tea : key.includes("honey") ? catImages.honey : catImages.default);
            
            return (
              <div key={cat.id} className="bg-parchment-light border border-gold-antique p-4 flex flex-col items-center justify-between text-center relative group hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-1 border border-gold-antique/25 pointer-events-none" />
                
                <div className="relative w-40 h-40 mb-6 flex items-center justify-center mt-4">
                  <Image 
                    src={imagePath} 
                    alt={cat.name} 
                    fill 
                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="w-full relative z-10 flex flex-col items-center flex-grow justify-between">
                  <div>
                    <h2 className="font-serif text-xl text-maroon-royal mb-2 font-semibold">
                      {cat.name}
                    </h2>
                    <p className="text-xs text-text-muted leading-relaxed mb-6 px-2">
                      {cat.description}
                    </p>
                  </div>

                  <Link 
                    href="/shop"
                    className="py-2.5 px-6 bg-maroon-royal text-text-white text-xs font-bold uppercase tracking-wider border border-gold-antique hover:bg-maroon-dark hover:text-gold-light transition-all w-full"
                  >
                    View Products
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
