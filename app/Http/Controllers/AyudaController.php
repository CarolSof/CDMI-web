<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Ayuda;

class AyudaController extends Controller
{
    //
    /**
     * @OA\Get(
     *     path="/api/ayuda",
     *     tags={"Ayuda"},
     *     summary="Obtener todas las donaciones",
     *     description="Devuelve un listado de todas las donaciones registradas",
     *     @OA\Response(
     *         response=200,
     *         description="Listado de donaciones obtenido exitosamente"
     *     )
     * )
     */
    public function index()
    {
        return response()->json(Ayuda::all(), 200);
    }

    // Crear un evento
    /**
     * @OA\Post(
     *     path="/api/ayuda",
     *     tags={"Ayuda"},
     *     summary="Registrar una nueva donacion",
     *     description="Crea una nueva opción de donación",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nombre","fecha","monto","causa"},
     *             @OA\Property(property="nombre", type="string", maxLength=255, example="Donación Escolar"),
     *             @OA\Property(property="fecha", type="string", format="date", example="2025-04-26"),
     *             @OA\Property(property="monto", type="string", maxLength=255, example="50000"),
     *             @OA\Property(property="causa", type="string", maxLength=255, example="Apoyo a niños indígenas")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Donacion creada exitosamente"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error en la validación de datos"
     *     )
     * )
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'fecha' => 'required|date',
            'monto' => 'required|string|max:255',
            'causa' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $ayuda = Ayuda::create([
            'nombre' => $request->nombre,
            'fecha' => $request->fecha,
            'monto' => $request->monto,
            'causa' => $request->causa,
        ]);

        return response()->json($ayuda, 201);
    }

    // Método único para registrar usuario en evento
    /**
     * @OA\Post(
     *     path="/api/ayuda/{ayudaId}/registrar-usuario",
     *     tags={"Ayuda"},
     *     summary="Registrar usuario en una donacion",
     *     description="Asocia al usuario autenticado con una opción de donacion específica",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="ayudaId",
     *         in="path",
     *         required=true,
     *         description="ID de la donacion a la cual el usuario quiere donar",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Donación realizada con éxito"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Opción de donacion no encontrada"
     *     ),
     *     @OA\Response(
     *         response=409,
     *         description="El usuario ya ha donado a esta donacion"
     *     )
     * )
     */
    public function registrarUsuario(Request $request, $ayudaId)
    {
        // Obtener el usuario autenticado
        $usuario = auth()->user();

        // Buscar el evento
        $ayuda = Ayuda::find($ayudaId);

        // Si no existe el evento, retornar un error
        if (!$ayuda) {
            return response()->json(['error' => 'Opción donación no encontrada'], 404);
        }

        // Verificar si el usuario ya está registrado
        if ($ayuda->usuarios()->where('usuario_id', $usuario->id)->exists()) {
           return response()->json(['message' => 'Ya realizaste esta opción de donación'], 409);
        }

        // Registrar al usuario en el evento
        $ayuda->usuarios()->attach($usuario->id, [
            'updated_at' => now(),
            'created_at' => now(),
        ]);

        return response()->json(['message' => 'Donaste con éxito, gracias'], 200);
    }
}
