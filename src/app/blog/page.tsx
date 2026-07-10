import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Heritage Blog | Kashmir Heritage",
  description: "Read educational articles detailing the traditional harvesting methods, history, and scientific analysis of authentic Kashmiri crops.",
};

const posts = [
  {
    id: 1,
    title: "The Art of Hand-Harvesting Saffron in Pampore",
    excerpt: "Saffron harvesting is a race against time and the elements. Learn how farmers hand-pluck crocus flowers before sunrise to protect the precious red stigmata.",
    date: "October 24, 2025",
    image: "/assets/images/product_saffron.png",
    category: "Saffron",
  },
  {
    id: 2,
    title: "Understanding Kashmiri Kahwa: The Traditional Spiced Green Tea",
    excerpt: "More than a beverage, Kahwa is a warm embrace of saffron, cardamom, cinnamon, and crushed almonds. Discover the centuries-old recipes of Kashmiri royal courts.",
    date: "November 12, 2025",
    image: "/assets/images/product_kahwa.png",
    category: "Kahwa Tea",
  },
  {
    id: 3,
    title: "Wild Saffron Honey: The Medicinal Liquid Gold",
    excerpt: "Harvested directly from alpine beehives near Pampore, our raw wildflower honey contains trace elements of crocus pollen. Explore its therapeutic applications.",
    date: "December 05, 2025",
    image: "/assets/images/product_honey_jar.png",
    category: "Organic Honey",
  }
];

export default function BlogPage() {
  return (
    <div className="pt-28 pb-24 bg-parchment-base min-h-screen">
      <div className="max-w-6xl mx-auto px-6 font-sans">
        
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark mb-3 block">
            Kashmir Chronicles
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-maroon-royal leading-tight mb-6">
            Heritage Journal
          </h1>
          <div className="flex items-center justify-center">
            <div className="h-[1px] w-16 bg-gold-antique"></div>
            <div className="w-3 h-3 rotate-45 border border-gold-antique mx-2"></div>
            <div className="h-[1px] w-16 bg-gold-antique"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-parchment-light border border-gold-antique p-4 flex flex-col justify-between group hover:shadow-2xl transition-all duration-300">
              <div>
                <div className="relative aspect-[4/3] w-full mb-6 bg-white border border-gold-antique/20 flex items-center justify-center p-4">
                  <div className="relative w-full h-full">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-contain p-2 transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
                
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark bg-gold-antique/10 border border-gold-antique/20 px-2 py-0.5 mb-3 inline-block">
                  {post.category}
                </span>
                
                <h2 className="font-serif text-xl text-maroon-royal font-semibold mb-3 hover:text-gold-dark transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-xs text-text-muted leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="border-t border-gold-antique/20 pt-4 flex justify-between items-center text-xs">
                <span className="text-text-muted">{post.date}</span>
                <span className="font-bold text-maroon-royal uppercase tracking-wider cursor-pointer group-hover:text-gold-dark transition-colors">
                  Read Article &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
