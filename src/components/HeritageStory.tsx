"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeritageStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgLeftRef = useRef<HTMLDivElement>(null);
  const imgRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in text from bottom
      gsap.fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        imgLeftRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        imgRightRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-pattern-parchment relative overflow-hidden border-y-[6px] border-[#3d0c11]/20 shadow-inner"
    >
      {/* Decorative Corner Florals (SVG outlines matching the reference) */}
      <div className="absolute top-0 left-0 w-48 h-48 opacity-40 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[#8c672b] stroke-[0.5]">
          <path d="M0,20 C30,20 40,0 60,10 C80,20 70,40 90,40 C100,40 100,100 100,100" />
          <path d="M0,40 C20,40 30,20 50,30 C70,40 60,60 80,60 C90,60 90,100 90,100" />
          {/* Leaves */}
          <path d="M20,20 C30,30 20,40 20,20 Z" fill="#8c672b" opacity="0.2" />
          <path d="M40,30 C50,40 40,50 40,30 Z" fill="#8c672b" opacity="0.2" />
          <path d="M60,40 C70,50 60,60 60,40 Z" fill="#8c672b" opacity="0.2" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-40 pointer-events-none origin-bottom-left rotate-[-90deg] translate-y-[20%]">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[#8c672b] stroke-[0.5]">
          <path d="M0,20 C30,20 40,0 60,10 C80,20 70,40 90,40 C100,40 100,100 100,100" />
          <path d="M0,40 C20,40 30,20 50,30 C70,40 60,60 80,60 C90,60 90,100 90,100" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-56 h-56 opacity-40 pointer-events-none origin-top-right rotate-[90deg]">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[#8c672b] stroke-[0.5]">
          <path d="M0,20 C30,20 40,0 60,10 C80,20 70,40 90,40 C100,40 100,100 100,100" />
          <path d="M0,40 C20,40 30,20 50,30 C70,40 60,60 80,60 C90,60 90,100 90,100" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          
          {/* Left Artisan Image */}
          <div ref={imgLeftRef} className="w-full md:w-[35%] relative">
            <div className="relative aspect-[4/3] md:aspect-[1/1] w-full">
              {/* Torn edge effect via CSS mask if supported, otherwise just a soft irregular border radius */}
              <div 
                className="absolute inset-0 overflow-hidden" 
                style={{ 
                  borderRadius: "8% 12% 5% 15% / 10% 8% 15% 12%",
                  boxShadow: "0 0 0 3px rgba(140, 103, 43, 0.2), inset 0 0 20px rgba(0,0,0,0.5)"
                }}
              >
                <Image
                  src="/assets/images/artisan_woodcarver.png"
                  alt="Kashmiri artisan carving intricate wooden box"
                  fill
                  className="object-cover scale-105"
                />
              </div>
              {/* Optional rough edge overly */}
              <div className="absolute inset-0 border-[4px] border-[#fdfaf4] opacity-50 mix-blend-overlay" style={{ borderRadius: "8% 12% 5% 15% / 10% 8% 15% 12%" }} />
            </div>
          </div>

          {/* Center Text Content */}
          <div ref={textRef} className="w-full md:w-[30%] text-center flex flex-col items-center">
            <span className="font-serif text-[12px] font-semibold uppercase text-[#3d0c11] tracking-widest mb-3 opacity-90">
              THE SOUL OF KASHMIR
            </span>
            <h2 className="font-serif text-[32px] md:text-[38px] text-[#2c080b] mb-6 leading-[1.1] font-semibold tracking-wide">
              Born In The Valley Of Kashmir
            </h2>
            
            <p className="font-serif text-[17px] text-[#2c080b] mb-6 leading-relaxed max-w-sm mx-auto font-medium">
              Where centuries-old traditions meet<br/>natural purity.
            </p>
            
            <p className="font-serif text-[17px] text-[#2c080b] mb-10 leading-relaxed max-w-sm mx-auto font-medium">
              Every product carries the story,<br/>culture, and craftsmanship of Kashmir.
            </p>

            {/* Custom Button matching screenshot */}
            <Link
              href="/our-story"
              className="relative inline-flex items-center justify-center bg-[#2c080b] text-[#d6af65] border-[1.5px] border-[#d6af65] px-10 py-3.5 transition-all hover:bg-[#3d0c11] hover:scale-105 group"
            >
              {/* Inner outline */}
              <div className="absolute inset-1 border-[1px] border-[#d6af65]/40 pointer-events-none"></div>
              
              <span className="font-sans text-[11px] font-semibold uppercase tracking-widest relative z-10">
                KNOW OUR STORY
              </span>
            </Link>
          </div>

          {/* Right Map Image */}
          <div ref={imgRightRef} className="w-full md:w-[35%] relative">
            <div className="relative aspect-[5/4] w-full">
              <Image
                src="/assets/images/kashmir_outline_mapp.png"
                alt="Illustrated map of Kashmir showing Srinagar, Gulmarg, Pahalgam"
                fill
                className="object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
