import HeroBanner from "@/components/HeroBanner";
import HeritageStory from "@/components/HeritageStory";
import CategoryShowcase from "@/components/CategoryShowcase";
import ProductGrid from "@/components/ProductGrid";
import TrustSection from "@/components/TrustSection";
import WhySaffronIsSpecial from "@/components/WhySaffronIsSpecial";
import RayaAyurveda from "@/components/RayaAyurveda";
import AllProductsGrid from "@/components/AllProductsGrid";
import CertificationBadges from "@/components/CertificationBadges";
import Reviews from "@/components/Reviews";
import BlogSection from "@/components/BlogSection";
import Newsletter from "@/components/Newsletter";
import { fetchProducts, fetchCategories } from "@/data/api";

export default async function Home() {
  const [products, categories] = await Promise.all([
    fetchProducts().catch(() => []),
    fetchCategories().catch(() => [])
  ]);

  return (
    <>
      <HeroBanner />
      <HeritageStory />
      <CategoryShowcase categories={categories} />
      <ProductGrid products={products} />
      <TrustSection />
      <WhySaffronIsSpecial />
      <RayaAyurveda />
      <AllProductsGrid products={products} />
      <CertificationBadges />
      <Reviews />
      <BlogSection />
      <Newsletter />
    </>
  );
}
