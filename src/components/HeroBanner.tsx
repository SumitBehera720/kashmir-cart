"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ShieldCheck, Hammer, Leaf, Globe, ArrowRight } from "lucide-react";

export default function HeroBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  // Scroll-linked parallax transitions
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], [0, 200]);
  const bgScale = useTransform(scrollY, [0, 1000], [1.02, 1.20]);
  const contentY = useTransform(scrollY, [0, 600], [0, -60]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    // Cinematic background entry
    gsap.fromTo(
      bgRef.current,
      { scale: 1.08, opacity: 0 },
      { scale: 1.02, opacity: 1, duration: 2.2, ease: "power2.out" }
    );

    // Mouse movement parallax effect on background
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 18;
      const yPos = (clientY / window.innerHeight - 0.5) * 18;
      gsap.to(bgRef.current, {
        x: xPos,
        y: yPos,
        duration: 1.2,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-sand-light pt-24"
    >
      {/* Background Image Container */}
      <motion.div 
        ref={bgRef} 
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-[-20px] z-0 pointer-events-none"
      >
        <Image
          src="/assets/images/ktheme.png"
          alt="Misty Kashmir Valley and Mountains"
          fill
          priority
          className="object-cover object-center opacity-85"
        />
        {/* Luxury top dark blend to support transparent header + soft bottom sand blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-sand-light" />
      </motion.div>

      {/* Hero Content (Middle) */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-6 py-16">
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="max-w-4xl text-left mr-auto md:pl-16">
          
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="w-2 h-2 rotate-45 bg-[#cc6a12]" />
            <span className="font-sans text-[13px] font-bold uppercase tracking-[0.4em] text-[#cc6a12] block">
              ARTISANAL AUTHORITY
            </span>
          </motion.div>
          
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-serif text-[48px] md:text-[76px] lg:text-[90px] font-semibold text-text-dark leading-[1.05] mb-8 tracking-tight text-glow-gold"
          >
            Authentic Essence <br />
            of Kashmir, <span className="text-gold-antique italic font-medium">Delivered to Your Doorstep.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-sans text-[16px] md:text-[18px] text-text-muted leading-relaxed mb-12 max-w-xl font-medium"
          >
            Directly sourced from the farmers of the valley. Pure. Potent. Provenance Guaranteed.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-wrap items-center gap-6"
          >
            <Link
              href="/shop"
              className="inline-flex items-center justify-center bg-terracotta hover:bg-terracotta-hover text-white px-10 py-4.5 transition-all duration-300 font-sans text-[12px] font-bold uppercase tracking-widest rounded-sm shadow-lg hover:shadow-xl shimmer-effect cursor-pointer"
            >
              Shop the Collection
            </Link>

            <Link
              href="/our-story"
              className="inline-flex items-center gap-2 text-text-dark hover:text-terracotta transition-colors font-sans text-[11px] font-bold uppercase tracking-widest group"
            >
              Our Process
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Elegant Floating Scroll Indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-70 pointer-events-none hidden md:flex">
        <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-text-muted">Scroll</span>
        <div className="w-[1.5px] h-10 bg-sand-medium relative overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="absolute left-0 top-0 w-full h-1/2 bg-gold-antique"
          />
        </div>
      </div>

      {/* Trust Bar (Bottom) */}
      <div className="w-full bg-white border-t border-b border-sand-medium py-6 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center justify-center gap-3 md:border-r border-sand-medium/40 last:border-0 px-2 group cursor-pointer">
            <ShieldCheck className="w-5 h-5 text-gold-antique flex-shrink-0 group-hover:scale-110 group-hover:text-terracotta transition-all duration-300" />
            <span className="font-serif text-[12px] font-semibold text-text-dark uppercase tracking-widest group-hover:text-terracotta transition-colors duration-300">
              Lab Tested
            </span>
          </div>
          <div className="flex items-center justify-center gap-3 md:border-r border-sand-medium/40 last:border-0 px-2 group cursor-pointer">
            <Hammer className="w-5 h-5 text-gold-antique flex-shrink-0 group-hover:rotate-6 group-hover:scale-110 group-hover:text-terracotta transition-all duration-300" />
            <span className="font-serif text-[12px] font-semibold text-text-dark uppercase tracking-widest group-hover:text-terracotta transition-colors duration-300">
              Artisan Sourced
            </span>
          </div>
          <div className="flex items-center justify-center gap-3 md:border-r border-sand-medium/40 last:border-0 px-2 group cursor-pointer">
            <Leaf className="w-5 h-5 text-gold-antique flex-shrink-0 group-hover:scale-110 group-hover:text-terracotta transition-all duration-300" />
            <span className="font-serif text-[12px] font-semibold text-text-dark uppercase tracking-widest group-hover:text-terracotta transition-colors duration-300">
              Pure & Organic
            </span>
          </div>
          <div className="flex items-center justify-center gap-3 last:border-0 px-2 group cursor-pointer">
            <Globe className="w-5 h-5 text-gold-antique flex-shrink-0 group-hover:rotate-12 group-hover:scale-110 group-hover:text-terracotta transition-all duration-300" />
            <span className="font-serif text-[12px] font-semibold text-text-dark uppercase tracking-widest group-hover:text-terracotta transition-colors duration-300">
              Worldwide Shipping
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
