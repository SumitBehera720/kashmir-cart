"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Sparkles } from "lucide-react";

interface Compound {
  id: string;
  name: string;
  chemical: string;
  potency: string;
  role: string;
  description: string;
  spot: { x: string; y: string; label: string };
}

const COMPOUNDS: Compound[] = [
  {
    id: "crocin",
    name: "CROCIN",
    chemical: "Natural Color Carotenoid",
    potency: "250+ Color Index",
    role: "The signature deep crimson painting power & mood booster.",
    description: "Kashmiri saffron boasts a crocin value exceeding 250, compared to commercial varieties at ~180. This gives our Mongra strands their deep red hue and superior coloring capacity, while acting as a natural serotonin regulator to enhance mood.",
    spot: { x: "75%", y: "25%", label: "Strand Tip: Crocin" }
  },
  {
    id: "safranal",
    name: "SAFRANAL",
    chemical: "Volatile Aroma Compound",
    potency: "80+ Aroma Index",
    role: "Preserves the complex, earthy scent with sweet honey notes.",
    description: "Harvested strictly at dawn before the sun can evaporate the volatile oils, our saffron retains its high concentration of Safranal. This preserves the intense honey-hay aroma that defines authentic Kashmiri provenance.",
    spot: { x: "48%", y: "45%", label: "Strand Body: Safranal" }
  },
  {
    id: "picrocrocin",
    name: "PICROCROCIN",
    chemical: "Bitter Glucoside Compound",
    potency: "95+ Purity Rating",
    role: "Delivers the earth-sweet, therapeutic taste profile.",
    description: "Responsible for the unique bittersweet flavor, picrocrocin is an organic compound that also serves as a potent digestive aid. Kashmir's rich mineral-heavy soils yield the highest concentrations of this therapeutic compound.",
    spot: { x: "25%", y: "70%", label: "Strand Base: Picrocrocin" }
  }
];

