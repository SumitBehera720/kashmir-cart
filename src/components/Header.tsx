"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User, Heart, ShoppingBag, ChevronDown } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-maroon-deep shadow-md py-3 border-b border-gold-antique/20"
          : "bg-pattern-maroon py-5 border-b border-gold-antique/25"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group relative h-12 w-48">
          <Image 
            src="/assets/images/logo.png" 
            alt="Kashmir Cart Logo" 
            fill 
            className="object-contain object-left"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            <li>
              <Link href="/" className="nav-item">
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop" className="nav-item flex items-center gap-1 group">
                Shop <ChevronDown className="w-3 h-3 text-gold-light group-hover:text-text-white transition-colors" />
              </Link>
            </li>
            <li>
              <Link href="/categories" className="nav-item flex items-center gap-1 group">
                Categories <ChevronDown className="w-3 h-3 text-gold-light group-hover:text-text-white transition-colors" />
              </Link>
            </li>
            <li>
              <Link href="/our-story" className="nav-item">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/blog" className="nav-item flex items-center gap-1 group">
                Kashmir <ChevronDown className="w-3 h-3 text-gold-light group-hover:text-text-white transition-colors" />
              </Link>
            </li>
            <li>
              <Link href="/blog" className="nav-item">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="nav-item">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button className="header-action-btn group">
            <Search className="w-5 h-5 text-gold-light group-hover:text-text-white transition-colors" />
            <span className="header-action-label">Search</span>
          </button>
          <button className="header-action-btn group">
            <User className="w-5 h-5 text-gold-light group-hover:text-text-white transition-colors" />
            <span className="header-action-label">Account</span>
          </button>
          <button className="header-action-btn group">
            <Heart className="w-5 h-5 text-gold-light group-hover:text-text-white transition-colors" />
            <span className="header-action-label">Wishlist</span>
          </button>
          <button className="header-action-btn group relative">
            <ShoppingBag className="w-5 h-5 text-gold-light group-hover:text-text-white transition-colors" />
            <span className="absolute -top-1 -right-2 bg-gold-antique text-maroon-deep text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
            <span className="header-action-label">Cart</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
