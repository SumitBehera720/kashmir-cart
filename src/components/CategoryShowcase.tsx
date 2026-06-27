"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const categories = [
  {
    title: "Kashmiri Saffron",
    description: "World-famous Kashmiri saffron cultivated with traditional methods.",
    image: "/assets/images/product_saffron_jar.png",
    link: "/shop/premium-kashmiri-saffron",
  },
  {
    title: "Kahwa Collection",
    description: "Authentic Kashmiri wellness tea inspired by royal traditions.",
    image: "/assets/images/product_kahwa_tin.png",
    link: "/shop/kashmiri-kahwa-tea",
  },
  {
    title: "Kashmiri Honey",
    description: "Pure Himalayan honey collected from Kashmir's valleys.",
    image: "/assets/images/product_honey_jar.png",
    link: "/shop/wild-kashmir-honey",
  },
  {
    title: "Dry Fruits",
    description: "Premium quality dry fruits handpicked from the valleys.",
    image: "/assets/images/product_walnuts.png",
    link: "/shop",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function CategoryShowcase() {
  return (
    <section className="py-24 bg-pattern-parchment border-b border-gold-antique/30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <h2 className="font-serif text-3xl md:text-4xl text-maroon-royal uppercase tracking-wider mb-4">
            Explore Kashmir&apos;s Treasures
          </h2>
          <div className="divider-ornate">
            <div className="divider-ornate-icon" />
          </div>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {categories.map((category, index) => (
            <motion.div key={index} variants={cardVariants} className="h-full">
              <div className="bg-[#fcfaf5] border-[1.5px] border-[#cba358]/60 p-[6px] transition-all duration-300 hover:shadow-xl group flex flex-col h-full relative">
                
                {/* Inner Border with Geometric Triangles */}
                <div className="absolute inset-[6px] border-[1.5px] border-[#cba358]/80 pointer-events-none z-10">
                   {/* Top-left triangle */}
                   <div className="absolute top-0 left-0 w-0 h-0 border-t-[16px] border-l-[16px] border-t-[#cba358]/80 border-l-[#cba358]/80 border-r-[16px] border-r-transparent border-b-[16px] border-b-transparent"></div>
                   {/* Top-right triangle */}
                   <div className="absolute top-0 right-0 w-0 h-0 border-t-[16px] border-r-[16px] border-t-[#cba358]/80 border-r-[#cba358]/80 border-l-[16px] border-l-transparent border-b-[16px] border-b-transparent"></div>
                   {/* Bottom-left triangle */}
                   <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[16px] border-l-[16px] border-b-[#cba358]/80 border-l-[#cba358]/80 border-r-[16px] border-r-transparent border-t-[16px] border-t-transparent"></div>
                   {/* Bottom-right triangle */}
                   <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[16px] border-r-[16px] border-b-[#cba358]/80 border-r-[#cba358]/80 border-l-[16px] border-l-transparent border-t-[16px] border-t-transparent"></div>
                </div>

                {/* Rectangular Image */}
                <div className="relative w-full aspect-[4/3] p-1.5 mb-10 z-0">
                  <div className="relative w-full h-full overflow-hidden border border-[#cba358]/50 bg-white">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Circular Badge - Overlapping */}
                  <div className="absolute -bottom-[28px] left-1/2 -translate-x-1/2 w-[56px] h-[56px] rounded-full border-2 border-[#cba358] bg-[#1a0507] flex items-center justify-center shadow-md z-20">
                    <div className="w-[46px] h-[46px] rounded-full border-[1px] border-[#cba358]/60 flex items-center justify-center p-2 relative overflow-hidden">
                      <Image 
                        src="/assets/images/logo.png" 
                        alt="Brand Logo" 
                        fill 
                        className="object-contain p-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center px-4 flex flex-col flex-grow z-20 pb-6 pt-2">
                  <h3 className="font-serif text-[18px] text-[#3d0c11] font-medium uppercase tracking-[0.15em] mb-4">
                    {category.title}
                  </h3>
                  <p className="font-sans text-[14px] text-[#4a3f35] font-medium leading-[1.6] mb-8 flex-grow max-w-[220px] mx-auto">
                    {category.description}
                  </p>
                  
                  <Link
                    href={category.link}
                    className="inline-flex items-center mx-auto group/link"
                  >
                    <span className="font-serif text-[13px] font-semibold uppercase tracking-[0.15em] text-[#8c672b] border-b border-[#8c672b] pb-[2px] transition-colors group-hover/link:text-[#3d0c11] group-hover/link:border-[#3d0c11]">
                      EXPLORE NOW
                    </span>
                    <span className="ml-2 text-[#8c672b] transition-colors group-hover/link:text-[#3d0c11]">→</span>
                  </Link>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
