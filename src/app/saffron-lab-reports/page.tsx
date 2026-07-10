import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Saffron Lab Reports | Kashmir Cart",
  description: "View our authentic NABL accredited lab reports verifying the purity, color, and aroma of our Kashmiri Saffron.",
};

export default function SaffronLabReportsPage() {
  return (
    <div className="pt-28 pb-24 bg-[#fdfaf4] min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        
        <Link href="/" className="inline-flex items-center gap-2 text-[#8c672b] hover:text-[#3d0c11] transition-colors mb-8 text-sm font-semibold uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-[#8c672b] mb-3 font-semibold">
            Quality Assurance
          </p>
          <h1 className="font-serif text-3xl md:text-5xl text-[#3d0c11] uppercase tracking-wider mb-6">
            Saffron Lab Reports
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-[#cba358]/50" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#cba358]/60" />
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-[#cba358]/50" />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white border border-[#cba358]/30 shadow-xl p-8 md:p-12 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8c2f39] to-[#3d0c11]" />
          
          <div className="prose prose-stone max-w-none text-center mb-10">
            <p className="text-[#5a4a3a] leading-relaxed">
              At Kashmir Cart, we believe in complete transparency. Our Mongra Saffron is rigorously tested by independent, NABL-accredited laboratories. These tests verify the ISO 3632 standard parameters for Grade 1 Saffron, ensuring you receive only the highest quality product with maximum crocin (color), picrocrocin (flavor), and safranal (aroma) levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { title: "Crocin (Color)", value: "> 250", desc: "Grade 1 standard is 200" },
              { title: "Safranal (Aroma)", value: "20 - 50", desc: "Optimal aroma profile" },
              { title: "Picrocrocin (Flavor)", value: "> 70", desc: "Grade 1 standard is 70" },
            ].map((stat, i) => (
              <div key={i} className="bg-[#fdfaf4] border border-[#cba358]/20 p-5 text-center">
                <h3 className="font-serif text-[13px] text-[#8c672b] uppercase tracking-widest mb-2">{stat.title}</h3>
                <div className="font-serif text-3xl text-[#3d0c11] mb-1">{stat.value}</div>
                <p className="text-[10px] text-[#6b5a4e] uppercase tracking-wider">{stat.desc}</p>
              </div>
            ))}
          </div>

          <div className="relative w-full border border-[#cba358]/40 shadow-inner bg-[#f9f9f9] p-4 flex justify-center">
            <img 
              src="/assets/images/saffron-lab-report.png" 
              alt="Official Saffron Lab Report - Omega Test House" 
              className="w-full h-auto max-w-3xl object-contain shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
