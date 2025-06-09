<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;


class OrderController extends Controller
{
    public function history(Request $request)
{
    $user = $request->user();

    // Suponiendo que tienes relación user -> orders y cada order tiene items
    $orders = $user->orders()->with('items.product')->get();

    return response()->json(['orders' => $orders]);
}

}
