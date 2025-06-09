<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\CartShop;
use App\Models\CartShopItem;
use App\Models\Inventario; // o el modelo de productos que tengas
use Illuminate\Support\Facades\Auth;

class CartShopController extends Controller
{
     public function addToCart(Request $request, $inventarioId)
    {
        $user = Auth::user();

        // Buscar el producto (puede ser Mercancia, Producto, Automovil, etc.)
        $inventario = Inventario::findOrFail($inventarioId);

        // 1️⃣ Buscar carrito abierto del usuario
        $cart = CartShop::firstOrCreate(
            ['usuario_id' => $user->id, 'finalizado' => false],
            ['total' => 0]
        );

        // 2️⃣ Buscar si el producto ya está en el carrito
        $item = CartShopItem::where('cart_shop_id', $cart->id)
            ->where('inventario_id', $inventario->id)
            ->first();

        if ($item) {
            // Ya existe, aumentamos cantidad
            $item->quantity += 1;
            $item->save();
        } else {
            // No existe, lo agregamos
            CartShopItem::create([
                'cart_shop_id' => $cart->id,
                'inventario_id'   => $inventario->id,
                'product_name' => $inventario->nombre, // cambia si tu campo se llama distinto
                'descripcion' => $inventario ->descripcion,
                'price'        => $inventario->precio,
                'quantity'     => 1,
            ]);
        }

        return response()->json(['message' => 'Producto agregado al carrito'], 200);
    }

    public function getCart()
{
    // Solo retornar el carrito del usuario autenticado
    $user = Auth::user();

    $cart = CartShop::where('usuario_id', $user->id)
        ->where('finalizado', false)
        ->with('items') // cargar los productos del carrito
        ->first();

    return response()->json($cart);
}

public function updateQuantity(Request $request, $item_id)
{
    $item = CartShopItem::findOrFail($item_id);
    $quantity = $request->input('quantity');

    if ($quantity < 1) {
        $item->delete();
    } else {
        $item->quantity = $quantity;
        $item->save();
    }
    $item->quantity = $request->input('quantity');
    $item->save();

    return response()->json(['message' => 'Cantidad actualizada']);
}

public function removeItem($item_id)
{
    $item = CartShopItem::findOrFail($item_id);
    $item->delete();

    return response()->json(['message' => 'Producto eliminado del carrito']);
}
public function checkout()
{
    $user = Auth::user();

    $cart = CartShop::where('usuario_id', $user->id)
        ->where('finalizado', false)
        ->with('items')
        ->first();

    if (!$cart || $cart->items->isEmpty()) {
        return response()->json(['message' => 'Carrito vacío o no encontrado'], 400);
    }

    // Calcular total
    $total = $cart->items->sum(function ($item) {
        return $item->price * $item->quantity;
    });

    // Crear orden
    $order = Order::create([
        'usuario_id' => $user->id,
        'total' => $total,
        'status' => 'completado',
    ]);

    // Crear los items de la orden
    foreach ($cart->items as $item) {
        OrderItem::create([
            'order_id' => $order->id,
            'inventario_id' => $item->inventario_id,
            'quantity' => $item->quantity,
            'price' => $item->price,
        ]);
    }

    // Finalizar el carrito original
    $cart->total = $total;
    $cart->finalizado = true;
    $cart->save();

    return response()->json(['message' => 'Compra finalizada exitosamente']);
}
public function historial()
{
    $user = Auth::user();

    $orders = Order::where('usuario_id', $user->id)
        ->with(['items.inventario']) // si tienes relaciones
        ->latest()
        ->get();

    return response()->json($orders);
}



/* public function checkout()
{
    $user = Auth::user();

    $cart = CartShop::where('usuario_id', $user->id)
        ->where('finalizado', false)
        ->with('items')
        ->first();

    if (!$cart) {
        return response()->json(['message' => 'No hay carrito abierto'], 400);
    }

    // Calcular total
    $total = $cart->items->sum(function ($item) {
        return $item->price * $item->quantity;
    });

    $cart->total = $total;
    $cart->finalizado = true;
    $cart->save();

    return response()->json(['message' => 'Compra finalizada']);
}*/

}
