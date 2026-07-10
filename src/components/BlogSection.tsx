"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ARTICLES = [
  {
    category: "Saffron",
    title: "Morning Rituals: 100% Pure Saffron Tea",
    desc: "Learn how authentic Kashmiri Mongra saffron can elevate your morning wellness routine.",
    image: "/assets/images/product_saffron.png",
    link: "/blog",
  },
  {
    category: "Shilajit",
    title: "The Fulvic Acid Wonder: Benefits of Shilajit",
    desc: "Discover how high-altitude Himalayan shilajit acts as a natural booster for physical and mental stamina.",
    image: "/assets/images/category_shilajit.png",
    link: "/blog",
  },
  {
    category: "Honey",
    title: "Sustainable Harvesting in the High Valleys",
    desc: "A look inside how our wild organic honey is harvested by traditional beekeepers in Kashmir.",
    image: "/assets/images/product_honey.png",
    link: "/blog",
  },
];

export default function BlogSection() {
  return (
    <section className="py-24 bg-white border-b border-sand-medium relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header with Top-Right Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="text-left">
            <p className="font-sans text-[13px] font-bold uppercase tracking-[0.35em] text-[#cc6a12] mb-3">
              WELLNESS & KNOWLEDGE
            </p>
            <h2 className="font-serif text-4xl md:text-5.5xl text-text-dark font-semibold">
              The Kashmir Wellness Hub
            </h2>
          </div>
          
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gold-antique hover:text-terracotta transition-colors font-sans text-[12px] font-bold uppercase tracking-wider group"
          >
            Explore Articles
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article, index) => (
            <div
              key={index}
              className="bg-white border border-sand-medium p-4 flex flex-col group transition-all duration-500 hover:shadow-lg hover:border-gold-antique/50 rounded-sm hover:-translate-y-1.5"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[16/10] overflow-hidden mb-5 border border-sand-medium bg-[#fafafa] rounded-sm">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Card Content */}
              <div className="flex flex-col flex-grow text-left space-y-2.5">
                <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#cc6a12] block">
                  {article.category}
                </span>
                
                <h3 className="font-serif text-[17px] font-medium text-text-dark leading-snug group-hover:text-terracotta transition-colors">
                  {article.title}
                </h3>
                
                <p className="font-sans text-[12px] text-text-muted leading-relaxed line-clamp-3">
                  {article.desc}
                </p>
                
                <div className="pt-4 mt-auto">
                  <Link
                    href={article.link}
                    className="inline-flex items-center gap-1.5 text-text-dark hover:text-terracotta transition-colors font-sans text-[10px] font-bold uppercase tracking-widest"
                  >
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
