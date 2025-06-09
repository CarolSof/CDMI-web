<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Carrito;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class carritoController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/carrito",
     *     tags={"Carrito"},
     *     summary="Obtener todo del carrito",
     *     description="Lista todos los registros de carritos disponibles",
     *     @OA\Response(
     *         response=200,
     *         description="Listado de carritos obtenido exitosamente"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No hay registros de carritos"
     *     )
     * )
     */
    public function index()
    {
        $carrito = Carrito::all();

        if ($carrito->isEmpty()) {
            $data = [
                'message' => 'No hay ningun registro del carrito',
                'status' => 200
            ];
            return response()->json($data, 404);
        }

        return response()->json($carrito, 200);
    }

    /**
     * @OA\Post(
     *     path="/api/carrito",
     *     tags={"Carrito"},
     *     summary="Crear un nuevo carrito",
     *     description="Registra un nuevo carrito en el sistema",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"ID_Carrito","ID_Usuario","ID_Producto"},
     *             @OA\Property(property="ID_Carrito", type="string", example="CARR123"),
     *             @OA\Property(property="ID_Usuario", type="integer", example=1),
     *             @OA\Property(property="ID_Producto", type="integer", example=5)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Carrito creado exitosamente"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error en la validación de datos"
     *     )
     * )
     */
    public function store(Request $request)
    {
       $validator = Validator::make($request->all(), [
            'ID_Carrito' => 'required|max:255',
            'ID_Usuario' => 'required',
            'ID_Producto' => 'required'
       ]);

       if ($validator->fails()) {
        $data = [
            'message' => 'Error en la validación de los datos',
            'errors' => $validator->errors(),
            'status' => 400
        ];
        return response()->json($data, 400);
       }

       $carrito = Carrito::create([
            'ID_Carrito' => $request->ID_Carrito,
            'ID_Usuario' => $request->ID_Usuario,
            'ID_Producto' => $request->ID_Producto
       ]);

       if (!$carrito) {
        $data = [
            'message' => 'Error al crear el estudiante',
            'status' => 500
        ];
        return response()->json($data, 500);
       }

       $data = [
        'carrito' => $carrito,
        'status' => 201
       ];

       return response()->json($data, 201);
    }

    /**
     * @OA\Get(
     *     path="/api/carrito/{id}",
     *     tags={"Carrito"},
     *     summary="Obtener un carrito por ID",
     *     description="Devuelve un carrito específico basado en su ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del carrito a buscar",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Carrito encontrado exitosamente"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Carrito no encontrado"
     *     )
     * )
     */
    public function show($id)

    {
        $carrito = Carrito::find($id);

        if (!$carrito) {
            $data = [
                'message' => 'Carrito no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'carrito' => $carrito,
            'status' => 200
        ];

        return response()->json($data, 200);

    }

    /**
     * @OA\Delete(
     *     path="/api/carrito/{id}",
     *     tags={"Carrito"},
     *     summary="Eliminar un carrito",
     *     description="Elimina un carrito específico basado en su ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del carrito a eliminar",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Carrito eliminado exitosamente"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Carrito no encontrado"
     *     )
     * )
     */
    public function destroy($id)
    {
       $carrito = Carrito::find($id);

       if (!$carrito) {
        $data = [
            'message' => 'Carrito no encontrado',
            'status' => 404
        ];
        return response()->json($data, 404);

       }

       $carrito->delete();

       $data = [
        'message' => 'Carrito eliminado',
        'status' => 200
       ];

       return response()->json($data, 200);
    }

    /**
     * @OA\Put(
     *     path="/api/carrito/{id}",
     *     tags={"Carrito"},
     *     summary="Actualizar un carrito (completo)",
     *     description="Actualiza todos los datos de un carrito específico",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del carrito a actualizar",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"ID_Carrito","ID_Usuario","ID_Producto"},
     *             @OA\Property(property="ID_Carrito", type="string", example="CARR124"),
     *             @OA\Property(property="ID_Usuario", type="integer", example=2),
     *             @OA\Property(property="ID_Producto", type="integer", example=10)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Carrito actualizado exitosamente"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error en la validación de datos"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Carrito no encontrado"
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        $carrito = Carrito::find($id);

        if (!$carrito) {
            $data = [
                'message' => 'Carrito no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = validator::make($request->all(), [
            'ID_Carrito' => 'required|max:255',
            'ID_Usuario' => 'required',
            'ID_Producto' => 'required'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $carrito->ID_Carrito = $request->ID_Carrito;
        $carrito->ID_Usuario = $request->ID_Usuario;
        $carrito->ID_Producto = $request->ID_Producto;

        $carrito->save();

        $data = [
            'message' => 'Carrito actualizado',
            'carrito' => $carrito,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    /**
     * @OA\Patch(
     *     path="/api/carrito/{id}",
     *     tags={"Carrito"},
     *     summary="Actualizar parcialmente un carrito",
     *     description="Actualiza parcialmente los datos de un carrito específico",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del carrito a actualizar parcialmente",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=false,
     *         @OA\JsonContent(
     *             @OA\Property(property="ID_Carrito", type="string", example="CARR125"),
     *             @OA\Property(property="ID_Usuario", type="integer", example=3),
     *             @OA\Property(property="ID_Producto", type="integer", example=12)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Carrito actualizado parcialmente con éxito"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error en la validación de datos"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Carrito no encontrado"
     *     )
     * )
     */
    public function updatePartial(Request $request, $id)
    {
        $carrito = Carrito::find($id);

        if (!$carrito) {
            $data = [
                'message' => 'Carrito no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

    

        $validator = validator::make($request->all(), [
            'ID_Carrito' => 'max:255',
            'ID_Usuario' => 'max:255',
            'ID_Producto' => 'max:255'

        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data,400);
        }

        if ($request->has('ID_Carrito')) {
            $carrito->ID_Carrito = $request->ID_Carrito;

        }

        if ($request->has('ID_Usuario')) {
            $carrito->ID_Usuario = $request->ID_Usuario;
            
        }

        if ($request->has('ID_Producto')) {
            $carrito->ID_Producto = $request->ID_Producto;
            
        }

        $carrito->save();

        $data = [
            'message' => 'Carrito actualizado',
            'carrito' => $carrito,
            'status' => 200
        ];

        return response()->json($data, 200);

    }

}
