<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    // Campos que son asignables
    protected $fillable = ['nombre', 'fecha', 'lugar'];

    // Relación de muchos a muchos con User (no Usuarios)
    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'evento_usuario', 'evento_id', 'usuario_id');
    }
}


