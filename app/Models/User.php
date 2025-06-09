<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Notifications\ResetPasswordNotificationCustom;
use Illuminate\Auth\Notifications\ResetPassword as ResetPasswordNotification;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash; // Agregado para usar Hash

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens; 

    protected $table = 'usuarios';

    protected $fillable = [
        'nombre',
        'apellido',
        //'fecha_nacimiento',
        'correo',
        'telefono',
        'contraseña',
        'rol',
        'imagen_perfil',
    ];

    // Definimos las columnas que deberían ser tratadas como fechas.
    protected $dates = [
        //'fecha_nacimiento',
        'created_at',
        'updated_at',
    ];


    // Si no utilizas timestamps, puedes deshabilitar los timestamps automáticos de Eloquent.
    public $timestamps = true;

    // Si tu campo de la contraseña es diferente (como `password`), puedes renombrarlo.
    protected $hidden = [
        'contraseña',
    ];

    // Si estás utilizando un campo diferente para el ID (como `id` en lugar de `id` por defecto en Laravel),
    protected $primaryKey = 'id';

    // Si el tipo de datos de `id` no es entero (por ejemplo, bigint), indícalo.
    protected $keyType = 'string';

    // Si la clave primaria no es autoincremental, puedes deshabilitarla
    public $incrementing = true;

    // Mutador para encriptar la contraseña antes de guardarla en la base de datos.
    public function setContraseñaAttribute($value)
    {
        // Si la contraseña no está vacía, la encriptamos.
        if (!empty($value)) {
            $this->attributes['contraseña'] = Hash::make($value);
        }
    }

    public function getAuthIdentifierName()
{
    return 'correo';
}

public function eventos()
{
    return $this->belongsToMany(Evento::class, 'evento_usuario', 'usuario_id', 'evento_id');
}



    public function orders()
    {
        return $this->hasMany(Order::class);
    }



public function getEmailForPasswordReset()
{
    return $this->correo;
}
protected $appends = ['email'];
    public function getEmailAttribute()
{
    return $this->correo;
    //return $this->attributes['correo'] ?? null;
}
public function sendPasswordResetNotification($token)
{
    // Aquí configuras la URL de tu frontend que manejará el reset, por ejemplo:
    $url = config('app.frontend_url') . '/reset-password?token=' . $token . '&correo=' . urlencode($this->correo);

    $this->notify(new ResetPasswordNotificationCustom($url));
}

// App\Models\Usuarios.php

protected static function booted()
{
    static::saving(function ($user) {
        $user->email = $user->correo;
    });
}


}
