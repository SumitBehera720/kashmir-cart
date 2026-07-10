<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['address', 'phone', 'email', 'social_links'])]
class FooterDetail extends Model
{
    protected function casts(): array
    {
        return [
            'social_links' => 'array'
        ];
    }
}
