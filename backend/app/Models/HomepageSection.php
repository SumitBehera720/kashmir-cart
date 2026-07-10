<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HomepageSection extends Model
{
    use HasFactory;

    protected $table = 'homepage_sections';

    protected $fillable = [
        'section_key',
        'headline',
        'subtext',
        'button_text',
        'button_link',
        'image_url',
        'image_url_2',
        'extra_data',
    ];

    protected $casts = [
        'extra_data' => 'array',
    ];
}
