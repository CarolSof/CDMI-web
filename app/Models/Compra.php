<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Compra extends Model
{
    protected $fillable = [
        'producto_id',
        'nombre',
        'precio',
        'cantidad',
        'usuario_id',
    ];
}
