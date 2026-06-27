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
    <section ref={containerRef} className="pt-16 pb-8 bg-[#fcfaf5] relative overflow-hidden" style={{ backgroundImage: "url('/assets/images/bg_pattern_light.png')", backgroundSize: '400px', backgroundRepeat: 'repeat', backgroundBlendMode: 'multiply' }}>
      
      {/* Intricate Left/Right Background Borders */}
      <div className="absolute top-0 left-2 bottom-0 w-8 opacity-20 pointer-events-none flex flex-col justify-between py-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'40\' viewBox=\'0 0 20 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M10 0 C20 10, 20 30, 10 40 C0 30, 0 10, 10 0 Z\' fill=\'none\' stroke=\'%23b89047\' stroke-width=\'1\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat-y' }}></div>
      <div className="absolute top-0 right-2 bottom-0 w-8 opacity-20 pointer-events-none flex flex-col justify-between py-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'40\' viewBox=\'0 0 20 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M10 0 C20 10, 20 30, 10 40 C0 30, 0 10, 10 0 Z\' fill=\'none\' stroke=\'%23b89047\' stroke-width=\'1\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat-y' }}></div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-12 relative z-10">
        {/* Top half of the unified border box */}
        <div className="border-t-[1.5px] border-l-[1.5px] border-r-[1.5px] border-[#cba358]/50 p-1.5 relative shadow-sm" style={{ backgroundImage: "url('/assets/images/bg_pattern_light.png')", backgroundSize: '300px', backgroundRepeat: 'repeat', backgroundBlendMode: 'multiply' }}>
          <div className="border-t-[0.5px] border-l-[0.5px] border-r-[0.5px] border-[#cba358]/30 p-8 md:p-12 relative bg-[#fdfaf4]/90 backdrop-blur-sm">
            
            <div className="flex flex-col xl:flex-row gap-12 xl:gap-0 justify-between items-stretch">
              
              {/* Left: Journey Stepper */}
              <div className="flex-1 xl:pr-10">
                <div className="flex items-center justify-center gap-4 mb-12">
                  <h2 className="font-serif text-[17px] text-[#3d0c11] font-semibold text-center tracking-[0.2em] uppercase">
                    FROM KASHMIR&apos;S FIELDS TO YOUR HOME
                  </h2>
                </div>
                
                <div ref={stepsRef} className="flex flex-row items-start justify-between w-full relative">
                  {steps.map((step, index) => (
                    <div key={index} className="flex flex-row items-center w-full">
                      <div className="journey-step flex flex-col items-center gap-5 group text-center z-10 w-28 cursor-pointer">
                        {/* Premium Double Ring Circle */}
                        <div className="w-[84px] h-[84px] rounded-full border-[1.5px] border-[#cba358] bg-[#fcfaf5] flex items-center justify-center shadow-md relative overflow-hidden p-1 transition-transform duration-500 group-hover:scale-110">
                          <div className="w-full h-full rounded-full border-[1px] border-[#cba358]/50 bg-[#fffdf9] flex items-center justify-center overflow-hidden transition-colors duration-500 group-hover:bg-[#fbf5e9]">
                            <step.icon />
                          </div>
                        </div>
                        <span className="font-serif text-[12px] font-semibold text-[#3d0c11] leading-snug px-1 transition-colors group-hover:text-[#8c672b]">
                          {step.label}
                        </span>
                      </div>
                      
                      {/* Detailed SVG Arrow between steps */}
                      {index < steps.length - 1 && (
                        <div className="journey-arrow flex-1 flex justify-center -translate-y-6 opacity-60">
                          <svg viewBox="0 0 100 20" className="w-full h-5 stroke-[#cba358]" preserveAspectRatio="none">
                            <path d="M0,10 L95,10 M90,5 L95,10 L90,15" fill="none" strokeWidth="1" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Promise Grid */}
              <div className="flex-1 xl:pl-10 mt-12 xl:mt-0">
                <div className="flex items-center justify-center gap-4 mb-12">
                  <h2 className="font-serif text-[17px] text-[#3d0c11] font-semibold text-center tracking-[0.2em] uppercase">
                    THE KASHMIR PROMISE
                  </h2>
                </div>
                
                <div ref={promisesRef} className="flex flex-row justify-between items-start w-full gap-4">
                  {promises.map((promise, index) => (
                    <div key={index} className="promise-card flex flex-col items-center text-center gap-5 flex-1 p-3 transition-transform duration-500 hover:-translate-y-2 group cursor-pointer">
                      <div className="h-[72px] w-[72px] flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 overflow-hidden rounded-full shadow-sm bg-[#fffdf9] border border-[#cba358]/30 p-1">
                        <promise.icon />
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <h3 className="font-serif text-[13px] font-bold text-[#3d0c11] uppercase tracking-[0.1em] leading-tight border-b border-transparent transition-colors group-hover:border-[#cba358]/50 pb-1">
                          {promise.title}
                        </h3>
                        <p className="font-sans text-[11px] text-[#5a4b40] leading-snug px-1">
                          {promise.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
            
            {/* Horizontal Middle Line Divider connecting to the bottom section */}
            <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-[#cba358]/10 via-[#cba358]/60 to-[#cba358]/10 transform translate-y-[1px] z-20"></div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
