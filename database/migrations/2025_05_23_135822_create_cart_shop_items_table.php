<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cart_shop_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cart_shop_id')->constrained('cart_shops')->onDelete('cascade');
            $table->unsignedBigInteger('inventario_id'); // puede ser automovil_id o producto_id según el caso
            $table->string('product_name');
            $table->text('descripcion')->nullable();
            $table->decimal('price', 10, 2);
            $table->integer('quantity');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart_shop_items');
    }
};
