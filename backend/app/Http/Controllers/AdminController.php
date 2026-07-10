<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\HomepageSection;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Batch;
use App\Models\FooterDetail;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    /**
     * Check if user is admin
     */
    private function checkAdmin(Request $request)
    {
        $user = $request->user();
        if (!$user || ($user->role !== 'admin' && $user->role !== 'super_admin')) {
            return response()->json(['message' => 'Unauthorized. Admin access required.'], 403);
        }
        return null;
    }

    // ──────────────────────────────────────────────────────────────────────
    // DASHBOARD OVERVIEW
    // ──────────────────────────────────────────────────────────────────────

    /**
     * Dashboard stats
     */
    public function dashboardStats(Request $request)
    {
        if ($authError = $this->checkAdmin($request)) return $authError;

        $totalProducts = Product::count();
        $totalCategories = Category::count();
        $totalUsers = User::where('role', 'customer')->count();
        $totalOrders = Order::count();
        $totalRevenue = Order::whereIn('status', ['processing', 'shipped', 'delivered'])->sum('total_amount');
        $pendingOrders = Order::where('status', 'pending')->count();
        $recentOrders = Order::with('user')->orderBy('created_at', 'desc')->take(5)->get();

        return response()->json([
            'total_products' => $totalProducts,
            'total_categories' => $totalCategories,
            'total_users' => $totalUsers,
            'total_orders' => $totalOrders,
            'total_revenue' => $totalRevenue,
            'pending_orders' => $pendingOrders,
            'recent_orders' => $recentOrders,
        ]);
    }

    // ──────────────────────────────────────────────────────────────────────
    // USER MANAGEMENT
    // ──────────────────────────────────────────────────────────────────────

    /**
     * Get All Registered Users
     */
    public function users(Request $request)
    {
        if ($authError = $this->checkAdmin($request)) return $authError;

        $users = User::orderBy('created_at', 'desc')->get();
        return response()->json($users);
    }

    /**
     * Block or Unblock a User
     */
    public function toggleBlockUser(Request $request, $id)
    {
        if ($authError = $this->checkAdmin($request)) return $authError;

        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if ($user->role === 'admin' || $user->role === 'super_admin') {
            return response()->json(['message' => 'Cannot block admin users'], 403);
        }

        $user->is_blocked = !$user->is_blocked;
        $user->save();

        return response()->json([
            'message' => $user->is_blocked ? 'User blocked successfully' : 'User unblocked successfully',
            'user' => $user
        ]);
    }

    // ──────────────────────────────────────────────────────────────────────
    // CATEGORY MANAGEMENT
    // ──────────────────────────────────────────────────────────────────────

    /**
     * Store a New Category
     */
    public function storeCategory(Request $request)
    {
        if ($authError = $this->checkAdmin($request)) return $authError;

        $validator = Validator::make($request->all(), [
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $slug = Str::slug($request->name);
        $originalSlug = $slug;
        $count = 1;
        while (Category::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count++;
        }

        $category = Category::create([
            'name'        => $request->name,
            'slug'        => $slug,
            'description' => $request->description,
        ]);

        return response()->json([
            'message'  => 'Category created successfully',
            'category' => $category
        ], 201);
    }

    /**
     * Update a Category
     */
    public function updateCategory(Request $request, $id)
    {
        if ($authError = $this->checkAdmin($request)) return $authError;

        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $category->update([
            'name'        => $request->name,
            'description' => $request->description,
        ]);

        return response()->json([
            'message'  => 'Category updated successfully',
            'category' => $category
        ]);
    }

    /**
     * Delete a Category
     */
    public function deleteCategory(Request $request, $id)
    {
        if ($authError = $this->checkAdmin($request)) return $authError;

        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        if ($category->products()->count() > 0) {
            return response()->json(['message' => 'Cannot delete category with existing products. Please reassign or delete products first.'], 422);
        }

        $category->delete();
        return response()->json(['message' => 'Category deleted successfully']);
    }

    // ──────────────────────────────────────────────────────────────────────
    // CATEGORY MANAGEMENT
    // ──────────────────────────────────────────────────────────────────────

    public function uploadCategoryImage(Request $request, $id)
    {
        if ($authError = $this->checkAdmin($request)) return $authError;

        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:4096',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->file('image')->isValid()) {
            $path = $request->file('image')->store('categories/' . $category->id, 'public');
            $url = asset('storage/' . $path);

            $category->update(['image_url' => $url]);

            return response()->json([
                'message'    => 'Category image uploaded successfully',
                'url'        => $url,
                'category'   => $category,
            ]);
        }

        return response()->json(['message' => 'Invalid image file'], 400);
    }

    // ──────────────────────────────────────────────────────────────────────
    // PRODUCT MANAGEMENT
    // ──────────────────────────────────────────────────────────────────────

    public function storeProduct(Request $request)
    {
        if ($authError = $this->checkAdmin($request)) return $authError;

        $validator = Validator::make($request->all(), [
            'sku'         => 'required|string|unique:products,sku',
            'name'        => 'required|string|max:255',
            'price'       => 'required|numeric|min:0',
            'sale_price'  => 'nullable|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'stock'       => 'required|integer|min:0',
            'description' => 'nullable|string',
            'origin'      => 'nullable|string',
            'usage'       => 'nullable|string',
            'benefits'    => 'nullable|array',
            'ingredients' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $slug = Str::slug($request->name);
        $originalSlug = $slug;
        $count = 1;
        while (Product::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count++;
        }

        $product = Product::create(array_merge(
            $request->only([
                'sku', 'name', 'price', 'sale_price', 'category_id', 'stock',
                'description', 'origin', 'usage', 'benefits', 'ingredients'
            ]),
            ['slug' => $slug]
        ));

        return response()->json([
            'message' => 'Product created successfully',
            'product' => $product
        ], 201);
    }

    public function updateProduct(Request $request, $id)
    {
        if ($authError = $this->checkAdmin($request)) return $authError;

        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->update($request->only([
            'sku', 'name', 'slug', 'price', 'sale_price', 'category_id', 'stock',
            'description', 'origin', 'usage', 'benefits', 'ingredients', 'active'
        ]));

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product->fresh()
        ]);
    }

    public function deleteProduct(Request $request, $id)
    {
        if ($authError = $this->checkAdmin($request)) return $authError;

        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }

    /**
     * Upload Product Image
     */
    public function uploadProductImage(Request $request, $id)
    {
        if ($authError = $this->checkAdmin($request)) return $authError;

        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:4096',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->file('image')->isValid()) {
            $path = $request->file('image')->store('products/' . $product->id, 'public');
            $url = asset('storage/' . $path);

            $productImage = ProductImage::create([
                'product_id' => $product->id,
                'image_path' => $url,
            ]);

            return response()->json([
                'message'    => 'Product image uploaded successfully',
                'url'        => $url,
                'image'      => $productImage,
            ]);
        }

        return response()->json(['message' => 'Invalid image file'], 400);
    }

    // ──────────────────────────────────────────────────────────────────────
    // FOOTER MANAGEMENT
    // ──────────────────────────────────────────────────────────────────────

    public function updateFooter(Request $request)
    {
        if ($authError = $this->checkAdmin($request)) return $authError;

        $footer = FooterDetail::first() ?: new FooterDetail();

        $footer->address      = $request->input('address', $footer->address);
        $footer->phone        = $request->input('phone', $footer->phone);
        $footer->email        = $request->input('email', $footer->email);
        $footer->social_links = $request->input('social_links', $footer->social_links);

        $footer->save();

        return response()->json([
            'message' => 'Footer details updated successfully',
            'footer'  => $footer
        ]);
    }

    public function getFooter(Request $request)
    {
        $footer = FooterDetail::first();
        return response()->json($footer ?: []);
    }

    // ──────────────────────────────────────────────────────────────────────
    // HOMEPAGE SECTIONS MANAGEMENT
    // ──────────────────────────────────────────────────────────────────────

    /**
     * Get all homepage sections
     */
    public function getHomepageSections(Request $request)
    {
        $sections = HomepageSection::all()->keyBy('section_key');
        return response()->json($sections);
    }

    /**
     * Update a homepage section
     */
    public function updateHomepageSection(Request $request, $key)
    {
        if ($authError = $this->checkAdmin($request)) return $authError;

        $section = HomepageSection::firstOrNew(['section_key' => $key]);

        // Handle image upload if provided
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $path = $request->file('image')->store('homepage/' . $key, 'public');
            $section->image_url = asset('storage/' . $path);
        }

        if ($request->hasFile('image_2') && $request->file('image_2')->isValid()) {
            $path = $request->file('image_2')->store('homepage/' . $key . '_2', 'public');
            $section->image_url_2 = asset('storage/' . $path);
        }

        if ($request->has('headline'))    $section->headline    = $request->headline;
        if ($request->has('subtext'))     $section->subtext     = $request->subtext;
        if ($request->has('button_text')) $section->button_text = $request->button_text;
        if ($request->has('button_link')) $section->button_link = $request->button_link;
        if ($request->has('extra_data'))  $section->extra_data  = $request->extra_data;

        $section->save();

        return response()->json([
            'message' => 'Section updated successfully',
            'section' => $section
        ]);
    }

    /**
     * Upload Homepage Image (legacy endpoint kept for compatibility)
     */
    public function uploadHomepageImages(Request $request)
    {
        if ($authError = $this->checkAdmin($request)) return $authError;

        $validator = Validator::make($request->all(), [
            'image'   => 'required|image|mimes:jpeg,png,jpg,webp|max:4096',
            'section' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->file('image')->isValid()) {
            $path = $request->file('image')->store('homepage/' . $request->section, 'public');
            $url  = asset('storage/' . $path);

            // Also update in sections table
            $section = HomepageSection::firstOrNew(['section_key' => $request->section]);
            $section->image_url = $url;
            $section->save();

            return response()->json([
                'message' => 'Homepage image uploaded successfully',
                'url'     => $url,
                'path'    => $path
            ]);
        }

        return response()->json(['message' => 'Invalid image file'], 400);
    }

    // ──────────────────────────────────────────────────────────────────────
    // BATCH MANAGEMENT
    // ──────────────────────────────────────────────────────────────────────

    public function storeBatch(Request $request)
    {
        if ($authError = $this->checkAdmin($request)) return $authError;

        $validator = Validator::make($request->all(), [
            'product_id'    => 'required|exists:products,id',
            'batch_number'  => 'required|string|unique:batches,batch_number',
            'lab_report'    => 'nullable|file|mimes:pdf|max:10240',
            'crocin_level'  => 'nullable|string',
            'safranal_level' => 'nullable|string',
            'harvest_date'  => 'nullable|date',
            'artisan_story' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $labReportPath = null;
        if ($request->hasFile('lab_report') && $request->file('lab_report')->isValid()) {
            $labReportPath = $request->file('lab_report')->store('certificates', 'public');
        }

        $batch = Batch::create([
            'product_id'     => $request->product_id,
            'batch_number'   => $request->batch_number,
            'lab_report_pdf' => $labReportPath ? '/storage/' . $labReportPath : null,
            'crocin_level'   => $request->crocin_level,
            'safranal_level' => $request->safranal_level,
            'harvest_date'   => $request->harvest_date,
            'artisan_story'  => $request->artisan_story
        ]);

        return response()->json([
            'message' => 'Batch created successfully',
            'batch'   => $batch
        ], 201);
    }
}
