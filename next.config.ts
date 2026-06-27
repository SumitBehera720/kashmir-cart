import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Ensure Vercel treats this as a server‑rendered Next app
  output: 'standalone',
  // Uncomment and set if you need absolute URLs for OG/Twitter images
  // metadataBase: new URL('https://kashmir-cart.vercel.app'),
};

export default nextConfig;
