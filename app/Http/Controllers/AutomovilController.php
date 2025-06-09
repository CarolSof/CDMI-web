<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Automovil;

class AutomovilController extends Controller
{
    //
    public function index()
    {
        return response()->json(Automovil::all(), 200);
    }

    // Crear un evento
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string|max:255',
            'precio' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $automovil = Automovil::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'precio' => $request->precio,
        ]);

        return response()->json($automovil, 201);
    }

    // Método único para registrar usuario en evento
    public function registrarUsuario(Request $request, $automovilId)
    {
        // Obtener el usuario autenticado
        $usuario = auth()->user();

        // Buscar el evento
        $automovil = Automovil::find($automovilId);

        // Si no existe el evento, retornar un error
        if (!$automovil) {
            return response()->json(['error' => 'Carruelo no encontrado'], 404);
        }

        // Verificar si el usuario ya está registrado
        if ($automovil->usuarios()->where('usuario_id', $usuario->id)->exists()) {
            return response()->json(['message' => 'Ya estás registrado en este carruelo'], 409);
        }

        // Registrar al usuario en el evento
        $automovil->usuarios()->attach($usuario->id, [
            'updated_at' => now(),
            'created_at' => now(),
        ]);

        return response()->json(['message' => 'Registro exitoso al carruelo'], 200);
    }
}
