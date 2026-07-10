<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// --- Public Endpoints ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

Route::get('/products',              [CatalogController::class, 'index']);
Route::get('/products/{slug}',       [CatalogController::class, 'show']);
Route::get('/categories',            [CatalogController::class, 'categories']);
Route::get('/verify-batch/{batchNumber}', [CatalogController::class, 'verifyBatch']);

// Public footer
Route::get('/footer', [AdminController::class, 'getFooter']);

// Public homepage sections
Route::get('/homepage-sections', [AdminController::class, 'getHomepageSections']);

// --- Protected Endpoints (Customers & Admins) ---
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Customer Orders
    Route::get('/orders',  [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);

    // --- Admin-only Endpoints ---
    Route::prefix('admin')->group(function () {

        // Dashboard
        Route::get('/stats', [AdminController::class, 'dashboardStats']);

        // User Management
        Route::get('/users',              [AdminController::class, 'users']);
        Route::put('/users/{id}/block',   [AdminController::class, 'toggleBlockUser']);

        // Category Management (full CRUD)
        Route::post('/categories',               [AdminController::class, 'storeCategory']);
        Route::put('/categories/{id}',           [AdminController::class, 'updateCategory']);
        Route::delete('/categories/{id}',        [AdminController::class, 'deleteCategory']);
        Route::post('/categories/{id}/images',   [AdminController::class, 'uploadCategoryImage']);

        // Footer Management
        Route::post('/footer', [AdminController::class, 'updateFooter']);

        // Homepage Sections
        Route::post('/homepage-sections/{key}', [AdminController::class, 'updateHomepageSection']);
        Route::post('/upload-homepage-image',   [AdminController::class, 'uploadHomepageImages']);

        // Product CRUD
        Route::post('/products',              [AdminController::class, 'storeProduct']);
        Route::put('/products/{id}',          [AdminController::class, 'updateProduct']);
        Route::delete('/products/{id}',       [AdminController::class, 'deleteProduct']);
        Route::post('/products/{id}/images',  [AdminController::class, 'uploadProductImage']);

        // Batch Certification
        Route::post('/batches', [AdminController::class, 'storeBatch']);
    });
});
