<?php

namespace App\Http\Controllers;

use App\Models\Donacion;
use Illuminate\Http\Request;

class DonacionController extends Controller
{
    //
    //
    /**
     * @OA\Get(
     *     path="/api/donaciones",
     *     tags={"Donaciones"},
     *     summary="Listar donaciones",
     *     description="Obtiene una lista paginada de todas las donaciones registradas",
     *     @OA\Response(
     *         response=200,
     *         description="Lista de donaciones paginada"
     *     )
     * )
     */
    public function index(Request $request)
    {
        // Paginación
        $donaciones = Donacion::paginate(10);  // Cambia el número de elementos por página según lo necesites
        return response()->json($donaciones);
    }

    /**
     * @OA\Post(
     *     path="/api/donaciones",
     *     tags={"Donaciones"},
     *     summary="Registrar una nueva donación",
     *     description="Crea una nueva donación en la base de datos",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nombre", "monto", "fecha"},
     *             @OA\Property(property="nombre", type="string", example="Juan Pérez"),
     *             @OA\Property(property="monto", type="number", format="float", example=100.00),
     *             @OA\Property(property="fecha", type="string", format="date", example="2025-04-25")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Donación creada exitosamente"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validación"
     *     )
     * )
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string',
            'monto' => 'required|numeric',
            'fecha' => 'required|date',
        ]);

        $donacion = Donacion::create($request->all());
        return response()->json($donacion, 201);  // Código 201 para creación exitosa
    }

    /**
     * @OA\Get(
     *     path="/api/donaciones/{id}",
     *     tags={"Donaciones"},
     *     summary="Obtener una donación específica",
     *     description="Devuelve los datos de una donación específica por su ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID de la donación",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Detalles de la donación"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Donación no encontrada"
     *     )
     * )
     */
    public function show($id)
    {
        $donacion = Donacion::findOrFail($id);
        return response()->json($donacion);
    }

    /**
     * @OA\Put(
     *     path="/api/donaciones/{id}",
     *     tags={"Donaciones"},
     *     summary="Actualizar una donación",
     *     description="Actualiza los datos de una donación existente",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID de la donación",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nombre", "monto", "fecha"},
     *             @OA\Property(property="nombre", type="string", example="Ana López"),
     *             @OA\Property(property="monto", type="number", format="float", example=150.50),
     *             @OA\Property(property="fecha", type="string", format="date", example="2025-04-26")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Donación actualizada exitosamente"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Donación no encontrada"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validación"
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre' => 'required|string',
            'monto' => 'required|numeric',
            'fecha' => 'required|date',
        ]);

        $donacion = Donacion::findOrFail($id);
        $donacion->update($request->all());
        return response()->json($donacion);
    }

    /**
     * @OA\Delete(
     *     path="/api/donaciones/{id}",
     *     tags={"Donaciones"},
     *     summary="Eliminar una donación",
     *     description="Elimina una donación de la base de datos por su ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID de la donación",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Donación eliminada exitosamente"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Donación no encontrada"
     *     )
     * )
     */
    public function destroy($id)
    {
        $donacion = Donacion::findOrFail($id);
        $donacion->delete();
        return response()->json(null, 204);  // Código 204 para "No content"
    }
}
