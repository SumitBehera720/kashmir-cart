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
                OUR ROOTS
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
              KashmirCart was born from a singular mission: to preserve and share the ancient agricultural heritage of the Kashmir Valley. For generations, our families have cultivated the world&apos;s most sought-after saffron and minerals under the watchful gaze of the Himalayas.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-sans text-[15px] text-white/80 leading-relaxed max-w-xl"
            >
              By eliminating middlemen, we ensure that every gram of product you receive is untainted, and every purchase directly supports the traditional farming communities of the valley. We don&apos;t just sell products; we deliver a piece of Kashmiri soul.
            </motion.p>
 
            {/* Stats Block (3 columns) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-8 max-w-lg border-t border-gold-antique/30"
            >
              <div>
                <span className="font-serif text-4xl md:text-5.5xl font-bold text-gold-light block text-glow-gold">200+</span>
                <span className="font-sans text-[10px] md:text-[11px] font-bold text-white/70 uppercase tracking-wider block mt-1 leading-tight">
                  FARMER PARTNERS
                </span>
              </div>
              <div>
                <span className="font-serif text-4xl md:text-5.5xl font-bold text-gold-light block text-glow-gold">100%</span>
                <span className="font-sans text-[10px] md:text-[11px] font-bold text-white/70 uppercase tracking-wider block mt-1 leading-tight">
                  LAB CERTIFIED
                </span>
              </div>
              <div>
                <span className="font-serif text-4xl md:text-5.5xl font-bold text-gold-light block text-glow-gold">12</span>
                <span className="font-sans text-[10px] md:text-[11px] font-bold text-white/70 uppercase tracking-wider block mt-1 leading-tight">
                  EXPORT COUNTRIES
                </span>
              </div>
            </motion.div>
 
            {/* Purity Quote block */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-6"
            >
              <div className="border-l-2 border-gold-light pl-6 py-2 max-w-md">
                <p className="font-serif text-lg md:text-xl text-gold-light italic tracking-wide leading-relaxed">
                  &ldquo;Preserving the purity of the valley for future generations.&rdquo;
                </p>
              </div>
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
                  src="/assets/images/story_farmer.jpeg"
                  alt="Kashmiri farmer in saffron fields"
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-700"
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
