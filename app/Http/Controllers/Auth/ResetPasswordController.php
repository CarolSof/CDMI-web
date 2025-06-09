<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class ResetPasswordController extends Controller
{
    public function reset(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'correo' => 'required|email',
            'contraseña' => 'required|confirmed|min:6',
        ]);

        $status = Password::broker('users')->reset(
            [
                'email' => $request->correo,
                'password' => $request->contraseña,
                'password_confirmation' => $request->contraseña_confirmation,
                'token' => $request->token,
            ],
            function ($user, $password) {
                $user->contraseña = $password;
                $user->save();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json(['message' => 'Contraseña restablecida.'], 200);
        } else {
            return response()->json(['message' => __($status)], 400);
        }
    }
}
