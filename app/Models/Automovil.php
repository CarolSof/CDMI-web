<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Automovil extends Model
{
    //
    protected $table = 'mercancias'; // 👈 Esto le dice a Laravel qué tabla usar
    protected $fillable = ['nombre', 'descripcion', 'precio'];

    // Relación de muchos a muchos con User (no Usuarios)
    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'automovil_usuario', 'automovil_id', 'usuario_id');
    }
}
