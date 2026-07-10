<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable([
    'sku', 'name', 'slug', 'brand', 'description', 'price', 'sale_price',
    'currency', 'category_id', 'stock', 'benefits',
    'ingredients', 'origin', 'usage', 'active'
])]
class Product extends Model
{
    protected function casts(): array
    {
        return [
            'price'      => 'decimal:2',
            'sale_price' => 'decimal:2',
            'stock'      => 'integer',
            'benefits'   => 'array',
            'ingredients'=> 'array',
            'active'     => 'boolean'
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class);
    }

    public function batches(): HasMany
    {
        return $this->hasMany(Batch::class);
    }
}
