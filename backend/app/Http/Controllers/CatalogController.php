<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Batch;
use Illuminate\Http\Request;

class CatalogController extends Controller
{
    public function index()
    {
        $products = Product::with(['images', 'category'])->where('active', true)->get();
        return response()->json($products);
    }

    public function show($slug)
    {
        $product = Product::with(['images', 'category', 'batches'])->where('slug', $slug)->first();

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product);
    }

    public function categories()
    {
        $categories = Category::withCount('products')->get();
        return response()->json($categories);
    }

    public function verifyBatch($batchNumber)
    {
        $batch = Batch::with('product')->where('batch_number', $batchNumber)->first();

        if (!$batch) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid or unregistered batch code. Please check the spelling or contact support.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'batch' => $batch
        ]);
    }
}
