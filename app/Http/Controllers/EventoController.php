<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Evento;

class EventoController extends Controller
{
    // Mostrar todos los eventos
    /**
     * @OA\Get(
     *     path="/api/eventos",
     *     tags={"Eventos"},
     *     summary="Listar todos los eventos",
     *     description="Devuelve una lista de todos los eventos registrados",
     *     @OA\Response(
     *         response=200,
     *         description="Lista de eventos"
     *     )
     * )
     */
    public function index()
    {
        return response()->json(Evento::all(), 200);
    }

    // Crear un evento
    /**
     * @OA\Post(
     *     path="/api/eventos",
     *     tags={"Eventos"},
     *     summary="Crear un nuevo evento",
     *     description="Crea un nuevo evento en la base de datos",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nombre", "fecha", "lugar"},
     *             @OA\Property(property="nombre", type="string", example="Feria de Artesanías"),
     *             @OA\Property(property="fecha", type="string", format="date", example="2025-05-01"),
     *             @OA\Property(property="lugar", type="string", example="Centro Cultural")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Evento creado exitosamente"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validación"
     *     )
     * )
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'fecha' => 'required|date',
            'lugar' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $evento = Evento::create([
            'nombre' => $request->nombre,
            'fecha' => $request->fecha,
            'lugar' => $request->lugar,
        ]);

        return response()->json($evento, 201);
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
    public function registrarUsuario(Request $request, $eventoId)
    {
        // Obtener el usuario autenticado
        $usuario = auth()->user();

        // Buscar el evento
        $evento = Evento::find($eventoId);

        // Si no existe el evento, retornar un error
        if (!$evento) {
            return response()->json(['error' => 'Evento no encontrado'], 404);
        }

        // Verificar si el usuario ya está registrado
        if ($evento->usuarios()->where('usuario_id', $usuario->id)->exists()) {
            return response()->json(['message' => 'Ya estás registrado en este evento'], 409);
        }

        // Registrar al usuario en el evento
        $evento->usuarios()->attach($usuario->id, [
            'updated_at' => now(),
            'created_at' => now(),
        ]);

        return response()->json(['message' => 'Registro exitoso al evento'], 200);
    }
}


{/*namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Evento;


class EventoController extends Controller
{
    //
    public function index()
    {
        return response()->json(Evento::all(), 200);
    }

    public function store(Request $request)
{
    // Validar campos
    $validator = Validator::make($request->all(), [
        'nombre' => 'required|string|max:255',
        'fecha' => 'required|date',
        'lugar' => 'required|string|max:255',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'errors' => $validator->errors()
        ], 422);
    }

    // Crear evento
    $evento = Evento::create([
        'nombre' => $request->nombre,
        'fecha' => $request->fecha,
        'lugar' => $request->lugar,
    ]);

    return response()->json($evento, 201);
}

public function registrarse(Request $request, Evento $evento)
{
    $usuario = $request->user();

    // Evitar duplicados
    if ($evento->usuarios()->where('usuario_id', $usuario->id)->exists()) {
        return response()->json(['message' => 'Ya estás registrado en este evento'], 409);
    }

    $evento->usuarios()->attach($usuario->id);

    return response()->json(['message' => 'Registro exitoso'], 200);
}

public function registrar($id)
{
    $usuario = Auth::user();

    // Verifica si ya está registrado
    if ($usuario->eventos()->where('evento_id', $id)->exists()) {
        return response()->json(['message' => 'Ya estás registrado en este evento.'], 409);
    }

    // Registrar al evento
    $usuario->eventos()->attach($id);

    return response()->json(['message' => 'Registro exitoso al evento.'], 200);
}

public function registrarUsuario(Request $request, $eventoId)
{
    $user = auth()->user();
    $evento = Evento::find($eventoId);

    if (!$evento) {
        return response()->json(['error' => 'Evento no encontrado'], 404);
    }

    if ($evento->usuarios()->where('user_id', $user->id)->exists()) {
        return response()->json(['message' => 'Ya estás registrado en este evento'], 400);
    }

    $evento->usuarios()->attach($user->id);

    return response()->json(['message' => 'Registro exitoso al evento']);

    if (!$user) {
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    // Verificar si ya está registrado en el evento
    if ($user->eventos()->where('evento_id', $eventoId)->exists()) {
        return response()->json(['error' => 'Ya estás registrado en este evento'], 409);
    }

    // Registrar al usuario
    $user->eventos()->attach($eventoId);

    return response()->json(['message' => 'Registro exitoso']);
}


}*/}
