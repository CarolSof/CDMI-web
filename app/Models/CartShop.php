<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartShop extends Model
{
    use HasFactory;

    protected $fillable = ['usuario_id'];

    // 🔗 Relación: Un carrito pertenece a un usuario
    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

    // 🔗 Relación: Un carrito tiene muchos ítems
    public function items()
    {
        return $this->hasMany(CartShopItem::class);
    }
}

