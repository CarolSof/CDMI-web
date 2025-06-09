<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuarios extends Model
{
    use HasFactory;

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

    public function eventos()
{
    return $this->belongsToMany(Evento::class, 'evento_usuario', 'usuario_id', 'evento_id')->withTimestamps();
}
protected static function booted()
{
    static::creating(function ($usuario) {
        $usuario->email = $usuario->correo;
    });
}

}