export default function WhySaffronIsSpecial() {
  const [activeId, setActiveId] = useState<string>("crocin");
  const containerRef = useRef<HTMLElement>(null);
  
  const activeCompound = COMPOUNDS.find(c => c.id === activeId) || COMPOUNDS[0];

  return (
    <section 
      ref={containerRef} 
      className="py-28 bg-3d-paper border-b border-sand-medium relative overflow-hidden"
    >
      {/* Intricate Left/Right Background Borders */}
      <div className="absolute top-0 left-2 bottom-0 w-8 opacity-15 pointer-events-none flex flex-col justify-between py-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'40\' viewBox=\'0 0 20 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M10 0 C20 10, 20 30, 10 40 C0 30, 0 10, 10 0 Z\' fill=\'none\' stroke=\'%23b89047\' stroke-width=\'1\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat-y' }}></div>
      <div className="absolute top-0 right-2 bottom-0 w-8 opacity-15 pointer-events-none flex flex-col justify-between py-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'40\' viewBox=\'0 0 20 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M10 0 C20 10, 20 30, 10 40 C0 30, 0 10, 10 0 Z\' fill=\'none\' stroke=\'%23b89047\' stroke-width=\'1\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat-y' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="font-sans text-[13px] font-bold uppercase tracking-[0.35em] text-[#cc6a12] mb-3 block">
            Scientific Provenance
          </span>
          <h2 className="font-serif text-4xl md:text-5.5xl text-text-dark font-semibold tracking-tight uppercase">
            The Anatomy of Pure Saffron
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-antique/50" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold-antique/60" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-antique/50" />
          </div>
          <p className="font-sans text-[15px] text-text-muted max-w-2xl mx-auto mt-6 leading-relaxed">
            Unlike standard commercial spices, Kashmiri Saffron is famous for its high concentrations of bioactive compounds. Explore the three main markers that make Kashmiri Mongra the finest saffron in the world.
          </p>
        </div>

        {/* Interactive Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Interactive Image with Hotspots (5 cols) */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative aspect-[4/5] w-full max-w-[420px] border border-gold-antique/30 p-3 bg-white shadow-2xl rounded-sm group overflow-hidden">
              <div className="absolute inset-4 border border-gold-antique/10 pointer-events-none z-10" />
              
              <div className="relative w-full h-full overflow-hidden border border-sand-medium/40 rounded-sm">
                <Image
                  src="/assets/images/product_saffron.png"
                  alt="Interactive Kashmiri Saffron Strand Anatomy"
                  fill
                  className="object-cover scale-102 group-hover:scale-105 transition-transform duration-700 brightness-95"
                />
                
                {/* Hotspots Overlay */}
                {COMPOUNDS.map((comp) => {
                  const isActive = comp.id === activeId;
                  return (
                    <button
                      key={comp.id}
                      onClick={() => setActiveId(comp.id)}
                      className="absolute z-20 group/hotspot transition-all duration-300"
                      style={{ left: comp.spot.x, top: comp.spot.y }}
                    >
                      {/* Pulse rings */}
                      <span className="absolute -inset-4 flex items-center justify-center pointer-events-none">
                        <span className={`w-8 h-8 rounded-full border border-gold-antique/40 absolute animate-ping ${isActive ? "opacity-60" : "opacity-0 group-hover/hotspot:opacity-40"}`} />
                        <span className={`w-5 h-5 rounded-full border-[1.5px] border-gold-antique/60 absolute ${isActive ? "scale-110" : "scale-100 group-hover/hotspot:scale-110"} transition-transform duration-300`} />
                      </span>
                      
                      {/* Center Point */}
                      <div className={`w-3.5 h-3.5 rounded-full shadow-md flex items-center justify-center transition-all duration-300 ${isActive ? "bg-terracotta scale-125" : "bg-gold-antique group-hover/hotspot:bg-terracotta"}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>

                      {/* Tooltip Label */}
                      <span className={`absolute left-6 top-1/2 -translate-y-1/2 bg-maroon-dark text-white text-[9px] font-sans font-bold uppercase tracking-widest px-2.5 py-1 whitespace-nowrap shadow-md pointer-events-none rounded-sm border border-gold-antique/30 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 group-hover/hotspot:opacity-100"}`}>
                        {comp.spot.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Tab Selector & Info Panel (6 cols) */}
          <div className="lg:col-span-6 flex flex-col space-y-8 text-left">
            
            {/* Horizontal Tabs */}
            <div className="flex gap-2 border-b border-sand-medium/40 pb-2">
              {COMPOUNDS.map((comp) => {
                const isActive = comp.id === activeId;
                return (
                  <button
                    key={comp.id}
                    onClick={() => setActiveId(comp.id)}
                    className="relative px-4 py-2 font-serif text-[13px] font-bold tracking-wider uppercase transition-colors duration-300 cursor-pointer"
                    style={{ color: isActive ? "var(--color-terracotta)" : "var(--color-text-muted)" }}
                  >
                    {comp.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeSpecialTab"
                        className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-terracotta"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Content Panel with fade animation */}
            <div className="min-h-[280px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-5"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-[#cc6a12] border-b border-[#cc6a12]/30 pb-1">
                      {activeCompound.chemical}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-[#cc6a12]/10 border border-[#cc6a12]/20 px-2 py-0.5 text-[10px] font-bold text-[#cc6a12] uppercase tracking-wider rounded-sm">
                      <Sparkles className="w-3 h-3" /> {activeCompound.potency}
                    </span>
                  </div>

                  <h3 className="font-serif text-[28px] md:text-[36px] font-bold text-text-dark leading-tight tracking-tight text-glow-gold">
                    {activeCompound.name}
                  </h3>

                  <p className="font-serif text-[16px] italic text-text-muted leading-relaxed">
                    &quot;{activeCompound.role}&quot;
                  </p>

                  <p className="font-sans text-[14px] md:text-[15px] text-text-muted leading-relaxed">
                    {activeCompound.description}
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t border-sand-medium/40">
                    <div className="flex items-center gap-2 text-gold-dark">
                      <ShieldCheck className="w-5 h-5" />
                      <span className="font-sans text-[11px] font-bold uppercase tracking-widest">
                        Lab Tested Certificate Attached
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}
