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
        Schema::create('ayuda_usuario', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ayuda_id')->constrained('ayudas')->onDelete('cascade');
            $table->foreignId('usuario_id')->constrained('usuarios')->onDelete('cascade');
            $table->timestamps();


            $table->unique(['ayuda_id', 'usuario_id']); // para que no se repita el registro
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ayuda_usuario');
    }
};
