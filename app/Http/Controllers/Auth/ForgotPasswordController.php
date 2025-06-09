<?php

namespace App\Http\Controllers\Auth;

use App\Models\User; // o el modelo correcto que uses
use App\Notifications\ResetPasswordNotificationCustom;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{

    public function broker()
{
    return Password::broker('users');
}

    public function sendResetLinkEmail(Request $request)
    {

         $request->validate(['correo' => 'required|email']);

    $user = User::where('correo', $request->correo)->first();

    if (!$user) {
        return response()->json(['message' => 'Usuario no encontrado'], 404);
    }

    $token = \Illuminate\Support\Facades\Password::createToken($user);

    // ✅ ENVÍA la notificación con el token y correo
    $user->notify(new ResetPasswordNotificationCustom($token, $user->correo));

    return response()->json(['message' => 'Correo enviado con el enlace para restablecer contraseña']);

    }


}
