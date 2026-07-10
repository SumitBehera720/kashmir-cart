export const metadata = {
  title: "Terms & Conditions | Kashmir Heritage",
  description: "Review legal terms, customer responsibilities, and boutique code of conduct.",
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-24 bg-parchment-base min-h-screen">
      <div className="max-w-4xl mx-auto px-6 font-sans">
        <h1 className="font-serif text-3xl md:text-4xl text-maroon-royal mb-6 pb-2 border-b border-gold-antique/30">
          Terms & Conditions
        </h1>
        <div className="prose text-text-muted text-sm space-y-6 leading-relaxed">
          <p>
            Welcome to Kashmir Heritage. By accessing or shopping on our website, you agree to comply with and be bound by the following terms of service.
          </p>
          <h2 className="font-serif text-xl text-maroon-royal font-semibold mt-8">Acceptance of Terms</h2>
          <p>
            All products, certifications, prices, and catalogs displayed are subject to changes without prior warnings. Product descriptions are kept as accurate as possible, but differences in display settings may cause minor color shifts in packaging previews.
          </p>
          <h2 className="font-serif text-xl text-maroon-royal font-semibold mt-8">Copyright & Trademark</h2>
          <p>
            All original photography, website styling, custom packaging illustrations, logos, and written blogs belong to Kashmir Heritage and may not be reproduced without explicit written consent.
          </p>
        </div>
      </div>
    </div>
  );
}
