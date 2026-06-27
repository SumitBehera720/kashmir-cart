"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

export default function HeroBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background slow scale (cinematic feel)
      gsap.fromTo(
        bgRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2.5, ease: "power2.out" }
      );

      // Text reveal
      if (textRef.current) {
        const children = textRef.current.children;
        gsap.fromTo(
          children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.5,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[650px] w-full flex items-center justify-center overflow-hidden bg-[#fdfaf4] ornate-border-top"
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/assets/images/ktheme.jpeg"
          alt="Cinematic view of saffron inside golden bowl overlooking Dal Lake and mountains"
          fill
          priority
          className="object-cover object-center opacity-80"
        />
        {/* Soft overlay to ensure dark text is readable */}
        <div className="absolute inset-0 bg-white/20" />
      </div>

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center mt-12"
      >
        <div className="font-serif text-[26px] md:text-[32px] text-[#2c080b] mb-1 font-medium tracking-wide">
          Experience The
        </div>
        <h1 className="font-serif text-[42px] md:text-[64px] lg:text-[76px] font-medium text-[#2c080b] leading-[1.1] drop-shadow-sm">
          Pure Essence Of Kashmir
        </h1>
        
        {/* Ornate Divider */}
        <div className="flex items-center justify-center my-8 opacity-70 w-full max-w-md mx-auto">
          <div className="h-[1px] flex-grow bg-[#2c080b]"></div>
          <div className="w-4 h-4 border border-[#2c080b] rotate-45 mx-3 flex items-center justify-center">
             <div className="w-1.5 h-1.5 border border-[#2c080b]"></div>
          </div>
          <div className="h-[1px] flex-grow bg-[#2c080b]"></div>
        </div>

        <p className="font-serif text-[17px] md:text-[20px] text-[#2c080b] leading-relaxed mb-10 max-w-xl text-balance font-medium">
          Authentic Kashmiri Products <br />
          Crafted Through Generations Of Tradition
        </p>

        {/* Custom Button matching screenshot */}
        <Link
          href="/shop"
          className="relative inline-flex items-center justify-center bg-[#2c080b] text-[#d6af65] border-[1.5px] border-[#d6af65] px-12 py-4 transition-all hover:bg-[#3d0c11] hover:scale-105 group"
        >
          {/* Inner outline */}
          <div className="absolute inset-1 border-[1px] border-[#d6af65]/40 pointer-events-none"></div>
          
          <span className="font-sans text-[11px] font-semibold uppercase tracking-widest relative z-10">
            EXPLORE COLLECTION
          </span>
        </Link>

      </div>
    </section>
  );
}
