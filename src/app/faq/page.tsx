"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Is your Saffron genuinely GI-tagged Kashmiri Saffron?",
    answer: "Yes. Every single gram of saffron we sell is sourced from registered farms in Pampore, Kashmir. Each batch undergoes rigorous testing, and the lab certificates and batch numbers are printed directly on the packaging, which can be verified on our website."
  },
  {
    question: "How long does shipping take within India and Internationally?",
    answer: "Shipping within India typically takes 3-5 business days. International deliveries range between 7-14 business days depending on destination customs clearance processes. All orders are shipped via insured premium carriers with complete tracking details."
  },
  {
    question: "What is your refund policy?",
    answer: "We offer a 30-day, no-questions-asked refund policy for unopened items in their original packaging. If you suspect an issue with product quality or authenticity, please contact us with your batch number for an immediate replacement or full reimbursement."
  },
  {
    question: "Is the honey wild and unpasteurized?",
    answer: "Yes. Our honey is gathered from natural wild beehives in alpine forests. We do not heat, micro-filter, or pasteurize the honey, ensuring all natural pollen particles, active enzymes, and raw nutritional qualities remain fully intact."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-28 pb-24 bg-parchment-base min-h-screen">
      <div className="max-w-4xl mx-auto px-6 font-sans">
        
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark mb-3 block">
            Questions & Answers
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-maroon-royal leading-tight mb-6">
            Frequently Asked Questions
          </h1>
          <div className="flex items-center justify-center">
            <div className="h-[1px] w-16 bg-gold-antique"></div>
            <div className="w-3 h-3 rotate-45 border border-gold-antique mx-2"></div>
            <div className="h-[1px] w-16 bg-gold-antique"></div>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-parchment-light border border-gold-antique/50 p-4 transition-all duration-300">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left font-serif text-lg text-maroon-royal font-semibold"
              >
                <span>{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-4 h-4 text-gold-dark shrink-0" />
                ) : (
                  <Plus className="w-4 h-4 text-gold-dark shrink-0" />
                )}
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === index ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-xs text-text-muted leading-relaxed font-sans border-t border-gold-antique/20 pt-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
