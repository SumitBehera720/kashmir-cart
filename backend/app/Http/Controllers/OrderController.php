<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::with('items.product')
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();
            
        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'shipping_address' => 'required|string|max:500',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $order = DB::transaction(function () use ($request) {
                $totalAmount = 0;
                $orderItemsToCreate = [];

                foreach ($request->items as $itemData) {
                    $product = Product::lockForUpdate()->find($itemData['product_id']);

                    // Verify Stock
                    if ($product->stock < $itemData['quantity']) {
                        throw new \Exception("Insufficient stock for product: {$product->name}");
                    }

                    // Decrement Stock
                    $product->decrement('stock', $itemData['quantity']);

                    $itemPrice = $product->price;
                    $subtotal = $itemPrice * $itemData['quantity'];
                    $totalAmount += $subtotal;

                    $orderItemsToCreate[] = [
                        'product_id' => $product->id,
                        'quantity' => $itemData['quantity'],
                        'price' => $itemPrice
                    ];
                }

                // Create Order
                $order = Order::create([
                    'user_id' => $request->user()->id,
                    'total_amount' => $totalAmount,
                    'payment_status' => 'pending',
                    'payment_method' => $request->payment_method ?? 'cod',
                    'shipping_status' => 'pending',
                    'shipping_address' => $request->shipping_address,
                ]);

                // Create Order Items
                foreach ($orderItemsToCreate as $item) {
                    $item['order_id'] = $order->id;
                    OrderItem::create($item);
                }

                return $order;
            });

            return response()->json([
                'message' => 'Order placed successfully',
                'order' => $order->load('items.product')
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to place order',
                'error' => $e->getMessage()
            ], 400);
        }
    }
}
