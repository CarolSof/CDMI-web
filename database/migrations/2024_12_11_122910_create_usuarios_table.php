<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('apellido');
            //$table->date('fecha_nacimiento');
            $table->string('correo');
            $table->string('telefono');
            $table->string('contraseña');
            $table->enum('rol', ['usuario', 'administrador']);
            $table->string('imagen_perfil')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios', function (Blueprint $table) {
            $table->dropColumn('imagen_perfil');
        });
    }
};
