<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ayuda extends Model
{
    //
    protected $fillable = ['nombre', 'fecha', 'monto', 'causa',];

    // Relación de muchos a muchos con User (no Usuarios)
    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'ayuda_usuario', 'ayuda_id', 'usuario_id');
    }
}
