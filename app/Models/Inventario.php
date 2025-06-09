<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventario extends Model
{
    protected $fillable = ['nombre', 'descripcion', 'precio', 'imagen'];

    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'inventario_id', 'cart_shop_id', 'usuario_id');
    }
}

