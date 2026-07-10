"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User, Heart, ShoppingBag, ChevronDown, X, Menu } from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

const categoryLinks = [
  { label: "Kashmiri Saffron",     href: "/shop" },
  { label: "Himalayan Shilajit",   href: "/shop" },
  { label: "Kashmiri Honey",       href: "/shop" },
  { label: "Kahwa Tea",            href: "/shop" },
  { label: "Dry Fruits & Nuts",    href: "/shop" },
  { label: "Kashmiri Spices",      href: "/shop" },
  { label: "Pashmina & Textiles",  href: "/shop" },
  { label: "Ayurveda Skincare",    href: "/shop" },
  { label: "Himalayan Salts",      href: "/shop" },
  { label: "Herbal Teas",          href: "/shop" },
];

export default function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const catRef = useRef<HTMLLIElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.role === "admin" || user.role === "super_admin") {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setCatOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-sand-light/95 backdrop-blur-md shadow-sm py-3 border-b border-sand-medium"
            : "bg-transparent py-5 border-b border-white/10"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo - Serif text to match Figma KASHMIRCART */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-serif text-[22px] md:text-[24px] font-bold tracking-[0.08em] text-gold-antique group-hover:text-gold-dark transition-colors uppercase">
              KashmiriCart
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              <li>
                <Link href="/" className="nav-item nav-link-premium">Home</Link>
              </li>
              <li>
                <Link href="/shop" className="nav-item nav-link-premium">Shop</Link>
              </li>

              {/* Categories Dropdown */}
              <li ref={catRef} className="relative">
                <button
                  onClick={() => setCatOpen((v) => !v)}
                  className="nav-item nav-link-premium flex items-center gap-1 group bg-transparent border-none cursor-pointer"
                >
                  Categories
                  <ChevronDown
                    className={`w-3 h-3 text-text-dark group-hover:text-terracotta transition-transform duration-200 ${catOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {catOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-3 w-56 bg-white/95 backdrop-blur-md border border-sand-medium shadow-lg z-50 py-2 rounded-sm overflow-hidden"
                    >
                      {categoryLinks.map((cat) => (
                        <Link
                          key={cat.label}
                          href={cat.href}
                          onClick={() => setCatOpen(false)}
                          className="block px-4 py-2.5 font-sans text-[11px] text-text-dark hover:bg-sand-light hover:text-terracotta transition-colors uppercase tracking-wider font-semibold"
                        >
                          {cat.label}
                        </Link>
                      ))}
                      <div className="border-t border-sand-medium mt-2 pt-2">
                        <Link
                          key="view-all"
                          href="/shop"
                          onClick={() => setCatOpen(false)}
                          className="block px-4 py-2 font-sans text-[11px] font-bold text-gold-antique hover:text-terracotta uppercase tracking-widest"
                        >
                          View All →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              <li>
                <Link href="/our-story" className="nav-item nav-link-premium">Our Story</Link>
              </li>
              <li>
                <Link href="/blog" className="nav-item nav-link-premium">Blog</Link>
              </li>
              <li>
                <Link href="/saffron-lab-reports" className="nav-item nav-link-premium">Lab Reports</Link>
              </li>
              <li>
                <Link href="/contact" className="nav-item nav-link-premium">Contact</Link>
              </li>
              {isAdmin && (
                <li>
                  <Link href="/admin" className="nav-item nav-link-premium font-semibold text-terracotta hover:text-terracotta-hover transition-colors">
                    Admin
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <button className="header-action-btn group">
              <Search className="w-5 h-5 text-text-dark group-hover:text-terracotta transition-colors" />
              <span className="header-action-label">Search</span>
            </button>
            <Link href="/login" className="header-action-btn group">
              <User className="w-5 h-5 text-text-dark group-hover:text-terracotta transition-colors" />
              <span className="header-action-label">Account</span>
            </Link>
            <button className="header-action-btn group relative">
              <ShoppingBag className="w-5 h-5 text-text-dark group-hover:text-terracotta transition-colors" />
              <span className="absolute -top-1 -right-2 bg-terracotta text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
              <span className="header-action-label">Cart</span>
            </button>
            {/* Mobile menu toggle */}
            <button
              className="md:hidden header-action-btn group"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-text-dark" />
              ) : (
                <Menu className="w-5 h-5 text-text-dark" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-sand-light pt-24 px-6 overflow-y-auto md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Shop" },
                { href: "/our-story", label: "Our Story" },
                { href: "/blog", label: "Blog" },
                { href: "/saffron-lab-reports", label: "Lab Reports" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-serif text-[18px] text-text-dark py-3 border-b border-sand-medium hover:text-terracotta transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2">
                <p className="font-sans text-[10px] uppercase tracking-widest text-gold-antique mb-2 mt-4">Categories</p>
                {categoryLinks.map((cat) => (
                  <Link
                    key={cat.label}
                    href={cat.href}
                    onClick={() => setMobileOpen(false)}
                    className="block font-sans text-[13px] text-text-muted py-2 border-b border-sand-medium hover:text-terracotta transition-colors"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 block font-sans text-[13px] font-bold text-terracotta uppercase tracking-widest"
                >
                  ⚙ Admin Portal
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
