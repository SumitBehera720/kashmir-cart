"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Intricate SVG Icons replacing simple lucide-react ones
const OriginIcon = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10 stroke-[#cba358] fill-none" strokeWidth="1.5">
    <path d="M32 8 C32 8, 12 28, 12 40 C12 52, 22 60, 32 60 C42 60, 52 52, 52 40 C52 28, 32 8, 32 8 Z" fill="#b89047" fillOpacity="0.1" />
    <circle cx="32" cy="40" r="8" />
    <path d="M32 40 L32 20" strokeWidth="2" />
    <path d="M26 30 L32 20 L38 30" />
  </svg>
);

const BenefitsIcon = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10 stroke-[#cba358] fill-none" strokeWidth="1.5">
    <circle cx="32" cy="32" r="24" strokeDasharray="2 4" />
    <path d="M32 16 L36 28 L48 32 L36 36 L32 48 L28 36 L16 32 L28 28 Z" fill="#b89047" fillOpacity="0.2" />
    <circle cx="32" cy="32" r="4" fill="#cba358" stroke="none" />
  </svg>
);

const TraditionIcon = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10 stroke-[#cba358] fill-none" strokeWidth="1.5">
    <path d="M32 8 C40 20, 56 24, 56 40 C56 52, 44 60, 32 60 C20 60, 8 52, 8 40 C8 24, 24 20, 32 8 Z" />
    <path d="M32 60 L32 24" strokeWidth="2" />
    <path d="M16 40 C20 36, 28 36, 32 40" />
    <path d="M48 40 C44 36, 36 36, 32 40" />
    <path d="M20 48 C24 44, 28 44, 32 48" />
    <path d="M44 48 C40 44, 36 44, 32 48" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10 stroke-[#cba358] fill-none" strokeWidth="1.5">
    <path d="M32 8 L38 24 L56 24 L42 34 L48 52 L32 42 L16 52 L22 34 L8 24 L26 24 Z" fill="#b89047" fillOpacity="0.1" />
    <circle cx="32" cy="32" r="10" />
    <circle cx="32" cy="32" r="4" fill="#cba358" stroke="none" />
  </svg>
);

const GuideIcon = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10 stroke-[#cba358] fill-none" strokeWidth="1.5">
    <path d="M12 24 C12 24, 32 16, 52 24 L48 56 C48 56, 32 62, 16 56 Z" fill="#b89047" fillOpacity="0.1" />
    <path d="M12 24 C12 24, 32 32, 52 24" />
    <path d="M32 8 L32 28" strokeWidth="2" />
    <path d="M26 14 L32 8 L38 14" />
  </svg>
);

const QualityIcon = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10 stroke-[#cba358] fill-none" strokeWidth="1.5">
    <path d="M32 8 L52 16 L52 32 C52 48, 32 60, 32 60 C32 60, 12 48, 12 32 L12 16 Z" fill="#b89047" fillOpacity="0.1" />
    <circle cx="32" cy="30" r="8" />
    <path d="M28 30 L31 33 L38 26" strokeWidth="2" />
  </svg>
);

const features = [
  { icon: OriginIcon, title: "ORIGIN", desc: "The finest saffron from Kashmir valleys." },
  { icon: BenefitsIcon, title: "BENEFITS", desc: "Rich in antioxidants and natural goodness." },
  { icon: TraditionIcon, title: "TRADITIONAL USES", desc: "Used in Ayurveda, Kahwa and more." },
  { icon: StarIcon, title: "HOW TO IDENTIFY PURE SAFFRON", desc: "Tips to identify original Kashmiri saffron." },
  { icon: GuideIcon, title: "STORAGE GUIDE", desc: "How to store saffron the right way." },
  { icon: QualityIcon, title: "QUALITY ASSURANCE", desc: "100% pure and lab tested quality." },
];

export default function WhySaffronIsSpecial() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Left Image
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { opacity: 0, x: -40, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 75%" } }
        );
      }

      // Animate Feature Cards
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.feature-card');
        gsap.fromTo(cards,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.1)", scrollTrigger: { trigger: containerRef.current, start: "top 75%" } }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="pt-8 pb-16 bg-[#fcfaf5] relative overflow-hidden">
      
      {/* Intricate Left/Right Background Borders */}
      <div className="absolute top-0 left-2 bottom-0 w-8 opacity-20 pointer-events-none flex flex-col justify-between py-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'40\' viewBox=\'0 0 20 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M10 0 C20 10, 20 30, 10 40 C0 30, 0 10, 10 0 Z\' fill=\'none\' stroke=\'%23b89047\' stroke-width=\'1\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat-y' }}></div>
      <div className="absolute top-0 right-2 bottom-0 w-8 opacity-20 pointer-events-none flex flex-col justify-between py-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'40\' viewBox=\'0 0 20 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M10 0 C20 10, 20 30, 10 40 C0 30, 0 10, 10 0 Z\' fill=\'none\' stroke=\'%23b89047\' stroke-width=\'1\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat-y' }}></div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-12 relative z-10">
        {/* Bottom half of the unified border box */}
        <div className="border-b-[1.5px] border-l-[1.5px] border-r-[1.5px] border-[#cba358]/50 p-1.5 relative bg-[#fdfaf4] shadow-sm">
          <div className="border-b-[0.5px] border-l-[0.5px] border-r-[0.5px] border-[#cba358]/30 p-8 md:p-12 relative">
            
            {/* Inner Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-center">
              
              {/* Left: Image */}
              <div ref={imageRef} className="relative aspect-[4/3] lg:aspect-[5/4] w-full border-[1.5px] border-[#cba358] p-2 bg-[#fffdf9] shadow-lg group">
                <div className="relative w-full h-full overflow-hidden border-[1px] border-[#cba358]/50">
                  <Image
                    src="/assets/images/product_saffron.png"
                    alt="Kashmiri Saffron Flowers and Strands"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 border-[1px] border-white/20 mix-blend-overlay"></div>
                </div>
                {/* Decorative Overlay Corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-[2px] border-l-[2px] border-[#cba358] m-3 shadow-sm" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[2px] border-r-[2px] border-[#cba358] m-3 shadow-sm" />
              </div>

              {/* Right: Grid */}
              <div ref={cardsRef} className="flex flex-col">
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="font-serif text-[17px] text-[#3d0c11] font-semibold tracking-[0.2em] uppercase">
                    WHY KASHMIRI SAFFRON IS SPECIAL
                  </h2>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[#cba358]/60 to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
                  {features.map((feature, index) => (
                    <div key={index} className="feature-card border border-[#cba358]/30 p-5 flex flex-col gap-3 transition-all duration-300 hover:bg-[#fffdf9] hover:-translate-y-1 hover:shadow-md hover:border-[#cba358]/60 bg-[#fdfaf4] group relative">
                      {/* Very thin inner border that appears on hover */}
                      <div className="absolute inset-1 border-[0.5px] border-[#cba358]/0 transition-colors duration-300 group-hover:border-[#cba358]/30 pointer-events-none"></div>
                      
                      <div className="flex items-start gap-4 relative z-10">
                        <div className="flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                          <feature.icon />
                        </div>
                        <div className="flex flex-col gap-1.5 pt-1">
                          <h3 className="font-serif text-[12px] font-bold text-[#3d0c11] uppercase tracking-[0.15em] leading-tight">
                            {feature.title}
                          </h3>
                          <p className="font-sans text-[11px] text-[#5a4b40] leading-relaxed">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
