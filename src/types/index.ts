export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
}

export interface Product {
  id: string | number;
  sku: string;
  name: string;
  slug: string;
  brand: string;
  description: string;
  category: string | { id: number; name: string; slug: string };
  images: string[];
  price: number;
  sale_price?: number | null;
  currency: string;
  stock?: number;
  availability: 'in_stock' | 'out_of_stock' | 'preorder';
  benefits: string[];
  ingredients: string[];
  origin: string;
  usage: string;
  shippingInformation?: string;
  seo?: SEOData;
}
