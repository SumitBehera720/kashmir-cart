<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Batch;
use App\Models\FooterDetail;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Super Admin and default Customer
        User::create([
            'name' => 'Kashmir Admin',
            'email' => 'admin@kashmirheritage.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Demo Customer',
            'email' => 'customer@kashmirheritage.com',
            'password' => Hash::make('customer123'),
            'role' => 'customer',
        ]);

        // 2. Seed Categories
        $categoriesData = [
            ['name' => 'Saffron', 'slug' => 'saffron'],
            ['name' => 'Kahwa', 'slug' => 'kahwa'],
            ['name' => 'Honey', 'slug' => 'honey'],
            ['name' => 'Dry Fruits', 'slug' => 'dry-fruits'],
            ['name' => 'Textiles', 'slug' => 'textiles'],
            ['name' => 'Home Decor', 'slug' => 'home-decor'],
        ];

        $categories = [];
        foreach ($categoriesData as $cat) {
            $categories[$cat['name']] = Category::create($cat);
        }

        // 3. Seed Products
        $productsData = [
            [
                'sku' => 'KSH-SAF-001',
                'name' => 'Premium Kashmiri Saffron Grade A++ (1g)',
                'slug' => 'premium-kashmiri-saffron',
                'description' => 'The finest, GI-tagged Kashmiri Saffron directly from the fields of Pampore. Known for its extraordinary aroma, deep crimson color, and potent flavor, our Grade A++ saffron is hand-harvested using generations-old traditional methods.',
                'price' => 2999.00,
                'category_name' => 'Saffron',
                'stock' => 50,
                'benefits' => ['Rich in antioxidants', 'Improves mood and treats depressive symptoms', 'May reduce PMS symptoms', 'Acts as an aphrodisiac'],
                'ingredients' => ['100% Pure Kashmiri Saffron (Crocus Sativus)'],
                'origin' => 'Pampore, Kashmir, India',
                'usage' => 'Steep 3-4 strands in warm water or milk for 15-20 minutes before adding to your recipe or drinking.',
                'images' => ['/assets/images/product_saffron_jar.png', '/assets/images/product_saffron.png'],
                'batch' => [
                    'batch_number' => 'SAF-2026-X11',
                    'crocin_level' => 'Purity index: 248.5 (Grade I)',
                    'safranal_level' => 'Aroma index: 89.2 (Premium)',
                    'harvest_date' => '2026-11-10',
                    'artisan_story' => 'Hand-harvested at dawn in the saffron fields of Pampore by Ghulam Qadir’s family, who have cultivated saffron for four generations.',
                ]
            ],
            [
                'sku' => 'KSH-KAH-001',
                'name' => 'Kashmiri Kahwa Tea (100g)',
                'slug' => 'kashmiri-kahwa-tea',
                'description' => 'An authentic Kashmiri wellness tea inspired by royal traditions. Our Kahwa is a fragrant blend of green tea leaves, saffron, whole spices, and almonds, designed to warm the soul and boost immunity.',
                'price' => 499.00,
                'category_name' => 'Kahwa',
                'stock' => 150,
                'benefits' => ['Boosts immunity', 'Aids in digestion', 'Relieves stress and improves focus', 'Promotes glowing skin'],
                'ingredients' => ['Green Tea', 'Kashmiri Saffron', 'Cardamom', 'Cinnamon', 'Cloves', 'Rose Petals'],
                'origin' => 'Srinagar, Kashmir, India',
                'usage' => 'Boil 1 tsp of Kahwa in 1 cup of water for 3-4 minutes. Strain and serve hot with honey and crushed almonds.',
                'images' => ['/assets/images/product_kahwa_tin.png', '/assets/images/product_kahwa.png'],
                'batch' => null
            ],
            [
                'sku' => 'KSH-HON-001',
                'name' => 'Wild Kashmir Honey (500g)',
                'slug' => 'wild-kashmir-honey',
                'description' => 'Pure, unprocessed Himalayan honey collected from the deep valleys of Kashmir. Our wild honey retains all its natural pollen, enzymes, and nutritional value, offering a rich, floral taste.',
                'price' => 749.00,
                'category_name' => 'Honey',
                'stock' => 80,
                'benefits' => ['Natural energy booster', 'Soothes sore throats', 'Rich in antioxidants and minerals', 'Antibacterial and antifungal properties'],
                'ingredients' => ['100% Raw Wild Honey'],
                'origin' => 'Pahalgam, Kashmir, India',
                'usage' => 'Take one spoonful daily, add to your Kahwa, or spread on warm toast. Do not mix in boiling water.',
                'images' => ['/assets/images/product_honey_jar.png', '/assets/images/product_honey.png'],
                'batch' => [
                    'batch_number' => 'HON-2026-H04',
                    'crocin_level' => 'N/A',
                    'safranal_level' => 'N/A',
                    'harvest_date' => '2026-05-15',
                    'artisan_story' => 'Ethically gathered from wild acacia beehives in the forests surrounding Pahalgam by local tribal honey hunters.',
                ]
            ],
            [
                'sku' => 'KSH-WAL-001',
                'name' => 'Kashmiri Walnut Kernels (250g)',
                'slug' => 'kashmiri-walnut-kernels',
                'description' => 'Premium quality, snow-white walnut kernels handpicked from the valleys of Kashmir. Known for their high oil content and crunchy texture.',
                'price' => 599.00,
                'category_name' => 'Dry Fruits',
                'stock' => 100,
                'benefits' => ['Rich in Omega-3 fatty acids', 'Supports brain health', 'Reduces inflammation', 'Promotes a healthy gut'],
                'ingredients' => ['100% Natural Walnut Kernels'],
                'origin' => 'Kupwara, Kashmir, India',
                'usage' => 'Eat raw as a snack, soak overnight for better digestion, or add to your favorite baked goods.',
                'images' => ['/assets/images/product_walnuts.png'],
                'batch' => null
            ],
            [
                'sku' => 'KSH-ALM-001',
                'name' => 'Kashmiri Mamra Almonds (250g)',
                'slug' => 'kashmiri-mamra-almonds',
                'description' => 'The most premium variety of almonds, Kashmiri Mamra almonds are prized for their unique concave shape, high oil yield, and superior nutritional profile.',
                'price' => 999.00,
                'category_name' => 'Dry Fruits',
                'stock' => 90,
                'benefits' => ['Exceptional source of Vitamin E', 'Lowers cholesterol', 'Regulates blood sugar', 'Good for memory and brain health'],
                'ingredients' => ['100% Natural Mamra Almonds'],
                'origin' => 'Pulwama, Kashmir, India',
                'usage' => 'Soak 5-6 almonds overnight, peel in the morning and consume for maximum benefits.',
                'images' => ['/assets/images/product_almonds.png'],
                'batch' => null
            ],
            [
                'sku' => 'KSH-PSH-001',
                'name' => 'Kashmir Pashmina Shawl (1 piece)',
                'slug' => 'kashmir-pashmina-shawl',
                'description' => 'Luxurious hand‑woven Pashmina shawl made from the fine cashmere wool of Himalayan goats. Soft, lightweight, and warm, showcasing traditional Kashmiri patterns.',
                'price' => 3499.00,
                'category_name' => 'Textiles',
                'stock' => 15,
                'benefits' => ['Exceptional warmth', 'Elegant drape', 'Handcrafted heritage'],
                'ingredients' => ['100% pure Himalayan Cashmere wool'],
                'origin' => 'Srinagar, Kashmir, India',
                'usage' => 'Wear as a shawl or wrap. Dry clean only.',
                'images' => ['/assets/images/product_pashmina.png'],
                'batch' => [
                    'batch_number' => 'PSH-2026-P09',
                    'crocin_level' => 'Fiber diameter: 12-14 microns',
                    'safranal_level' => '100% Hand-loomed',
                    'harvest_date' => '2026-04-01',
                    'artisan_story' => 'Hand-spun and hand-woven on a traditional wooden loom by Master Artisan Farooq Ahmad in Downtown Srinagar.',
                ]
            ],
            [
                'sku' => 'KSH-CRP-001',
                'name' => 'Kashmir Hand‑crafted Carpet (2x3 ft)',
                'slug' => 'kashmir-handcrafted-carpet',
                'description' => 'Traditional Kashmiri woven carpet featuring intricate floral motifs. Made from natural wool for durability and comfort.',
                'price' => 6999.00,
                'category_name' => 'Home Decor',
                'stock' => 10,
                'benefits' => ['Adds cultural elegance', 'Durable and soft'],
                'ingredients' => ['100% Organic Wool', 'Natural Vegetable Dyes'],
                'origin' => 'Kashmir, India',
                'usage' => 'Place in living room or bedroom. Spot clean as needed.',
                'images' => ['/assets/images/product_carpet.png'],
                'batch' => null
            ]
        ];

        foreach ($productsData as $pData) {
            $catId = $categories[$pData['category_name']]->id;
            
            $product = Product::create([
                'sku' => $pData['sku'],
                'name' => $pData['name'],
                'slug' => $pData['slug'],
                'description' => $pData['description'],
                'price' => $pData['price'],
                'category_id' => $catId,
                'stock' => $pData['stock'],
                'benefits' => $pData['benefits'],
                'ingredients' => $pData['ingredients'],
                'origin' => $pData['origin'],
                'usage' => $pData['usage'],
                'active' => true,
            ]);

            // Seed Images
            foreach ($pData['images'] as $index => $img) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $img,
                    'is_primary' => ($index === 0)
                ]);
            }

            // Seed Batch (if available)
            if ($pData['batch']) {
                Batch::create([
                    'product_id' => $product->id,
                    'batch_number' => $pData['batch']['batch_number'],
                    'lab_report_pdf' => '/storage/reports/' . strtolower($pData['sku']) . '.pdf',
                    'crocin_level' => $pData['batch']['crocin_level'],
                    'safranal_level' => $pData['batch']['safranal_level'],
                    'harvest_date' => $pData['batch']['harvest_date'],
                    'artisan_story' => $pData['batch']['artisan_story'],
                ]);
            }
        }

        // 4. Seed Footer Details
        FooterDetail::create([
            'address' => 'Palace Boutique, Boulevard Road, Near Dal Lake, Srinagar, Jammu & Kashmir, 190001',
            'phone' => '+91 194 245 2890',
            'email' => 'contact@kashmirheritage.com',
            'social_links' => [
                'facebook' => 'https://facebook.com/kashmirheritage',
                'instagram' => 'https://instagram.com/kashmirheritage',
                'twitter' => 'https://twitter.com/kashmirheritage'
            ]
        ]);
    }
}
