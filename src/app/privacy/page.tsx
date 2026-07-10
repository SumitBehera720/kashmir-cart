export const metadata = {
  title: "Privacy Policy | Kashmir Heritage",
  description: "Understand how we protect and process customer personal information, payment records, and cookies.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-24 bg-parchment-base min-h-screen">
      <div className="max-w-4xl mx-auto px-6 font-sans">
        <h1 className="font-serif text-3xl md:text-4xl text-maroon-royal mb-6 pb-2 border-b border-gold-antique/30">
          Privacy Policy
        </h1>
        <div className="prose text-text-muted text-sm space-y-6 leading-relaxed">
          <p>
            Your trust is our highest priority. This Privacy Policy details how we handle, process, and protect client registration details and transactional histories.
          </p>
          <h2 className="font-serif text-xl text-maroon-royal font-semibold mt-8">Data Collection</h2>
          <p>
            We collect personal identity details (names, email addresses, phone contacts, shipping locations) solely to validate and fulfill e-commerce order submissions.
          </p>
          <h2 className="font-serif text-xl text-maroon-royal font-semibold mt-8">Payment Safety</h2>
          <p>
            We do not log or store credit card numbers or financial passwords. All payments are encrypted and routed safely through certified gateways like Visa, Mastercard, and Razorpay.
          </p>
        </div>
      </div>
    </div>
  );
}
