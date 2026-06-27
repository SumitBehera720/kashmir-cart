import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, ShieldCheck, Truck, ArrowLeft } from "lucide-react";
import { mockProducts } from "@/data/mockProducts";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = mockProducts.find((p) => p.slug === params.slug);
  if (!product) return {};
  
  return {
    title: product.seo.title,
    description: product.seo.description,
    keywords: product.seo.keywords,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = mockProducts.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="pt-28 pb-24 bg-parchment-base min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Back Link */}
        <Link href="/shop" className="inline-flex items-center gap-2 text-gold-dark hover:text-maroon-royal transition-colors mb-8 font-sans text-sm uppercase tracking-wider font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Product Images */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square w-full bg-parchment-light border border-gold-antique p-8 flex items-center justify-center">
              <div className="absolute inset-2 border-[0.5px] border-gold-antique/30 pointer-events-none" />
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-contain p-8"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((img, idx) => (
                  <div key={idx} className="relative w-24 h-24 bg-parchment-light border border-gold-antique/50 p-2 cursor-pointer hover:border-gold-antique transition-colors">
                    <Image src={img} alt={`${product.name} view ${idx + 1}`} fill className="object-contain p-2" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6 pb-6 border-b border-gold-antique/30">
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-dark mb-2 block">
                {product.category} • {product.brand}
              </span>
              <h1 className="font-serif text-3xl md:text-4xl text-maroon-royal leading-tight mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-gold-antique">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-text-muted">(48 Reviews)</span>
              </div>
              <div className="font-serif text-3xl text-maroon-royal font-medium">
                {product.currency === "INR" ? "₹" : product.currency}
                {product.price.toLocaleString("en-IN")}
              </div>
            </div>

            <p className="font-sans text-text-muted leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-4 mb-10 pb-10 border-b border-gold-antique/30">
              <Link
                href="/checkout"
                className="w-full py-4 text-center bg-maroon-royal text-text-white font-sans text-sm font-semibold uppercase tracking-[0.15em] border-[1.5px] border-gold-antique hover:bg-maroon-dark hover:border-gold-light hover:text-gold-light transition-all"
              >
                Add To Cart
              </Link>
              <div className="flex items-center gap-6 justify-center mt-4 text-sm text-text-muted font-sans">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-gold-dark" />
                  <span>Authenticity Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-gold-dark" />
                  <span>Free Shipping</span>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6 font-sans text-sm">
              <div>
                <h3 className="font-serif text-lg text-maroon-royal mb-2">Key Benefits</h3>
                <ul className="list-disc list-inside text-text-muted space-y-1">
                  {product.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-lg text-maroon-royal mb-2">Usage</h3>
                <p className="text-text-muted">{product.usage}</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-maroon-royal mb-2">Ingredients</h3>
                <p className="text-text-muted">{product.ingredients.join(", ")}</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-maroon-royal mb-2">Origin</h3>
                <p className="text-text-muted">{product.origin}</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
