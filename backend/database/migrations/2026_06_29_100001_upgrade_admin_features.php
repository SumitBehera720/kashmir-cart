<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Add sale_price to products
        Schema::table('products', function (Blueprint $table) {
            $table->decimal('sale_price', 10, 2)->nullable()->after('price');
        });

        // Add is_blocked to users
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_blocked')->default(false)->after('role');
        });

        // Add description to categories (if not exists)
        if (!Schema::hasColumn('categories', 'description')) {
            Schema::table('categories', function (Blueprint $table) {
                $table->text('description')->nullable()->after('name');
            });
        }

        // Create homepage_sections table
        Schema::create('homepage_sections', function (Blueprint $table) {
            $table->id();
            $table->string('section_key')->unique(); // e.g. hero, heritage_story, category_showcase
            $table->string('headline')->nullable();
            $table->text('subtext')->nullable();
            $table->string('button_text')->nullable();
            $table->string('button_link')->nullable();
            $table->string('image_url')->nullable();
            $table->string('image_url_2')->nullable(); // secondary image slot
            $table->json('extra_data')->nullable(); // for complex sections
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('homepage_sections');

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('is_blocked');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('sale_price');
        });
    }
};
