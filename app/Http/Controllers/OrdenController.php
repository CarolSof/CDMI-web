<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartShop;
use App\Models\User;

class OrdenController extends Controller
{
    public function index(Request $request)
    {
        $ordenes = CartShop::with(['user', 'items.inventario'])
            ->where('finalizado', true)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($ordenes);
    }
}
