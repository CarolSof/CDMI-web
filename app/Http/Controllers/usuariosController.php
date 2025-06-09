<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Usuarios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UsuariosController extends Controller
{   
    /**
     * @OA\Get(
     *     path="/api/usuarios",
     *     tags={"Usuarios"},
     *     summary="Usuarios Registrados",
     *     @OA\Response(
     *         response=200,
     *         description="Operación exitosa"
     *     )
     * )
     */
    public function index()
    {
        $usuarios = Usuarios::all();

        return response()->json($usuarios, 200);
    }

    /**
     * @OA\Get(
     *     path="/api/usuarios/{id}",
     *     tags={"Usuarios"},
     *     summary="Iniciar sesion",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del usuario",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Operación exitosa"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Usuario no encontrado"
     *     )
     * )
     */
    public function show($id)
    {
        $usuario = Usuarios::find($id);

        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        return response()->json($usuario, 200);
    }

    public function auhtUser(Request $request)
    {
        return response()->json([
            "user" => $request->user(),
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/usuarios",
     *     tags={"Usuarios"},
     *     summary="Registrar un nuevo usuario",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nombre","apellido","fecha_nacimiento","correo","telefono","contraseña","rol"},
     *             @OA\Property(property="nombre", type="string"),
     *             @OA\Property(property="apellido", type="string"),
     *             @OA\Property(property="fecha_nacimiento", type="string"),
     *             @OA\Property(property="correo", type="string", format="email"),
     *             @OA\Property(property="telefono", type="string"),
     *             @OA\Property(property="contraseña", type="string"),
     *             @OA\Property(property="rol", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Usuario creado exitosamente"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error de validación"
     *     )
     * )
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => [
                'required',
                'string',
                'regex:/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/'
                ],
            'apellido' => [
                'required',
                'string',
                'regex:/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/'
                ],
            //'fecha_nacimiento' => 'required|max:255',
            'correo' => 'required|email|max:255',
            'telefono' => ['required', 'string', 'regex:/^[0-9]+$/', 'max:11'],
            'contraseña' => [
            'required',
            'string',
            'min:8',
            'regex:/[a-z]/',
            'regex:/[A-Z]/',
            'regex:/[0-9]/',
            'regex:/[@$!%*#?&]/',
            ],
            'rol' => 'required|in:usuario,administrador',
            'clave_admin' => 'required_if:rol,administrador|string',
        ], [
            'contraseña.regex' => 'La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial.',
            'clave_admin.required_if' => 'La clave secreta es obligatoria para el rol administrador.'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        // Validar clave secreta para administrador
    if ($request->rol === 'administrador') {
        $claveValida = 'negrillos'; // Define aquí la clave secreta que usarás

        if ($request->input('clave_admin') !== $claveValida) {
            return response()->json([
                'errors' => ['clave_admin' => ['Clave secreta incorrecta para rol administrador.']]
            ], 422);
        }
    }

        $usuario = Usuarios::create([
            'nombre' => $request->nombre,
            'apellido' =>  $request->apellido,
            //'fecha_nacimiento' => $request->fecha_nacimiento,
            'correo' => $request->correo,
            'telefono' => $request->telefono,
            'contraseña' => Hash::make($request->contraseña),
            'rol' => $request->rol
        ]);

        if (!$usuario) {
            $data = [
                'message' => 'Error al crear el usuario',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        return response()->json($usuario, 201);
    }

    /**
     * @OA\Delete(
     *     path="/api/usuarios/{id}",
     *     tags={"Usuarios"},
     *     summary="Eliminar un usuario",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del usuario a eliminar",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Usuario eliminado exitosamente"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Usuario no encontrado"
     *     )
     * )
     */
    public function destroy($id)
    {
        $usuarios = Usuarios::find($id);

        if (!$usuarios) {
            $data = [
                'message' => 'Usuario no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $usuarios->delete();

        $data = [
            'message' => 'Usuario eliminado',
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    /**
     * @OA\Put(
     *     path="/api/usuarios/{id}",
     *     tags={"Usuarios"},
     *     summary="Actualizar completamente un usuario",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del usuario a actualizar",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nombre","apellido","fecha_nacimiento","correo","telefono","contraseña","rol"},
     *             @OA\Property(property="nombre", type="string"),
     *             @OA\Property(property="apellido", type="string"),
     *             @OA\Property(property="fecha_nacimiento", type="string"),
     *             @OA\Property(property="correo", type="string", format="email"),
     *             @OA\Property(property="telefono", type="string"),
     *             @OA\Property(property="contraseña", type="string"),
     *             @OA\Property(property="rol", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Usuario actualizado exitosamente"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Usuario no encontrado"
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        $usuarios = Usuarios::find($id);

        if (!$usuarios) {
            $data = [
                'message' => 'Usuario no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = validator::make($request->all(), [
            'nombre' => 'required|max:255',
            'apellido' => 'required|max:255',
            'fecha_nacimiento' => 'required|max:255',
            'correo' => 'required|email|max:255',
            'telefono' => 'required|max:255',
            'rol' => 'required|max:255',
            'contraseña' => $request->has('contraseña') ? [
                'required',
                'string',
                'min:8',
                'regex:/[a-z]/',       // al menos una letra minúscula
                'regex:/[A-Z]/',       // al menos una letra mayúscula
                'regex:/[0-9]/',       // al menos un número
                'regex:/[@$!%*#?&]/',  // al menos un carácter especial
            ] : '',
            'imagen_perfil' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validación de la imagen
        ], [
            'contraseña.regex' => 'La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial.'
            
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $usuarios->nombre = $request->nombre;
        $usuarios->apellido = $request->apellido;
        $usuarios->fecha_nacimiento = $request->fecha_nacimiento;
        $usuarios->correo = $request->correo;
        $usuarios->telefono = $request->telefono;

        // Si se proporciona una nueva contraseña, la actualizamos
    if ($request->has('contraseña')) {
        $usuarios->contraseña = Hash::make($request->contraseña);
    }
        
        $usuarios->rol = $request->rol;

         if ($request->hasFile('imagen_perfil')) {
        $file = $request->file('imagen_perfil');
        $filename = time() . '_' . $file->getClientOriginalName();
        $file->storeAs('public/imagenes_perfil', $filename); // Guardar en storage/app/public/perfiles
        $usuarios->imagen_perfil = 'imagenes_perfil/' . $filename; // Guardar la ruta relativa
    }

        $usuarios->save();

        $data = [
            'message' => 'Usuario actualizado',
            'usuarios' => $usuarios,
            'status' => 200
        ];

        return response()->json($data, 200);
    }
//desde aqui hice lo del perfil//
    public function perfil(Request $request)
{
    return response()->json($request->user(), 200);
}

public function actualizarPerfil(Request $request)
{
    $usuario = $request->user();

    $validator = Validator::make($request->all(), [
        'nombre' => 'sometimes|required|max:255',
        'apellido' => 'sometimes|required|max:255',
        'correo' => 'sometimes|required|email|max:255|unique:usuarios,correo,' . $usuario->id,
        'telefono' => 'sometimes|required|max:255',
        'imagen_perfil' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
        'contraseña' => [
            'nullable',
            'string',
            'min:8',
            'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/'
        ]
    ]);

    if ($validator->fails()) {
        return response()->json([
            'message' => 'Error en la validación',
            'errors' => $validator->errors()
        ], 400);
    }

    // Asignar uno por uno para estar seguros
    if ($request->filled('nombre')) $usuario->nombre = $request->nombre;
    if ($request->filled('apellido')) $usuario->apellido = $request->apellido;
    if ($request->filled('correo')) $usuario->correo = $request->correo;
    if ($request->filled('telefono')) $usuario->telefono = $request->telefono;
    if ($request->filled('contraseña')) $usuario->contraseña = $request->contraseña; // El mutador se encarga de hashearla

    // Manejar imagen si se sube
    if ($request->hasFile('imagen_perfil')) {
        $imagen = $request->file('imagen_perfil');
        $nombreImagen = time() . '_' . $imagen->getClientOriginalName();
        $ruta = $imagen->storeAs('perfiles', $nombreImagen, 'public');

        $usuario->imagen_perfil = $ruta;
    }

    $usuario->save();

    return response()->json([
        'message' => 'Perfil actualizado correctamente',
        'usuario' => $usuario
    ]);
}


//hasta aqui hice lo del perfil//
    /**
     * @OA\Patch(
     *     path="/api/usuarios/{id}",
     *     tags={"Usuarios"},
     *     summary="Actualizar parcialmente un usuario",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID del usuario a actualizar parcialmente",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=false,
     *         @OA\JsonContent(
     *             @OA\Property(property="nombre", type="string"),
     *             @OA\Property(property="apellido", type="string"),
     *             @OA\Property(property="fecha_nacimiento", type="string"),
     *             @OA\Property(property="correo", type="string", format="email"),
     *             @OA\Property(property="telefono", type="string"),
     *             @OA\Property(property="contraseña", type="string"),
     *             @OA\Property(property="rol", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Usuario actualizado parcialmente"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Usuario no encontrado"
     *     )
     * )
     */
    public function updatePartial(Request $request, $id)
    {
        $usuarios = Usuarios::find($id);

        if (!$usuarios) {
            $data = [
                'message' => 'Usuario no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = validator::make($request->all(), [
            'nombre' => 'max:255',
            'apellido' => 'max:255',
            'fecha_nacimiento' => 'max:255',
            'correo' => 'email|max:255',
            'telefono' => 'max:255',
            'rol' => 'max:255',
            // Solo se aplica validación de contraseña si el campo 'contraseña' está presente
        'contraseña' => $request->has('contraseña') ? [
            'required',
            'string',
            'min:8',
            'regex:/[a-z]/',       // al menos una letra minúscula
            'regex:/[A-Z]/',       // al menos una letra mayúscula
            'regex:/[0-9]/',       // al menos un número
            'regex:/[@$!%*#?&]/',  // al menos un carácter especial
        ] : ''
    ], [
        'contraseña.regex' => 'La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial.'

        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        if ($request->has('nombre')) {
            $usuarios->nombre = $request->nombre;
        }

        if ($request->has('apellido')) {
            $usuarios->apellido = $request->apellido;
        }

        if ($request->has('fecha_nacimiento')) {
            $usuarios->fecha_nacimiento = $request->fecha_nacimiento;
        }

        if ($request->has('correo')) {
            $usuarios->correo = $request->correo;
        }

        if ($request->has('telefono')) {
            $usuarios->telefono = $request->telefono;
        }

        if ($request->has('contraseña')) {
            $usuarios->contraseña = Hash::make($request->contraseña);
        }

        if ($request->has('rol')) {
            $usuarios->rol = $request->rol;
        }

        $usuarios->save();

        $data = [
            'message' => 'Usuario actualizado',
            'usuarios' => $usuarios,
            'status' => 200
        ];

        return response()->json($data, 200);
    }
}
