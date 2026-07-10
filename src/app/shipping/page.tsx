export const metadata = {
  title: "Shipping Policy | Kashmir Heritage",
  description: "View our delivery timelines, courier partners, and domestic or international shipping rates.",
};

export default function ShippingPage() {
  return (
    <div className="pt-28 pb-24 bg-parchment-base min-h-screen">
      <div className="max-w-4xl mx-auto px-6 font-sans">
        <h1 className="font-serif text-3xl md:text-4xl text-maroon-royal mb-6 pb-2 border-b border-gold-antique/30">
          Shipping Policy
        </h1>
        <div className="prose text-text-muted text-sm space-y-6 leading-relaxed">
          <p>
            At Kashmir Heritage, we strive to deliver your authentic products in the safest, most efficient manner. Every shipment is carefully packaged in sealed tin, glass, or protected organic containers to safeguard the aroma and freshness of the valleys.
          </p>
          <h2 className="font-serif text-xl text-maroon-royal font-semibold mt-8">Domestic Deliveries (India)</h2>
          <p>
            We partner with premier courier networks (BlueDart, DHL, India Post Speed Post) to guarantee express transit. Shipping is free across India for all retail items. Deliveries usually take 3 to 5 business days from dispatch.
          </p>
          <h2 className="font-serif text-xl text-maroon-royal font-semibold mt-8">International Deliveries</h2>
          <p>
            International delivery charges are calculated at checkout based on weight and country destination. Customs duties, local taxes, or clearance charges, if applicable, are to be borne by the recipient. Expect 7 to 14 business days.
          </p>
        </div>
      </div>
    </div>
  );
}
