<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Compra;

class CompraController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/compra",
     *     tags={"Compra"},
     *     summary="Registrar una nueva compra",
     *     description="Registra una compra con uno o varios productos",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"productos"},
     *             @OA\Property(
     *                 property="productos",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     required={"id", "name", "price", "quantity"},
     *                     @OA\Property(property="id", type="integer", example=1),
     *                     @OA\Property(property="name", type="string", example="Collar artesanal"),
     *                     @OA\Property(property="price", type="number", format="float", example=29.99),
     *                     @OA\Property(property="quantity", type="integer", example=2)
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Compra registrada con éxito"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validación de datos"
     *     )
     * )
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'productos' => 'required|array',
            'productos.*.id' => 'required|integer',
            'productos.*.name' => 'required|string',
            'productos.*.price' => 'required|numeric',
            'productos.*.quantity' => 'required|integer',
        ]);

        foreach ($data['productos'] as $producto) {
            Compra::create([
                'producto_id' => $producto['id'],
                'nombre' => $producto['name'],
                'precio' => $producto['price'],
                'cantidad' => $producto['quantity'],
                $usuario_id => auth()->id(), // Asegúrate que el usuario esté autenticado
            ]);
        }

        return response()->json(['message' => 'Compra registrada con éxito'], 201);
    }
}
