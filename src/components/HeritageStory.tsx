"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CheckCircle } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeritageStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(contentRef, { once: false, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-maroon-dark text-white relative overflow-hidden border-b border-gold-antique/20"
    >
      {/* Decorative background grid texture */}
      <div className="absolute inset-0 bg-luxury-pattern opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & Story (60% width) */}
          <div ref={contentRef} className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="font-sans text-[13px] font-bold uppercase tracking-[0.35em] text-gold-light">
                OUR HERITAGE
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-4xl md:text-5.5xl text-white leading-tight font-semibold"
            >
              A Legacy Carved <br />in the Mountains
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-sans text-[15px] text-white/80 leading-relaxed max-w-xl"
            >
              From the fertile fields of Pampore to the rugged highlands of the Himalayas, we bridge the gap between Kashmir&apos;s finest artisans and you. Our mission is to preserve these centuries-old traditions while ensuring fair livelihoods.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-sans text-[15px] text-white/80 leading-relaxed max-w-xl"
            >
              For generations, our partner families have harvested these premium ingredients, ensuring each batch is selected for its peak potency and purity. Every product carries the story, culture, and craftsmanship of Kashmir.
            </motion.p>
 
            {/* Stats Block (3 columns) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-8 max-w-lg border-t border-gold-antique/30"
            >
              <div>
                <span className="font-serif text-4xl md:text-5.5xl font-bold text-gold-light block text-glow-gold">250+</span>
                <span className="font-sans text-[10px] md:text-[11px] font-bold text-white/70 uppercase tracking-wider block mt-1">
                  Farmers Partnered
                </span>
              </div>
              <div>
                <span className="font-serif text-4xl md:text-5.5xl font-bold text-gold-light block text-glow-gold">100%</span>
                <span className="font-sans text-[10px] md:text-[11px] font-bold text-white/70 uppercase tracking-wider block mt-1">
                  Pure & Certified
                </span>
              </div>
              <div>
                <span className="font-serif text-4xl md:text-5.5xl font-bold text-gold-light block text-glow-gold">12</span>
                <span className="font-sans text-[10px] md:text-[11px] font-bold text-white/70 uppercase tracking-wider block mt-1">
                  Global Awards
                </span>
              </div>
            </motion.div>
 
            {/* Lab Certified Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-6"
            >
              <motion.div 
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="inline-flex items-center gap-4 bg-maroon-deep/90 border border-gold-antique/40 p-6 shadow-xl rounded-sm max-w-md hover:border-gold-light/40 transition-colors"
              >
                <CheckCircle className="w-6 h-6 text-gold-light flex-shrink-0" />
                <div className="text-left">
                  <span className="font-serif text-[14px] font-bold text-gold-light uppercase tracking-wider block">
                    Lab Certified Saffron
                  </span>
                  <span className="font-sans text-[11px] text-white/80 leading-tight block mt-1">
                    Every batch is tested in government-approved laboratories for purity, safranal, and crocin levels.
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
 
          {/* Right Column: Artisan Image (40% width) */}
          <div ref={imageRef} className="lg:col-span-5 relative w-full flex justify-center">
            {/* Aspect ratio vertical box for vertical image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[3/4] w-full max-w-[380px] border border-gold-antique/30 p-2.5 bg-maroon-deep shadow-2xl group rounded-sm"
            >
              <div className="relative w-full h-full overflow-hidden border border-gold-antique/20 rounded-sm">
                <Image
                  src="/assets/images/artisan_woodcarverr.png"
                  alt="Kashmiri artisan in mountains"
                  fill
                  className="object-cover grayscale brightness-95 contrast-105 group-hover:scale-103 transition-transform duration-700"
                />
              </div>
              {/* Luxury Frame Corner Ornaments */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-gold-light m-3 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-gold-light m-3 pointer-events-none" />
            </motion.div>
          </div>
 
        </div>
      </div>
    </section>
  );
}
