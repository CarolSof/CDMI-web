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
        Schema::create('order_items', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade'); // ID de la orden
            $table->foreignId('inventario_id')->constrained('inventarios')->onDelete('cascade'); // ID del producto comprado
            $table->integer('quantity'); // cantidad comprada
            $table->decimal('price', 10, 2); // precio del producto
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
