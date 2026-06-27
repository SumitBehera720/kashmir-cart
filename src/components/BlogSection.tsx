"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const blogs = [
  {
    title: "History of Kashmiri Saffron",
    desc: "The golden spice with a royal heritage.",
    image: "/assets/images/product_saffron.png",
    link: "/blog/history-of-kashmiri-saffron",
  },
  {
    title: "Benefits of Kashmiri Kahwa",
    desc: "The traditional wellness tea explained.",
    image: "/assets/images/product_kahwa.png",
    link: "/blog/benefits-of-kahwa",
  },
  {
    title: "Pure Honey from the Valleys",
    desc: "How Kashmiri honey is naturally made.",
    image: "/assets/images/product_honey.png",
    link: "/blog",
  },
  {
    title: "Kashmiri Dry Fruits",
    desc: "Nutrient-rich superfoods from the Himalayas.",
    image: "/assets/images/product_almonds.png",
    link: "/blog",
  },
  {
    title: "Kashmir Craft Heritage",
    desc: "The timeless art of Kashmir explained.",
    image: "/assets/images/artisan_craft.png",
    slug: "kashmiri-dry-fruits",
  },
];

export default function BlogSection() {
  return (
    <section className="py-24 bg-pattern-parchment border-b border-gold-antique/30 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-14 relative flex flex-col items-center justify-center text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-maroon-royal uppercase tracking-wider mb-4">
            Discover Kashmir
          </h2>
          <div className="divider-ornate mb-8">
            <div className="divider-ornate-icon" />
          </div>
          
          {/* Navigation Buttons (Desktop) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex gap-3">
            <button className="w-10 h-10 rounded-full border border-gold-antique bg-parchment-base text-gold-dark flex items-center justify-center transition-all hover:bg-gold-light hover:text-maroon-deep">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full border border-gold-antique bg-parchment-base text-gold-dark flex items-center justify-center transition-all hover:bg-gold-light hover:text-maroon-deep">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((post, index) => (
            <div key={index} className="bg-text-white border-[1.5px] border-gold-antique p-2 flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              
              <div className="relative w-full aspect-[4/3] overflow-hidden mb-4 border border-gold-antique/30">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="px-3 pb-4 text-center flex flex-col flex-grow">
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="font-serif text-[15px] font-medium text-maroon-royal leading-tight mb-2 hover:text-gold-dark transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                <p className="font-sans text-[11px] text-text-muted leading-relaxed mb-4 line-clamp-2 flex-grow">
                  {post.desc}
                </p>
                
                <Link
                  href={`/blog/${post.slug}`}
                  className="btn-secondary mt-auto justify-center"
                >
                  Read More <span>→</span>
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
