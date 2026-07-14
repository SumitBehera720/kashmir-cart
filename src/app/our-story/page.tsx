import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Story | Kashmir Heritage",
  description: "Learn about the heritage of Kashmir and our commitment to bringing you authentic, pure products directly from the valley.",
};

export default function OurStoryPage() {
  return (
    <div className="pt-28 pb-24 bg-parchment-base min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark mb-4 block">
            The Soul Of Kashmir
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-maroon-royal leading-tight mb-8">
            Born In The Valley Of Kashmir
          </h1>
          <div className="flex items-center justify-center">
            <div className="h-[1px] w-16 bg-gold-antique"></div>
            <div className="w-3 h-3 rotate-45 border border-gold-antique mx-2"></div>
            <div className="h-[1px] w-16 bg-gold-antique"></div>
          </div>
        </div>

        <div className="relative aspect-[16/9] w-full mb-16 bg-parchment-light border-[1.5px] border-gold-antique p-2">
          <div className="relative w-full h-full border border-gold-antique/30">
            <Image
              src="/assets/images/story_picking.png"
              alt="Harvesting saffron flowers in Pampore, Kashmir"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="prose prose-lg prose-p:font-sans prose-p:text-text-muted prose-headings:font-serif prose-headings:text-maroon-royal max-w-none">
          <p className="font-serif text-2xl text-maroon-royal italic mb-8 text-center">
            Where centuries-old traditions meet natural purity.
          </p>

          <h2 className="text-2xl mt-12 mb-6 border-b border-gold-antique/30 pb-2">Our Origins</h2>
          <p>
            Nestled in the lap of the Himalayas, Kashmir has always been synonymous with unparalleled beauty and exquisite craftsmanship. For generations, the people of the valley have cultivated the finest saffron, harvested pure mountain honey, and hand-blended spices to create the royal Kahwa tea.
          </p>
          <p>
            Kashmir Heritage was born from a deep-rooted desire to preserve these ancient traditions and share the pristine treasures of the valley with the world. We noticed that the market was flooded with synthetic imitations—adulterated saffron, flavored sugar syrups sold as honey, and generic green teas marketed as Kahwa. We decided to bridge the gap between the authentic artisans of Kashmir and those who appreciate true luxury.
          </p>

          <h2 className="text-2xl mt-12 mb-6 border-b border-gold-antique/30 pb-2">Our Promise of Purity</h2>
          <p>
            Every product in our collection is a testament to the purity of nature and the skill of our farmers. We do not mass-produce. Our saffron is sourced exclusively from the GI-tagged fields of Pampore, hand-harvested before sunrise to retain its delicate aroma. Our honey is gathered from the wild forests of Pahalgam, completely unpasteurized and raw.
          </p>

          <div className="relative aspect-[16/9] w-full my-8 bg-parchment-light border-[1.5px] border-gold-antique p-2">
            <div className="relative w-full h-full border border-gold-antique/30">
              <Image
                src="/assets/images/story_sorting.png"
                alt="Sorting and quality selection of Saffron stigmata"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <h2 className="text-2xl mt-12 mb-6 border-b border-gold-antique/30 pb-2">Sustainable & Ethical</h2>
          <p>
            We believe in fair trade and empowering the local community. By cutting out middlemen, we ensure that the farmers and artisans who pour their heart into these products receive their rightful share. Our packaging reflects our commitment to sustainability—using glass, tin, and biodegradable materials wherever possible, designed with a nod to the vintage aesthetics of royal Kashmiri courts.
          </p>

          <p className="mt-12 text-center font-serif text-xl text-gold-dark italic">
            &quot;Experience the essence of Kashmir, untouched and uncompromised.&quot;
          </p>
        </div>

      </div>
    </div>
  );
}
