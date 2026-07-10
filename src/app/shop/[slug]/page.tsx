import { notFound } from "next/navigation";
import { fetchProduct, fetchProducts } from "@/data/api";
import { mockProducts } from "@/data/mockProducts";
import ProductDetailClient from "@/components/ProductDetailClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  if (!product) return {};
  
  return {
    title: product.seo?.title || product.name,
    description: product.seo?.description || product.description,
    keywords: product.seo?.keywords || [],
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  const allProducts = await fetchProducts().catch(() => []) || [];

  if (!product) {
    notFound();
  }

  // Combine fetched and mock products for related items fallback
  const combinedProducts = allProducts.length > 0 ? allProducts : mockProducts;

  return (
    <ProductDetailClient 
      product={product} 
      allProducts={combinedProducts} 
    />
  );
}

export async function generateStaticParams() {
  return mockProducts.map((p) => ({
    slug: p.slug,
  }));
}
