export const metadata = {
  title: "Returns & Refund Policy | Kashmir Heritage",
  description: "Read details of our 30-day money-back guarantee, return shipping procedures, and refund processing timelines.",
};

export default function ReturnsPage() {
  return (
    <div className="pt-28 pb-24 bg-parchment-base min-h-screen">
      <div className="max-w-4xl mx-auto px-6 font-sans">
        <h1 className="font-serif text-3xl md:text-4xl text-maroon-royal mb-6 pb-2 border-b border-gold-antique/30">
          Returns & Refund Policy
        </h1>
        <div className="prose text-text-muted text-sm space-y-6 leading-relaxed">
          <p>
            We take pride in the authenticity and unmatched purity of our products. If you are not fully satisfied with your purchase, we are here to assist.
          </p>
          <h2 className="font-serif text-xl text-maroon-royal font-semibold mt-8">30-Day Guarantee</h2>
          <p>
            You can return any unopened product in its original, sealed condition within 30 days of receipt for a full refund or exchange. Due to the food-grade and organic nature of saffron, tea, and honey, we cannot accept returns for opened jars.
          </p>
          <h2 className="font-serif text-xl text-maroon-royal font-semibold mt-8">Process for Claims</h2>
          <p>
            To initiate a return or exchange claim, please email our support desk at `contact@kashmirheritage.com` mentioning your order ID and the batch certificate number printed on the package seal.
          </p>
        </div>
      </div>
    </div>
  );
}
