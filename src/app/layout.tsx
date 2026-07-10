import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import FloatingSaffronPetals from "@/components/FloatingSaffronPetals";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kashmir Heritage | Palace Boutique",
  description: "Redesigned premium Kashmiri heritage luxury ecommerce store. Discover GI-tagged Saffron, traditional Kahwa, organic forest Honey, and Mamra Almonds.",
  keywords: "Kashmiri Saffron, Shahi Kahwa, Sidr Honey, Dry Fruits, Kashmir Heritage E-Commerce",
  openGraph: {
    title: "Kashmir Heritage | Palace Boutique",
    description: "Authentic luxury e-commerce boutique offering direct-from-source Kashmiri Saffron, Kahwa, organic Honey, and Mamra Almonds.",
    images: [{ url: "/assets/images/kashmir-theme.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-parchment-base text-maroon-dark">
        <SmoothScrollProvider>
          <Header />
          <main className="flex-1 relative">
            <FloatingSaffronPetals />
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
