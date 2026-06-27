export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  brand: string;
  description: string;
  category: string;
  images: string[];
  price: number;
  currency: string;
  availability: 'in_stock' | 'out_of_stock' | 'preorder';
  benefits: string[];
  ingredients: string[];
  origin: string;
  usage: string;
  shippingInformation: string;
  seo: SEOData;
}
