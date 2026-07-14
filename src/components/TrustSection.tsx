"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Generated illustrative icons
const FieldIcon = () => <Image src="/assets/images/icon_field.png" alt="Field" width={64} height={64} className="w-full h-full object-cover mix-blend-multiply rounded-full" />;
const HarvestIcon = () => <Image src="/assets/images/icon_harvest.png" alt="Harvest" width={64} height={64} className="w-full h-full object-cover mix-blend-multiply rounded-full" />;
const ProcessIcon = () => <Image src="/assets/images/icon_process.png" alt="Process" width={64} height={64} className="w-full h-full object-cover mix-blend-multiply rounded-full" />;
const PackageIcon = () => <Image src="/assets/images/icon_package.png" alt="Package" width={64} height={64} className="w-full h-full object-cover mix-blend-multiply rounded-full" />;
const HomeIcon = () => <Image src="/assets/images/icon_home.png" alt="Home" width={64} height={64} className="w-full h-full object-cover mix-blend-multiply rounded-full" />;

const SealIcon = () => <Image src="/assets/images/icon_source.png" alt="Authentic Source" width={64} height={64} className="w-full h-full object-cover mix-blend-multiply rounded-full" />;
const HandsIcon = () => <Image src="/assets/images/icon_tradition.png" alt="Traditional Methods" width={64} height={64} className="w-full h-full object-cover mix-blend-multiply rounded-full" />;
const LeafIcon = () => <Image src="/assets/images/icon_purity.png" alt="Natural Purity" width={64} height={64} className="w-full h-full object-cover mix-blend-multiply rounded-full" />;
const QualitySealIcon = () => <Image src="/assets/images/icon_quality.png" alt="Quality Tested" width={64} height={64} className="w-full h-full object-cover mix-blend-multiply rounded-full" />;

const steps = [
  { icon: FieldIcon, label: "Kashmir Fields" },
  { icon: HarvestIcon, label: "Traditional Harvesting" },
  { icon: ProcessIcon, label: "Expert Processing" },
  { icon: PackageIcon, label: "Premium Packaging" },
  { icon: HomeIcon, label: "Your Home" },
];

const promises = [
  { icon: SealIcon, title: "AUTHENTIC SOURCE", desc: "Real Kashmiri origin" },
  { icon: HandsIcon, title: "TRADITIONAL METHODS", desc: "Generations of expertise" },
  { icon: LeafIcon, title: "NATURAL PURITY", desc: "No unnecessary additives" },
  { icon: QualitySealIcon, title: "QUALITY TESTED", desc: "Premium standards" },
];

