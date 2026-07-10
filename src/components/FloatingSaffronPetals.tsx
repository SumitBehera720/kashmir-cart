"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// Saffron Petal SVG
const PetalSVG = () => (
  <svg viewBox="0 0 40 60" fill="none" className="w-12 h-16 text-[#8a5ea5] opacity-25">
    <path
      d="M20 5 C5 25, 2 45, 20 55 C38 45, 35 25, 20 5 Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.5"
    />
    <path d="M20 5 C15 25, 12 40, 20 55" stroke="currentColor" strokeWidth="0.25" opacity="0.4" />
  </svg>
);

// Saffron Stigma Strand (Crimson Ribbon)
const StigmaSVG = () => (
  <svg viewBox="0 0 20 60" fill="none" className="w-6 h-18 text-[#c02626] opacity-30">
    <path
      d="M5 5 C15 20, 18 40, 10 55"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path d="M10 5 C18 15, 2 35, 8 55" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
  </svg>
);

// Gold Foil Flake
const GoldFlakeSVG = () => (
  <svg viewBox="0 0 30 30" fill="none" className="w-8 h-8 text-[#d6af65] opacity-35">
    <path
      d="M15 2 L22 10 L28 15 L20 22 L15 28 L10 20 L2 15 L8 10 Z"
      fill="currentColor"
    />
  </svg>
);

interface Particle {
  id: number;
  type: "petal" | "stigma" | "gold";
  left: string;
  top: string;
  speed: number;
  scale: number;
  rotateStart: number;
  driftDuration: number;
}

interface FloatingParticleProps {
  particle: Particle;
  scrollY: any;
}

function FloatingParticle({ particle: p, scrollY }: FloatingParticleProps) {
  // Calculate scroll-linked vertical translation for 3D parallax
  const y = useTransform(scrollY, [0, 5000], [0, 5000 * p.speed]);

  return (
    <motion.div
      style={{
        left: p.left,
        top: p.top,
        y,
        scale: p.scale,
        rotate: p.rotateStart,
        animationDuration: `${p.driftDuration}s`,
      }}
      className="absolute petal-drift transform-gpu will-change-transform"
    >
      {p.type === "petal" && <PetalSVG />}
      {p.type === "stigma" && <StigmaSVG />}
      {p.type === "gold" && <GoldFlakeSVG />}
    </motion.div>
  );
}

export default function FloatingSaffronPetals() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate static seed coordinates on client load
  useEffect(() => {
    const list: Particle[] = [
      { id: 1, type: "petal", left: "8%", top: "8%", speed: -0.15, scale: 0.9, rotateStart: 12, driftDuration: 14 },
      { id: 2, type: "stigma", left: "85%", top: "18%", speed: 0.2, scale: 1.1, rotateStart: 45, driftDuration: 18 },
      { id: 3, type: "gold", left: "12%", top: "28%", speed: -0.1, scale: 0.8, rotateStart: 90, driftDuration: 12 },
      { id: 4, type: "petal", left: "78%", top: "38%", speed: 0.25, scale: 1.0, rotateStart: -30, driftDuration: 16 },
      { id: 5, type: "stigma", left: "5%", top: "48%", speed: -0.2, scale: 1.2, rotateStart: 15, driftDuration: 20 },
      { id: 6, type: "gold", left: "90%", top: "58%", speed: 0.15, scale: 0.7, rotateStart: 60, driftDuration: 10 },
      { id: 7, type: "petal", left: "10%", top: "68%", speed: -0.25, scale: 0.95, rotateStart: 85, driftDuration: 15 },
      { id: 8, type: "stigma", left: "82%", top: "78%", speed: 0.18, scale: 1.0, rotateStart: -45, driftDuration: 17 },
      { id: 9, type: "gold", left: "15%", top: "88%", speed: -0.12, scale: 0.85, rotateStart: 120, driftDuration: 11 },
      { id: 10, type: "petal", left: "88%", top: "94%", speed: 0.22, scale: 1.05, rotateStart: 25, driftDuration: 19 },
    ];
    setParticles(list);
  }, []);

  const { scrollY } = useScroll();

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-10"
      style={{ minHeight: "100%" }}
    >
      {particles.map((p) => (
        <FloatingParticle key={p.id} particle={p} scrollY={scrollY} />
      ))}
    </div>
  );
}
