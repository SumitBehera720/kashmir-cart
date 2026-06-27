import HeroBanner from "@/components/HeroBanner";
import HeritageStory from "@/components/HeritageStory";
import CategoryShowcase from "@/components/CategoryShowcase";
import ProductGrid from "@/components/ProductGrid";
import TrustSection from "@/components/TrustSection";
import WhySaffronIsSpecial from "@/components/WhySaffronIsSpecial";
import Reviews from "@/components/Reviews";
import BlogSection from "@/components/BlogSection";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <HeritageStory />
      <CategoryShowcase />
      <ProductGrid />
      <TrustSection />
      <WhySaffronIsSpecial />
      <Reviews />
      <BlogSection />
      <Newsletter />
    </>
  );
}
