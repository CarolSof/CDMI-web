<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessTokenResult;

class AuthController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/login",
     *     tags={"Autenticación"},
     *     summary="Iniciar sesión de usuario",
     *     description="Inicia sesión y devuelve un token de autenticación",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"correo","contraseña","rol"},
     *             @OA\Property(property="correo", type="string", format="email", example="usuario@example.com"),
     *             @OA\Property(property="contraseña", type="string", example="password123"),
     *             @OA\Property(property="rol", type="string", enum={"administrador", "usuario"}, example="usuario")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Inicio de sesión exitoso"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Correo no registrado o contraseña incorrecta"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Rol incorrecto"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validación de datos"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Error interno del servidor"
     *     )
     * )
     */
    public function login(Request $request) {



    /*{
        $credentials = $request->only('email', 'password');

    if (Auth::attempt($credentials)) {
        // Aquí ya sabes que el usuario ha iniciado sesión correctamente

        $user = Auth::user();

        if ($user->rol === 'administrador') {
            return redirect('/AdminDashboard');
        }

        return redirect('/AdminDashboard');
    }*/

    //return back()->withErrors(['email' => 'Credenciales inválidas']);




        try {
            $validator = Validator::make($request->all(), [
                'correo' => 'required|email',
                'contraseña' => 'required',
                'rol' => 'required|in:administrador,usuario',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'error' => 'Datos de validación incorrectos',
                    'errors' => $validator->errors(),
                    'request' => $request->all(),
                    'status' => 422,
                ], 422);
            }

            // Buscar el usuario por el correo electrónico
            $user = User::where('correo', $request->correo)->first();

            if (!$user) {
                return response()->json(['error' => 'Correo no registrado'], 401);
            }

            // Verificar la contraseña
            if (!Hash::check($request->contraseña, $user->contraseña)) {
                return response()->json(['error' => 'Contraseña incorrecta'], 401);
            }

            //validar que el rol coincida
            if ($user->rol !==$request->rol){
               return response()->json(['error' => 'Rol incorrecto'], 403);
            }

            //no se valida el rol enviado. el sistema determina el rol desde la DB.
            $rol = $user->rol;
        

            // Generar el token de acceso utilizando Sanctum
            $token = $user->createToken('auth-token')->plainTextToken;

            // Retornar el token de acceso
            return response()->json([
                'message' => 'Inicio de sesión exitoso',
                'token' => $token,
                'user' => $user,
                'rol' => $rol,
            ]);
        } catch (\Exception $e) {
            // Si ocurre un error inesperado, retornamos un mensaje de error genérico
            return response()->json(['error' => 'Ha ocurrido un error interno. Intenta nuevamente más tarde.', "json" => $e], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/verify",
     *     tags={"Autenticación"},
     *     summary="Verificar sesión del usuario",
     *     description="Devuelve la información del usuario autenticado",
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Usuario autenticado encontrado"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="No autorizado"
     *     )
     * )
     */
    public function verifySession(Request $request)
    {
        $user = $request->user();
        return response()->json(['user' => $user]);
    }

    /**
     * @OA\Post(
     *     path="/api/logout",
     *     tags={"Autenticación"},
     *     summary="Cerrar sesión del usuario",
     *     description="Elimina el token de acceso del usuario autenticado",
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Cierre de sesión exitoso"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="No autorizado"
     *     )
     * )
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Cierre de sesión exitoso'], 200);
    }
}
