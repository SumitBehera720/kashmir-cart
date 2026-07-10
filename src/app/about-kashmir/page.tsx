import Image from "next/image";

export const metadata = {
  title: "About Kashmir | Kashmir Heritage",
  description: "Explore the geographic marvels and centuries-old cultural history of the Kashmir Valley, the source of our premium organic products.",
};

export default function AboutKashmirPage() {
  return (
    <div className="pt-28 pb-24 bg-parchment-base min-h-screen">
      <div className="max-w-4xl mx-auto px-6 font-sans">
        
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark mb-3 block">
            The Land of Himalayas
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-maroon-royal leading-tight mb-6">
            Heaven On Earth
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
              src="/assets/images/hero_dal_lake.png"
              alt="Beautiful Dal Lake in Srinagar"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="prose prose-lg max-w-none text-text-muted leading-relaxed space-y-8">
          <p className="font-serif text-2xl text-maroon-royal italic text-center mb-12">
            &quot;Gar firdaus bar-ruy-e-zamin ast, hamin ast o hamin ast o hamin ast.&quot; <br />
            <span className="text-sm font-sans uppercase tracking-widest text-gold-dark not-italic font-bold block mt-2">
              - If there is heaven on earth, it is this, it is this, it is this.
            </span>
          </p>

          <h2 className="font-serif text-2xl text-maroon-royal border-b border-gold-antique/30 pb-2">The Golden Valley</h2>
          <p>
            Kashmir, cradled between the snow-clad peaks of the Great Himalayas and the Pir Panjal range, is a land of unique microclimates. The high altitude (averaging 5,000+ feet above sea level), mineral-rich glacial waters, and distinct seasonal variations combine to create the ideal cultivation conditions for some of the world's most valued crops.
          </p>

          <h2 className="font-serif text-2xl text-maroon-royal border-b border-gold-antique/30 pb-2">Pampore & The Legend of Saffron</h2>
          <p>
            Just outside Srinagar lies Pampore, known globally as the &quot;Saffron Town.&quot; The plateau lands here feature lacustrine deposits known as *Karewas*—composed of clay, sand, and silt. This specific soil holds moisture perfectly during dry autumn months, allowing the Saffron crocus (*Crocus sativus*) to produce stigmata with exceptionally high concentrations of crocin (responsible for color), picrocrocin (flavor), and safranal (aroma) that outclass Iranian and Spanish saffron in laboratory evaluations.
          </p>

          <h2 className="font-serif text-2xl text-maroon-royal border-b border-gold-antique/30 pb-2">Alpine Wildflower Honey</h2>
          <p>
            High in the coniferous forests of Pahalgam and Gulmarg, wild honeybees feed on alpine wildflowers, acacia blossoms, and wild saffron flowers. The honey harvested by traditional keepers remains completely raw, unheated, and unfiltered, preserving active enzymes, pollen grains, and medicinal benefits that have been part of traditional Ayurvedic and Unani wellness rituals for millennia.
          </p>
        </div>

      </div>
    </div>
  );
}
