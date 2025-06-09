<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartShopItem extends Model
{
     use HasFactory;

    protected $fillable = [
        'cart_shop_id',
        'inventario_id',
        'product_name',
        'descripcion',
        'price',
        'quantity',
    ];

    // 🔗 Relación: Cada ítem pertenece a un carrito
    public function cartShop()
    {
        return $this->belongsTo(CartShop::class);
    }
    
    public function inventario()
{
    return $this->belongsTo(Inventario::class, 'inventario_id');
}

}
