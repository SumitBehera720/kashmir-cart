import { fetchProducts } from "@/data/api";
import ProductCard from "@/components/ProductCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Kashmir Heritage | Pure Saffron, Kahwa & Dry Fruits",
  description: "Browse our premium collection of authentic Kashmiri products. 100% natural, GI-tagged saffron, organic honey, royal Kahwa, and Mamra almonds.",
};

export default async function ShopPage() {
  const products = await fetchProducts().catch(() => []);

  return (
    <div className="pt-28 pb-24 bg-parchment-base min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-maroon-royal uppercase tracking-wider mb-4">
            Treasures of Kashmir
          </h1>
          <p className="font-sans text-text-muted max-w-2xl mx-auto">
            Discover our curated collection of authentic, premium Kashmiri products sourced directly from the valleys.
          </p>
          <div className="flex items-center justify-center mt-6">
            <div className="h-[1px] w-16 bg-gold-antique"></div>
            <div className="w-3 h-3 rotate-45 border border-gold-antique mx-2"></div>
            <div className="h-[1px] w-16 bg-gold-antique"></div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
}
