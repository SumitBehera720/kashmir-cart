<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable([
    'product_id', 'batch_number', 'lab_report_pdf', 
    'crocin_level', 'safranal_level', 'harvest_date', 'artisan_story'
])]
class Batch extends Model
{
    protected function casts(): array
    {
        return [
            'harvest_date' => 'date'
        ];
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
