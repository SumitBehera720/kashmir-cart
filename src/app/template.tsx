"use client";

import { motion } from "framer-motion";

export default function PageTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Sliding Transition Cover */}
      <motion.div
        initial={{ translateY: "0%" }}
        animate={{ translateY: "-100%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 bg-[#2c080b] z-[9999] flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="flex flex-col items-center gap-4">
          <span className="font-serif text-3xl font-bold text-[#d6af65] tracking-[0.2em] animate-pulse">
            KASHMIRCART
          </span>
          <div className="w-12 h-[1px] bg-[#d6af65]/30" />
        </div>
      </motion.div>

      {/* Content Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
