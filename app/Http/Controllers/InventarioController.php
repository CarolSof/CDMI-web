<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Inventario;

class InventarioController extends Controller
{
    public function index()
    {
        $productos = Inventario::all();
        return response()->json(Inventario::all(), 200);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string|max:255',
            'precio' => 'required|numeric',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10240', // 2MB máximo
        ]);

        

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        
        $rutaImagen = null;

    if ($request->hasFile('imagen')) {
        $rutaImagen = $request->file('imagen')->store('imagenes', 'public');
    }

        $inventario = Inventario::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'precio' => $request->precio,
            'imagen' => $rutaImagen,
        ]);

        return response()->json($inventario, 201);
    }

    // Método único para registrar usuario en evento
    /**
     * @OA\Post(
     *     path="/api/eventos/{eventoId}/registrar-usuario",
     *     tags={"Eventos"},
     *     summary="Registrar un usuario en un evento",
     *     description="Permite al usuario autenticado registrarse en un evento específico",
     *     @OA\Parameter(
     *         name="eventoId",
     *         in="path",
     *         description="ID del evento",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Registro exitoso al evento"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Evento no encontrado"
     *     ),
     *     @OA\Response(
     *         response=409,
     *         description="El usuario ya está registrado en este evento"
     *     )
     * )
     */
    

}