export default function TrustSection() {
  const containerRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const promisesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Steps
      if (stepsRef.current) {
        const stepItems = stepsRef.current.querySelectorAll('.journey-step');
        const arrows = stepsRef.current.querySelectorAll('.journey-arrow');
        
        gsap.fromTo(stepItems,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)", scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
        );
        gsap.fromTo(arrows,
          { opacity: 0, scaleX: 0, transformOrigin: "left center" },
          { opacity: 1, scaleX: 1, duration: 0.6, stagger: 0.15, delay: 0.3, ease: "power2.out", scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
        );
      }

      // Animate Promises
      if (promisesRef.current) {
        const promiseItems = promisesRef.current.querySelectorAll('.promise-card');
        gsap.fromTo(promiseItems,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, delay: 0.4, ease: "power2.out", scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="pt-16 pb-8 bg-sand-light relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-luxury-pattern opacity-[0.03] pointer-events-none" />
      
      {/* Intricate Left/Right Background Borders */}
      <div className="absolute top-0 left-2 bottom-0 w-8 opacity-20 pointer-events-none flex flex-col justify-between py-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'40\' viewBox=\'0 0 20 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M10 0 C20 10, 20 30, 10 40 C0 30, 0 10, 10 0 Z\' fill=\'none\' stroke=\'%23b89047\' stroke-width=\'1\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat-y' }}></div>
      <div className="absolute top-0 right-2 bottom-0 w-8 opacity-20 pointer-events-none flex flex-col justify-between py-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'40\' viewBox=\'0 0 20 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M10 0 C20 10, 20 30, 10 40 C0 30, 0 10, 10 0 Z\' fill=\'none\' stroke=\'%23b89047\' stroke-width=\'1\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat-y' }}></div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-12 relative z-10">
        {/* Top half of the unified border box */}
        <div className="border-t-[1.5px] border-l-[1.5px] border-r-[1.5px] border-sand-medium p-1.5 relative shadow-sm">
          <div className="border-t-[0.5px] border-l-[0.5px] border-r-[0.5px] border-sand-medium/60 p-5 sm:p-8 md:p-12 relative bg-white/95 backdrop-blur-sm">
            
            <div className="flex flex-col xl:flex-row gap-12 xl:gap-0 justify-between items-stretch">
              
              {/* Left: Journey Stepper */}
              <div className="flex-1 xl:pr-10">
                <div className="flex items-center justify-center gap-4 mb-12">
                  <h2 className="font-serif text-[19px] text-text-dark font-bold text-center tracking-[0.25em] uppercase">
                    FROM KASHMIR&apos;S FIELDS TO YOUR HOME
                  </h2>
                </div>
                
                <div ref={stepsRef} className="flex flex-col md:flex-row items-center md:items-start justify-between w-full relative gap-6 md:gap-0">
                  {steps.map((step, index) => (
                    <div key={index} className="flex flex-col md:flex-row items-center w-full md:w-auto flex-1">
                      <div className="journey-step flex flex-col items-center gap-3 md:gap-5 group text-center z-10 w-full md:w-28 cursor-pointer">
                        {/* Premium Double Ring Circle */}
                        <div className="w-[72px] h-[72px] md:w-[84px] md:h-[84px] rounded-full border-[1.5px] border-sand-medium bg-sand-light flex items-center justify-center shadow-sm relative overflow-hidden p-1 transition-transform duration-500 group-hover:scale-110 group-hover:border-gold-antique">
                          <div className="w-full h-full rounded-full border-[1px] border-sand-medium/40 bg-white flex items-center justify-center overflow-hidden transition-colors duration-500 group-hover:bg-sand-light">
                            <step.icon />
                          </div>
                        </div>
                        <span className="font-serif text-[12.5px] md:text-[13.5px] font-bold text-text-dark leading-snug px-1 transition-colors group-hover:text-terracotta tracking-wide">
                          {step.label}
                        </span>
                      </div>
                      
                      {/* Detailed SVG Arrow between steps */}
                      {index < steps.length - 1 && (
                        <>
                          <div className="journey-arrow hidden md:flex flex-1 justify-center -translate-y-6 opacity-60">
                            <svg viewBox="0 0 100 20" className="w-full h-5 stroke-gold-antique" preserveAspectRatio="none">
                              <path d="M0,10 L95,10 M90,5 L95,10 L90,15" fill="none" strokeWidth="1" />
                            </svg>
                          </div>
                          <div className="md:hidden w-[1.5px] h-8 bg-gradient-to-b from-gold-antique/60 to-transparent my-2" />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Promise Grid */}
              <div className="flex-1 xl:pl-10 mt-12 xl:mt-0">
                <div className="flex items-center justify-center gap-4 mb-12">
                  <h2 className="font-serif text-[19px] text-text-dark font-bold text-center tracking-[0.25em] uppercase">
                    THE KASHMIR PROMISE
                  </h2>
                </div>
                
                <div ref={promisesRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                  {promises.map((promise, index) => (
                    <div key={index} className="promise-card flex flex-col items-center text-center gap-4 p-4 transition-all duration-500 hover:-translate-y-1.5 group cursor-pointer border border-transparent hover:border-gold-antique/20 hover:bg-sand-light/20 rounded-sm">
                      <div className="h-[64px] w-[64px] md:h-[72px] md:w-[72px] flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 overflow-hidden rounded-full shadow-sm bg-white border border-sand-medium p-1 group-hover:border-gold-antique">
                        <promise.icon />
                      </div>
                      <div className="flex flex-col items-center gap-1.5">
                        <h3 className="font-serif text-[13.5px] md:text-[14.5px] font-extrabold text-text-dark uppercase tracking-[0.12em] leading-tight border-b border-transparent transition-colors group-hover:border-gold-antique/50 pb-0.5">
                          {promise.title}
                        </h3>
                        <p className="font-sans text-[11px] md:text-[12px] text-text-muted leading-relaxed px-1">
                          {promise.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
            
            {/* Horizontal Middle Line Divider connecting to the bottom section */}
            <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-sand-medium/10 via-sand-medium/60 to-sand-medium/10 transform translate-y-[1px] z-20"></div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
