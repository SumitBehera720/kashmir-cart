import { Product } from "@/types";

export const mockProducts: Product[] = [
  {
    id: "saffron-1",
    sku: "KSH-SAF-001",
    name: "Premium Kashmiri Saffron Grade A++ (1g)",
    slug: "premium-kashmiri-saffron",
    brand: "Kashmir Heritage",
    description: "The finest, GI-tagged Kashmiri Saffron directly from the fields of Pampore. Known for its extraordinary aroma, deep crimson color, and potent flavor, our Grade A++ saffron is hand-harvested using generations-old traditional methods.",
    category: "Saffron",
    images: ["/assets/images/product_saffron_jar.png", "/assets/images/product_saffron.png"],
    price: 2999,
    currency: "INR",
    availability: "in_stock",
    benefits: ["Rich in antioxidants", "Improves mood and treats depressive symptoms", "May reduce PMS symptoms", "Acts as an aphrodisiac"],
    ingredients: ["100% Pure Kashmiri Saffron (Crocus Sativus)"],
    origin: "Pampore, Kashmir, India",
    usage: "Steep 3-4 strands in warm water or milk for 15-20 minutes before adding to your recipe or drinking.",
    shippingInformation: "Ships within 24 hours. Free delivery across India.",
    seo: {
      title: "Buy Premium Kashmiri Saffron Grade A++ | Kashmir Heritage",
      description: "Authentic GI-tagged Kashmiri Saffron. Order our 1g Premium Saffron jar online. 100% pure, natural, and lab-tested.",
      keywords: ["Kashmiri Saffron", "Pure Saffron", "Buy Saffron Online", "Original Kesar"]
    }
  },
  {
    id: "shilajit-1",
    sku: "KSH-SHI-001",
    name: "Pure Himalayan Shilajit Resin (20g)",
    slug: "pure-himalayan-shilajit-resin",
    brand: "Kashmir Heritage",
    description: "Authentic, purified high-altitude Himalayan Shilajit resin. Rich in fulvic acid and trace minerals for natural energy and strength.",
    category: "Shilajit",
    images: ["/assets/images/category_shilajit.png"],
    price: 1499,
    currency: "INR",
    availability: "in_stock",
    benefits: ["Boosts energy and stamina", "Rich in fulvic acid and 80+ minerals", "Supports cognitive function and anti-aging"],
    ingredients: ["100% Purified Shilajit Resin"],
    origin: "Himalayas, Kashmir, India",
    usage: "Dissolve a pea-sized portion in warm water, milk, or green tea and consume in the morning.",
    shippingInformation: "Ships within 24 hours. Free delivery.",
    seo: {
      title: "Buy Pure Himalayan Shilajit Resin | Kashmir Heritage",
      description: "Get 100% pure lab-tested Himalayan Shilajit resin. Rich in fulvic acid. Direct from source.",
      keywords: ["Himalayan Shilajit", "Shilajit Resin", "Pure Shilajit"]
    }
  },
  {
    id: "kahwa-1",
    sku: "KSH-KAH-001",
    name: "Kashmiri Kahwa Tea (100g)",
    slug: "kashmiri-kahwa-tea",
    brand: "Kashmir Heritage",
    description: "An authentic Kashmiri wellness tea inspired by royal traditions. Our Kahwa is a fragrant blend of green tea leaves, saffron, whole spices, and almonds, designed to warm the soul and boost immunity.",
    category: "Kahwa",
    images: ["/assets/images/product_kahwa_tin.png", "/assets/images/product_kahwa.png"],
    price: 499,
    currency: "INR",
    availability: "in_stock",
    benefits: ["Boosts immunity", "Aids in digestion", "Relieves stress and improves focus", "Promotes glowing skin"],
    ingredients: ["Green Tea", "Kashmiri Saffron", "Cardamom", "Cinnamon", "Cloves", "Rose Petals"],
    origin: "Srinagar, Kashmir, India",
    usage: "Boil 1 tsp of Kahwa in 1 cup of water for 3-4 minutes. Strain and serve hot with honey and crushed almonds.",
    shippingInformation: "Ships within 24 hours. Free delivery across India.",
    seo: {
      title: "Authentic Kashmiri Kahwa Tea | Premium Blend | Kashmir Heritage",
      description: "Experience the royal taste of authentic Kashmiri Kahwa tea. A fragrant blend of saffron, spices, and green tea.",
      keywords: ["Kashmiri Kahwa", "Kahwa Tea", "Green Tea with Saffron", "Wellness Tea"]
    }
  },
  {
    id: "honey-1",
    sku: "KSH-HON-001",
    name: "Wild Kashmir Honey (500g)",
    slug: "wild-kashmir-honey",
    brand: "Kashmir Heritage",
    description: "Pure, unprocessed Himalayan honey collected from the deep valleys of Kashmir. Our wild honey retains all its natural pollen, enzymes, and nutritional value, offering a rich, floral taste.",
    category: "Honey",
    images: ["/assets/images/product_honey_jar.png", "/assets/images/product_honey.png"],
    price: 749,
    currency: "INR",
    availability: "in_stock",
    benefits: ["Natural energy booster", "Soothes sore throats", "Rich in antioxidants and minerals", "Antibacterial and antifungal properties"],
    ingredients: ["100% Raw Wild Honey"],
    origin: "Pahalgam, Kashmir, India",
    usage: "Take one spoonful daily, add to your Kahwa, or spread on warm toast. Do not mix in boiling water.",
    shippingInformation: "Ships within 24 hours. Delivered in secure glass packaging.",
    seo: {
      title: "Pure Wild Kashmir Honey | Raw & Organic | Kashmir Heritage",
      description: "Buy 100% pure, raw Himalayan honey from Kashmir. Unprocessed, organic, and naturally sweet.",
      keywords: ["Kashmiri Honey", "Raw Honey", "Wild Honey", "Organic Honey"]
    }
  },
  {
    id: "walnuts-1",
    sku: "KSH-WAL-001",
    name: "Kashmiri Walnut Kernels (250g)",
    slug: "kashmiri-walnut-kernels",
    brand: "Kashmir Heritage",
    description: "Premium quality, snow-white walnut kernels handpicked from the valleys of Kashmir. Known for their high oil content and crunchy texture.",
    category: "Dry Fruits",
    images: ["/assets/images/product_walnuts.png"],
    price: 599,
    currency: "INR",
    availability: "in_stock",
    benefits: ["Rich in Omega-3 fatty acids", "Supports brain health", "Reduces inflammation", "Promotes a healthy gut"],
    ingredients: ["100% Natural Walnut Kernels"],
    origin: "Kupwara, Kashmir, India",
    usage: "Eat raw as a snack, soak overnight for better digestion, or add to your favorite baked goods.",
    shippingInformation: "Vacuum sealed for freshness. Ships within 24 hours.",
    seo: {
      title: "Premium Kashmiri Walnut Kernels | Kashmir Heritage",
      description: "Buy crunchy, oil-rich Kashmiri walnut kernels. 100% natural, snow-white halves direct from Kashmir.",
      keywords: ["Kashmiri Walnuts", "Walnut Kernels", "Akhrot", "Dry Fruits"]
    }
  },
  {
    id: "almonds-1",
    sku: "KSH-ALM-001",
    name: "Kashmiri Mamra Almonds (250g)",
    slug: "kashmiri-mamra-almonds",
    brand: "Kashmir Heritage",
    description: "The most premium variety of almonds, Kashmiri Mamra almonds are prized for their unique concave shape, high oil yield, and superior nutritional profile.",
    category: "Dry Fruits",
    images: ["/assets/images/product_almonds.png"],
    price: 999,
    currency: "INR",
    availability: "in_stock",
    benefits: ["Exceptional source of Vitamin E", "Lowers cholesterol", "Regulates blood sugar", "Good for memory and brain health"],
    ingredients: ["100% Natural Mamra Almonds"],
    origin: "Pulwama, Kashmir, India",
    usage: "Soak 5-6 almonds overnight, peel in the morning and consume for maximum benefits.",
    shippingInformation: "Vacuum sealed for freshness. Ships within 24 hours.",
    seo: {
      title: "Kashmiri Mamra Almonds | Premium Dry Fruits | Kashmir Heritage",
      description: "Order authentic Kashmiri Mamra Badam online. High oil content, naturally sweet, and rich in nutrients.",
      keywords: ["Mamra Almonds", "Kashmiri Badam", "Premium Almonds", "Dry Fruits"]
    }
  },
  {
    id: "pashmina-1",
    sku: "KSH-PSH-001",
    name: "Kashmir Pashmina Shawl (1 piece)",
    slug: "kashmir-pashmina-shawl",
    brand: "Kashmir Heritage",
    description: "Luxurious hand‑woven Pashmina shawl made from the fine cashmere wool of Himalayan goats. Soft, lightweight, and warm, showcasing traditional Kashmiri patterns.",
    category: "Textiles",
    images: ["/assets/images/product_pashmina.png"],
    price: 3499,
    currency: "INR",
    availability: "in_stock",
    benefits: ["Exceptional warmth", "Elegant drape", "Handcrafted heritage"],
    ingredients: [],
    origin: "Kashmir, India",
    usage: "Wear as a shawl or wrap. Dry clean only.",
    shippingInformation: "Ships within 3-5 business days. Hand‑crafted, packaged securely.",
    seo: {
      title: "Authentic Kashmiri Pashmina Shawl | Luxury Textile",
      description: "Premium hand‑woven Pashmina shawl from Kashmir. Soft, warm, and timeless.",
      keywords: ["Pashmina", "Kashmir Shawl", "Luxury Textile"]
    }
  },
  {
    id: "carpet-1",
    sku: "KSH-CRP-001",
    name: "Kashmir Hand‑crafted Carpet (2x3 ft)",
    slug: "kashmir-handcrafted-carpet",
    brand: "Kashmir Heritage",
    description: "Traditional Kashmiri woven carpet featuring intricate floral motifs. Made from natural wool for durability and comfort.",
    category: "Home Decor",
    images: ["/assets/images/product_carpet.png"],
    price: 6999,
    currency: "INR",
    availability: "in_stock",
    benefits: ["Adds cultural elegance", "Durable and soft"],
    ingredients: [],
    origin: "Kashmir, India",
    usage: "Place in living room or bedroom. Spot clean as needed.",
    shippingInformation: "Ships within 5-7 business days. Carefully packaged.",
    seo: {
      title: "Hand‑crafted Kashmiri Carpet | Home Decor",
      description: "Elegant wool carpet with traditional Kashmiri designs. Perfect for adding a touch of heritage.",
      keywords: ["Kashmir Carpet", "Woven Rug", "Home Decor"]
    }
  }
];
