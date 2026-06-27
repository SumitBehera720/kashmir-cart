"use client";

import Image from "next/image";
import { Quote } from "lucide-react";

const reviews = [
  {
    quote: "The aroma and quality is exceptional. Truly authentic Kashmiri saffron.",
    name: "Neha Sharma",
    location: "Delhi",
    avatar: "/assets/images/user_neha.png",
  },
  {
    quote: "Kahwa tea is so refreshing and pure. It feels like a sip of Kashmir.",
    name: "Arjun Mehta",
    location: "Bangalore",
    avatar: "/assets/images/user_arjun.png",
  },
  {
    quote: "The honey is natural and delicious. You can taste the purity.",
    name: "Priya Iyer",
    location: "Mumbai",
    avatar: "/assets/images/user_priya.png",
  },
  {
    quote: "Very premium packaging and fast delivery. Highly recommended.",
    name: "Rohit Verma",
    location: "Chandigarh",
    avatar: "/assets/images/user_arjun.png", // Reusing image as per original
  },
];

export default function Reviews() {
  return (
    <section className="py-24 bg-pattern-parchment border-y border-gold-antique/30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <h2 className="font-serif text-3xl md:text-4xl text-maroon-royal uppercase tracking-wider mb-4">
            Stories From Our Customers
          </h2>
          <div className="divider-ornate">
            <div className="divider-ornate-icon" />
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-text-white border-[1.5px] border-gold-antique p-6 flex flex-col relative group transition-all hover:shadow-lg hover:-translate-y-1">
              
              <div className="text-gold-antique mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                <Quote className="w-8 h-8" />
              </div>
              
              <p className="font-serif text-[15px] italic text-text-muted leading-relaxed mb-8 flex-grow">
                &quot;{review.quote}&quot;
              </p>
              
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gold-antique/50 p-0.5">
                  <Image
                    src={review.avatar}
                    alt={`${review.name} profile photo`}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <div className="font-sans text-[11px] font-bold uppercase tracking-widest text-maroon-royal">
                    {review.name}
                  </div>
                  <div className="font-sans text-[9px] uppercase tracking-wider text-text-muted mt-0.5">
                    {review.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
