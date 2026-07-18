"use client";

import { motion } from "framer-motion";

const certificationsRow1 = [
  {
    name: "Government of India Registration",
    logo: "/assets/images/goi-emblem.svg",
    label: "Registration No. 4008713",
    description: "Officially registered business entity operating under Government of India records.",
    color: "from-gold-antique via-gold-light to-gold-dark"
  },
  {
    name: "Government of J&K Registration",
    logo: "/assets/images/JK_Govt_3-removebg-preview.png",
    label: "Registration No. 97088298",
    description: "Recognised and registered within Jammu & Kashmir regulatory framework.",
    color: "from-gold-antique via-gold-light to-gold-dark"
  }
];

const certificationsRow2 = [
  {
    name: "FSSAI Licensed",
    logo: "/assets/images/fssai-removebg-preview.png",
    label: "License No. 21025472000232",
    description: "Food safety compliance for saffron, honey, dry fruits, spices and wellness products.",
    color: "from-gold-antique via-gold-light to-gold-dark"
  },
  {
    name: "Udyam Registered MSME",
    logo: "/assets/images/msme-logo.svg",
    label: "UDYAM-JK-15-0033453",
    description: "Registered Micro, Small & Medium Enterprise recognized by Government of India.",
    color: "from-gold-antique via-gold-light to-gold-dark"
  }
];

const certificationRow3 = {
  name: "ISO 9001:2015 Certified",
  logo: "/assets/images/iso-logo.svg",
  label: "IN-QSCERT-2025-11-075",
  description: "International quality management certification reflecting commitment to operational excellence.",
  color: "from-gold-antique via-gold-light to-gold-dark"
};

export default function CertificationBadges() {
  return (
    <section className="py-24 bg-maroon-deep text-white relative overflow-hidden border-t border-gold-antique/20">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-luxury-pattern opacity-[0.03] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <p className="font-sans text-[13px] font-bold uppercase tracking-[0.3em] text-gold-light mb-3">
            VERIFIED &bull; REGISTERED &bull; CERTIFIED
          </p>
          <h2 className="font-serif text-4xl md:text-5.5xl text-white uppercase tracking-wider font-semibold mb-4 leading-tight">
            Trusted By Customers Across India Through Verified Compliance &amp; Certifications
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-antique/50" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold-antique/60" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-antique/50" />
          </div>
          <p className="font-sans text-[15px] text-white/80 max-w-2xl mx-auto mt-6 leading-relaxed">
            KashmirCart operates under recognised registrations, certifications, and regulatory compliance frameworks. Every product is sourced with a commitment to authenticity, quality assurance, transparency, and customer trust.
          </p>
        </div>

        {/* Grid Container */}
        <div className="space-y-8 max-w-5xl mx-auto">
          
          {/* Row 1: Two Side-By-Side (2:2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certificationsRow1.map((cert) => (
              <div key={cert.name} className="bg-maroon-dark border border-gold-antique/30 hover:border-gold-light/40 hover:shadow-2xl transition-all duration-500 p-8 md:p-10 text-center flex flex-col justify-between items-center relative overflow-hidden group rounded-sm hover:-translate-y-1.5">
                <div className={`absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r ${cert.color}`} />
                {/* Luxury Inner Frame */}
                <div className="absolute inset-2.5 border border-gold-antique/25 group-hover:inset-3 group-hover:border-gold-light/50 transition-all duration-500 pointer-events-none rounded-sm" />
                
                <div className="h-24 w-full max-w-[180px] bg-white/95 border border-gold-antique/30 rounded-sm flex items-center justify-center mb-6 relative z-10 px-4 py-2 shadow-md">
                  <img src={cert.logo} alt={cert.name} className="h-16 max-w-full object-contain group-hover:scale-103 transition-transform duration-300" />
                </div>
                <div className="space-y-4 relative z-10">
                  <h3 className="font-serif text-lg text-white font-semibold tracking-wide">
                    {cert.name}
                  </h3>
                  <div className="inline-block px-4 py-1.5 text-[10px] font-bold text-gold-light border border-gold-antique/30 bg-maroon-deep uppercase tracking-widest rounded-sm">
                    {cert.label}
                  </div>
                  <p className="font-sans text-xs text-white/80 leading-relaxed max-w-md mx-auto">
                    {cert.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: Two Side-By-Side (2:2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certificationsRow2.map((cert) => (
              <div key={cert.name} className="bg-maroon-dark border border-gold-antique/30 hover:border-gold-light/40 hover:shadow-2xl transition-all duration-500 p-8 md:p-10 text-center flex flex-col justify-between items-center relative overflow-hidden group rounded-sm hover:-translate-y-1.5">
                <div className={`absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r ${cert.color}`} />
                {/* Luxury Inner Frame */}
                <div className="absolute inset-2.5 border border-gold-antique/25 group-hover:inset-3 group-hover:border-gold-light/50 transition-all duration-500 pointer-events-none rounded-sm" />
                
                <div className="h-24 w-full max-w-[180px] bg-white/95 border border-gold-antique/30 rounded-sm flex items-center justify-center mb-6 relative z-10 px-4 py-2 shadow-md">
                  <img src={cert.logo} alt={cert.name} className="h-16 max-w-full object-contain group-hover:scale-103 transition-transform duration-300" />
                </div>
                <div className="space-y-4 relative z-10">
                  <h3 className="font-serif text-lg text-white font-semibold tracking-wide">
                    {cert.name}
                  </h3>
                  <div className="inline-block px-4 py-1.5 text-[10px] font-bold text-gold-light border border-gold-antique/30 bg-maroon-deep uppercase tracking-widest rounded-sm">
                    {cert.label}
                  </div>
                  <p className="font-sans text-xs text-white/80 leading-relaxed max-w-md mx-auto">
                    {cert.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Row 3: One Centered (1) */}
          <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-maroon-dark border border-gold-antique/30 hover:border-gold-light/40 hover:shadow-2xl transition-all duration-500 p-8 md:p-10 text-center flex flex-col justify-between items-center relative overflow-hidden group rounded-sm hover:-translate-y-1.5">
              <div className={`absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r ${certificationRow3.color}`} />
              {/* Luxury Inner Frame */}
              <div className="absolute inset-2.5 border border-gold-antique/25 group-hover:inset-3 group-hover:border-gold-light/50 transition-all duration-500 pointer-events-none rounded-sm" />
              
              <div className="h-24 w-full max-w-[180px] bg-white/95 border border-gold-antique/30 rounded-sm flex items-center justify-center mb-6 relative z-10 px-4 py-2 shadow-md">
                <img src={certificationRow3.logo} alt={certificationRow3.name} className="h-16 max-w-full object-contain group-hover:scale-103 transition-transform duration-300" />
              </div>
              <div className="space-y-4 relative z-10">
                <h3 className="font-serif text-lg text-white font-semibold tracking-wide">
                  {certificationRow3.name}
                </h3>
                <div className="inline-block px-4 py-1.5 text-[10px] font-bold text-gold-light border border-gold-antique/30 bg-maroon-deep uppercase tracking-widest rounded-sm">
                  {certificationRow3.label}
                </div>
                <p className="font-sans text-xs text-white/80 leading-relaxed max-w-md mx-auto">
                  {certificationRow3.description}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom trust statement */}
        <p className="text-center mt-16 font-serif text-[15px] text-gold-light italic text-glow-gold">
          &quot;Authenticity is not a label — it is our standard.&quot;
        </p>

      </div>
    </section>
  );
}
