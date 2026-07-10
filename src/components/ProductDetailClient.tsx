"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShieldCheck, Truck, ArrowLeft, Heart, Award, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types";

interface ProductDetailClientProps {
  product: Product;
  allProducts: Product[];
}

export default function ProductDetailClient({ product, allProducts }: ProductDetailClientProps) {
  const [selectedWeight, setSelectedWeight] = useState<string>("1 Gram");
  const [activeTab, setActiveTab] = useState<string>("benefits");
  const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // Price modifier based on weight selection (standard saffron pricing helper)
  const getModifiedPrice = () => {
    if (product.slug.includes("saffron")) {
      if (selectedWeight === "2 Grams") return product.price * 1.85;
      if (selectedWeight === "5 Grams") return product.price * 4.2;
    }
    return product.price;
  };

  const getOriginalPrice = () => {
    const price = getModifiedPrice();
    return Math.round(price * 1.33); // 25% discount representation
  };

  // Dynamically retrieve storytelling content depending on product type
  const getStorytellingData = () => {
    const slug = product.slug;

    if (slug.includes("shilajit")) {
      return {
        farmerName: "Tsering Namgyal",
        farmerRole: "High-Altitude Harvester, Gilgit-Baltistan",
        farmerImg: "/assets/images/story_farmer.png",
        collectiveTitle: "The Karakoram Harvesters",
        collectiveDesc: "Shilajit is the sweat of the mountains. We scale dangerous rocky heights above 16,000 feet to gather the raw black resin from steep cliff faces, purifying it through traditional water filtration methods over weeks to preserve all 85+ trace minerals.",
        images: ["/assets/images/category_shilajit.png", "/assets/images/story_picking.png"],
        tabs: {
          benefits: {
            title: "Nectar of the Himalayas",
            subtitle: "A potent source of fulvic acid and trace minerals to revitalize mind and body.",
            items: [
              { label: "Immense Energy", desc: "Boosts cellular mitochondrial function and relieves chronic fatigue." },
              { label: "Cognitive Power", desc: "Protects brain cells and enhances memory retention and focus." },
              { label: "Mineral Replenishment", desc: "Supplies essential humic substances and trace minerals." }
            ],
            image: "/assets/images/category_shilajit.png"
          },
          usage: {
            title: "Traditional Dissolving Guide",
            subtitle: "Shilajit is highly concentrated; a pea-sized portion is all you need.",
            items: [
              { label: "Measure", desc: "Dissolve a pea-sized portion (approx 250mg) daily." },
              { label: "Dissolve", desc: "Stir into warm milk, green tea, or pure water." },
              { label: "Timing", desc: "Consume on an empty stomach first thing in the morning." }
            ],
            image: "/assets/images/category_shilajit.png"
          },
          origin: {
            title: "Harvested Above 16,000 Feet",
            subtitle: "Sourced from pristine cliff fissures in the Karakoram range.",
            items: [
              { label: "Karakoram Peaks", desc: "Untouched by pollution, harvested only during summer months." },
              { label: "Raw Purification", desc: "Filtered with pure spring water and dried slowly in the sun." }
            ],
            image: "/assets/images/story_picking.png"
          },
          reports: {
            title: "Verified Heavy Metal Clearance",
            subtitle: "Every single purification run is tested for maximum safety.",
            items: [
              { label: "Heavy Metal Free", desc: "Tested for lead, arsenic, and mercury levels." },
              { label: "High Fulvic Acid", desc: "Certified concentration above 60% fulvic acid." }
            ],
            image: "/assets/images/category_shilajit.png"
          }
        }
      };
    }

    if (slug.includes("honey")) {
      return {
        farmerName: "Bashir Ahmad",
        farmerRole: "Wild Apiarist & Conservationist",
        farmerImg: "/assets/images/story_farmer.png",
        collectiveTitle: "The Forest Beekeepers",
        collectiveDesc: "Our honey is gathered in deep mountain woodlands where wild bees feed on organic acacia flowers. We keep the honey raw, unpasteurized, and completely unfiltered to preserve the beneficial enzymes and pollens.",
        images: ["/assets/images/category_honey.png", "/assets/images/story_picking.png"],
        tabs: {
          benefits: {
            title: "Untouched Forest Nectar",
            subtitle: "An organic wellness syrup loaded with active enzymes and vitamins.",
            items: [
              { label: "Soothing & Healing", desc: "Acts as a natural antibacterial throat coat and cough relief." },
              { label: "Prebiotic Support", desc: "Nourishes gut health and aids in digestive processes." },
              { label: "Antioxidant Rich", desc: "Contains key plant compounds to fight free radicals." }
            ],
            image: "/assets/images/category_honey.png"
          },
          usage: {
            title: "Daily Wellness Ritual",
            subtitle: "Pair with warm beverages or eat directly for instant vital energy.",
            items: [
              { label: "Sweetener", desc: "Use as a natural, low-glycemic sweetener in herbal teas." },
              { label: "Morning Blend", desc: "Stir one spoonful in warm lemon water to start your day." }
            ],
            image: "/assets/images/category_honey.png"
          },
          origin: {
            title: "Kashmiri Forest Foraging",
            subtitle: "Harvested from wild hives in deep cedar and acacia woodlands.",
            items: [
              { label: "Acacia Blossoms", desc: "Acacia trees blossom for only 15 days, yielding clean, clear nectar." }
            ],
            image: "/assets/images/story_picking.png"
          },
          reports: {
            title: "Pure Raw Certificate",
            subtitle: "Guaranteed free from sugar feeding, adulteration, or pasteurization.",
            items: [
              { label: "Zero Added Sugars", desc: "Verified 100% natural flower nectar honey." }
            ],
            image: "/assets/images/category_honey.png"
          }
        }
      };
    }

    // Default Saffron storytelling (matching figma screenshot)
    return {
      farmerName: "Abid Hussain",
      farmerRole: "Saffron Farmer, 4th Generation",
      farmerImg: "/assets/images/story_farmer.png",
      collectiveTitle: "The Pampore Collective",
      collectiveDesc: "Saffron isn't just a spice, it's the soul of our valley. We harvest at dawn before the sun can touch the stigmas, preserving the potent essence that makes Kashmiri saffron the best in the world.",
      images: ["/assets/images/story_picking.png", "/assets/images/story_sorting.png"],
      tabs: {
        benefits: {
          title: "The Golden Elixir for Wellness",
          subtitle: "Rich in antioxidants like crocin, safranal, and picrocrocin, our Mongra Saffron offers profound health benefits that have been documented for centuries.",
          items: [
            { label: "Mood Enhancement", desc: "Acts as a natural antidepressant by regulating serotonin." },
            { label: "Radiant Skin", desc: "Improves complexion and helps reduce hyperpigmentation." },
            { label: "Heart Health", desc: "Supports blood circulation and helps manage cholesterol." }
          ],
          image: "/assets/images/story_tea.png"
        },
        usage: {
          title: "How to Brew Saffron Infusions",
          subtitle: "Saffron requires warmth and time to release its full aromatic profile and rich crimson pigments.",
          items: [
            { label: "Grinding", desc: "Crush a few strands gently using a mortar and pestle." },
            { label: "Steeping", desc: "Soak in warm water, milk, or rosewater for 15-20 minutes before adding to dishes." },
            { label: "Cooking", desc: "Add the golden infusion at the final stage of cooking to preserve the flavor." }
          ],
          image: "/assets/images/story_tea.png"
        },
        origin: {
          title: "The Terracotta Fields of Pampore",
          subtitle: "Grown in the unique saffron soils of Pampore, nourished by the Jhelum River.",
          items: [
            { label: "Pampore Soil", desc: "Famous for its lacustrine clay, creating the perfect microclimate." },
            { label: "Traditional Sowing", desc: "Planted in small raised beds to ensure proper drainage." }
          ],
          image: "/assets/images/story_picking.png"
        },
        reports: {
          title: "100% Certified Saffron Purity",
          subtitle: "We test every single harvest batch in government-accredited laboratories to verify grade-A quality.",
          items: [
            { label: "Grade 1 Classification", desc: "Verified crocin value above 220, matching top grade parameters." },
            { label: "Zero Adulteration", desc: "Certified free of synthetic food coloring or foreign materials." }
          ],
          image: "/assets/images/story_sorting.png"
        }
      }
    };
  };

  const storyData = getStorytellingData();
  const currentTabContent = storyData.tabs[activeTab as keyof typeof storyData.tabs] || storyData.tabs.benefits;

  const getCategoryName = (): string => {
    if (!product.category) return "Spices";
    if (typeof product.category === "object" && "name" in product.category) {
      return product.category.name;
    }
    return String(product.category);
  };

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="pt-28 pb-24 bg-3d-paper min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-text-muted font-sans text-xs uppercase tracking-wider mb-8"
        >
          <Link href="/" className="hover:text-terracotta">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-terracotta">{getCategoryName()}</Link>
          <span>/</span>
          <span className="text-text-dark font-semibold">{product.name}</span>
        </motion.div>

        {/* Product Visual & Buying Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24">
          
          {/* Left: Interactive Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-5 transform-gpu will-change-transform"
          >
            {/* Main Visual Container */}
            <div className="relative aspect-square w-full bg-[#fafafa] border border-sand-medium p-4 flex items-center justify-center shadow-md rounded-sm overflow-hidden">
              <div className="absolute inset-[6px] border border-gold-antique/10 pointer-events-none z-10" />
              
              {/* Product Badge */}
              <div className="absolute top-6 left-6 z-20 bg-terracotta text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 shadow-md rounded-sm">
                LTD EDITION
              </div>

              <Image
                src={product.images[activeImgIndex] || product.images[0]}
                alt={product.name}
                fill
                className="object-contain p-6 transition-all duration-700 hover:scale-103"
              />
            </div>
            
            {/* Gallery Thumbnails */}
            <div className="flex gap-4">
              {product.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`relative w-20 h-20 bg-white border rounded-sm overflow-hidden transition-all duration-300 p-1.5 shadow-sm ${
                    activeImgIndex === idx ? "border-gold-antique ring-1 ring-gold-antique" : "border-sand-medium hover:border-gold-antique/50"
                  }`}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${idx + 1}`} fill className="object-contain p-1" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Detailed Purchasing Panel */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col text-left space-y-6 lg:pl-6 transform-gpu will-change-transform"
          >
            
            {/* Reviews summary */}
            <div className="flex items-center gap-2">
              <div className="flex text-gold-antique">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-sans text-[12px] text-text-muted font-semibold tracking-wide">(482 Verified Reviews)</span>
            </div>

            {/* Title & Brand */}
            <div>
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-[#cc6a12] mb-1.5 block">
                {product.brand} • Kashmiri Provenance
              </span>
              <h1 className="font-serif text-3.5xl md:text-5.5xl text-text-dark font-semibold leading-tight tracking-tight">
                {product.name}
              </h1>
            </div>

            {/* Description */}
            <p className="font-sans text-[15px] text-text-muted leading-relaxed font-medium">
              The world&apos;s finest Grade-A spice, meticulously hand-harvested from the fields of Pampore. Pure strands, rich flavor, and organic certifications.
            </p>

            {/* Price section */}
            <div className="flex items-baseline gap-4 pt-2 border-t border-sand-medium/40">
              <span className="font-serif text-3.5xl font-bold text-text-dark">
                ₹{getModifiedPrice().toLocaleString("en-IN")}
              </span>
              <span className="font-sans text-sm text-text-muted line-through">
                ₹{getOriginalPrice().toLocaleString("en-IN")}
              </span>
              <span className="bg-[#cc6a12]/10 border border-[#cc6a12]/20 px-2 py-0.5 text-[10px] font-bold text-terracotta uppercase tracking-wider rounded-sm">
                SAVE 25%
              </span>
            </div>

            {/* Saffron Weight Selectors */}
            {product.slug.includes("saffron") && (
              <div className="space-y-3 pt-2">
                <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-text-dark block">
                  Select Weight
                </span>
                <div className="flex gap-3">
                  {["1 Gram", "2 Grams", "5 Grams"].map((weight) => (
                    <button
                      key={weight}
                      onClick={() => setSelectedWeight(weight)}
                      className={`px-6 py-3 font-sans text-[11px] font-bold uppercase tracking-widest border transition-all duration-300 rounded-sm cursor-pointer ${
                        selectedWeight === weight
                          ? "border-terracotta bg-terracotta text-white shadow-sm"
                          : "border-sand-medium bg-white text-text-dark hover:border-gold-antique"
                      }`}
                    >
                      {weight}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleAddToCart}
                className="w-full py-4.5 bg-terracotta hover:bg-terracotta-hover text-white font-sans text-[11px] font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 rounded-sm shimmer-effect cursor-pointer"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Bag
                  </>
                ) : (
                  "Add to Bag"
                )}
              </button>
              <button
                className="w-full py-4 border border-gold-antique/60 hover:bg-sand-light text-text-dark font-sans text-[11px] font-bold uppercase tracking-widest transition-all duration-300 rounded-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                Subscribe & Save 10%
              </button>
            </div>

            {/* Trust Policies icons */}
            <div className="grid grid-cols-3 gap-2 pt-6 border-t border-sand-medium/40">
              <div className="flex flex-col items-center text-center p-3 border border-sand-medium/40 bg-white/50 rounded-sm">
                <ShieldCheck className="w-5 h-5 text-gold-dark mb-2" />
                <span className="font-serif text-[11px] font-bold text-text-dark uppercase tracking-wider leading-none">Authenticity</span>
                <span className="font-sans text-[9px] text-text-muted mt-1 leading-none">Guaranteed</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 border border-sand-medium/40 bg-white/50 rounded-sm">
                <Award className="w-5 h-5 text-gold-dark mb-2" />
                <span className="font-serif text-[11px] font-bold text-text-dark uppercase tracking-wider leading-none">Lab Report</span>
                <span className="font-sans text-[9px] text-text-muted mt-1 leading-none">Shipped</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 border border-sand-medium/40 bg-white/50 rounded-sm">
                <Truck className="w-5 h-5 text-gold-dark mb-2" />
                <span className="font-serif text-[11px] font-bold text-text-dark uppercase tracking-wider leading-none">Free Shipping</span>
                <span className="font-sans text-[9px] text-text-muted mt-1 leading-none">Worldwide</span>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Tab-driven Storytelling Panel (Figma detail request) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="mt-28 border-t border-sand-medium/40 pt-16 transform-gpu will-change-transform"
        >
          
          {/* Tab Headers */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 border-b border-sand-medium/40 pb-2">
            {[
              { id: "benefits", label: "HEALTH BENEFITS" },
              { id: "usage", label: "USAGE GUIDE" },
              { id: "origin", label: "ORIGIN STORY" },
              { id: "reports", label: "LAB REPORTS" }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative px-6 py-3 font-serif text-[12px] font-bold tracking-widest uppercase transition-colors duration-300 cursor-pointer"
                  style={{ color: isActive ? "var(--color-terracotta)" : "var(--color-text-muted)" }}
                >
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeDetailTab"
                      className="absolute bottom-[-10px] left-0 right-0 h-[2px] bg-terracotta"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel Layout */}
          <div className="min-h-[380px] bg-white border border-sand-medium/80 p-8 md:p-12 shadow-sm rounded-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              >
                {/* Left Panel: Description & Checks (7 cols) */}
                <div className="lg:col-span-7 text-left space-y-6">
                  <h3 className="font-serif text-3xl md:text-4.5xl font-semibold text-text-dark leading-tight text-glow-gold">
                    {currentTabContent.title}
                  </h3>
                  <p className="font-sans text-[15px] text-text-muted leading-relaxed font-medium">
                    {currentTabContent.subtitle}
                  </p>
                  
                  {/* Detailed features check items */}
                  <ul className="space-y-4 pt-4">
                    {currentTabContent.items.map((item: any, i: number) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="w-5 h-5 rounded-full bg-terracotta/10 border border-terracotta/25 flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-3.5 h-3.5 text-terracotta" />
                        </div>
                        <div>
                          <strong className="font-serif text-[14px] text-text-dark block uppercase tracking-wide">
                            {item.label}
                          </strong>
                          <span className="font-sans text-[13px] text-text-muted leading-snug mt-0.5 block">
                            {item.desc}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Panel: Story Tea Photo (5 cols) */}
                <div className="lg:col-span-5 relative w-full flex justify-center">
                  <div className="relative aspect-[4/3] w-full max-w-[380px] border border-sand-medium p-2 bg-[#fafafa] shadow-md rounded-sm">
                    <div className="relative w-full h-full overflow-hidden border border-sand-medium/40 rounded-sm">
                      <Image
                        src={currentTabContent.image}
                        alt={currentTabContent.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </motion.div>

        {/* Full-width dark green Pampore Collective section */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="mt-28 -mx-6 bg-[#0e271a] text-white py-24 relative overflow-hidden transform-gpu will-change-transform"
        >
          <div className="absolute inset-0 bg-luxury-pattern opacity-[0.02] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Side: Farmer Quote (7 cols) */}
              <div className="lg:col-span-7 text-left space-y-6">
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-gold-light border-b border-gold-light/30 pb-1">
                  HAND-HARVESTED PROVENANCE
                </span>
                <h2 className="font-serif text-3.5xl md:text-5xl text-white font-semibold leading-tight">
                  {storyData.collectiveTitle}
                </h2>
                
                <p className="font-serif text-[17px] md:text-[20px] italic text-gold-light/95 leading-relaxed font-light">
                  &quot;{storyData.collectiveDesc}&quot;
                </p>

                {/* Profile badge */}
                <div className="flex items-center gap-4 pt-6">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-gold-light/40 relative shadow-md">
                    <Image
                      src={storyData.farmerImg}
                      alt={storyData.farmerName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-serif text-[15px] font-bold text-white block tracking-wide">
                      {storyData.farmerName}
                    </span>
                    <span className="font-sans text-[11px] text-gold-light/80 block uppercase tracking-wider mt-0.5">
                      {storyData.farmerRole}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: 2-image grid (5 cols) */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <div className="relative aspect-[3/4] border border-gold-antique/20 p-1.5 bg-maroon-deep/30 rounded-sm shadow-md">
                  <div className="relative w-full h-full overflow-hidden rounded-sm">
                    <Image
                      src={storyData.images[0]}
                      alt="Harvesting process"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="relative aspect-[3/4] border border-gold-antique/20 p-1.5 bg-maroon-deep/30 rounded-sm shadow-md mt-6">
                  <div className="relative w-full h-full overflow-hidden rounded-sm">
                    <Image
                      src={storyData.images[1]}
                      alt="Sorting process"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Recommend Section: Complete the Ritual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="mt-28 pt-16 border-t border-sand-medium/40 transform-gpu will-change-transform"
        >
          <div className="text-center mb-16">
            <span className="font-sans text-[12px] font-bold uppercase tracking-[0.3em] text-[#cc6a12] block mb-2">
              RECOMMENDED PAIRINGS
            </span>
            <h2 className="font-serif text-3.5xl md:text-5xl text-text-dark font-semibold tracking-tight uppercase">
              Complete The Ritual
            </h2>
            <p className="font-sans text-[14px] text-text-muted mt-4 max-w-xl mx-auto leading-relaxed">
              Handpicked mountain essentials curated to perfectly pair with your saffron.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {allProducts
              .filter((p) => p.slug !== product.slug)
              .slice(0, 4)
              .map((p) => (
                <div key={p.id} className="transition-all duration-500 hover:-translate-y-1">
                  {/* Reuse our interactive ProductCard */}
                  <div className="bg-white border border-sand-medium/60 p-4 rounded-sm hover:shadow-xl transition-all duration-300">
                    <Link href={`/shop/${p.slug}`}>
                      <div className="aspect-square relative w-full mb-4 flex items-center justify-center bg-[#fafafa] rounded-sm overflow-hidden">
                        <Image src={p.images[0]} alt={p.name} fill className="object-contain p-2 hover:scale-104 transition-transform duration-500" />
                      </div>
                      <div className="text-left space-y-2">
                        <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-text-muted block">{p.brand}</span>
                        <h3 className="font-serif text-[15px] font-semibold text-text-dark leading-snug line-clamp-1">{p.name}</h3>
                        <span className="font-serif text-[17px] font-bold text-text-dark block">₹{p.price.toLocaleString("en-IN")}</span>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
