<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->decimal('total_amount', 12, 2);
            $table->string('payment_status')->default('pending'); // pending, paid, failed
            $table->string('payment_method')->default('cod'); // cod, card, upi
            $table->string('shipping_status')->default('pending'); // pending, processing, shipped, delivered, returned
            $table->string('tracking_number')->nullable();
            $table->text('shipping_address');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
