<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(InventarioSeeder::class);

        DB::table('eventos')->insert([
            [
                'nombre' => 'Conferencia de Tecnología',
                'fecha' => '2025-06-15',
                'lugar' => 'Centro de Convenciones Bogotá',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Feria de Innovación',
                'fecha' => '2025-08-20',
                'lugar' => 'Plaza Mayor Medellín',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Hackathon SENA 2025',
                'fecha' => '2025-09-10',
                'lugar' => 'SENA Nodo Innovación',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Workshop de Inteligencia Artificial',
                'fecha' => '2025-07-05',
                'lugar' => 'Universidad Nacional de Colombia',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Encuentro de Emprendimiento Digital',
                'fecha' => '2025-11-18',
                'lugar' => 'Chamber of Commerce Cali',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        DB::table('usuarios')->insert([
            [
                'id' => 14,
                'nombre' => 'Laura',
                'apellido' => 'Ramirez',
                'correo' => 'laura.ramirez@example.com',
                'telefono' => '3143795973',
                'contraseña' => Hash::make('123Aa#'),
                'rol' => 'usuario',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 15,
                'nombre' => 'Valentina',
                'apellido' => 'Ramirez',
                'correo' => 'valentina.ramirez@example.com',
                'telefono' => '3143795974',
                'contraseña' => Hash::make('123Aa#'),
                'rol' => 'usuario',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 16,
                'nombre' => 'Carlos',
                'apellido' => 'Gómez',
                'correo' => 'carlos.gomez@example.com',
                'telefono' => '3156789123',
                'contraseña' => Hash::make('123Aa#'),
                'rol' => 'administrador',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 17,
                'nombre' => 'Mariana',
                'apellido' => 'López',
                'correo' => 'mariana.lopez@example.com',
                'telefono' => '3167891234',
                'contraseña' => Hash::make('123Aa#'),
                'rol' => 'usuario',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 18,
                'nombre' => 'Andrés',
                'apellido' => 'Gutierrez',
                'correo' => 'andres.gutierrez@example.com',
                'telefono' => '3178912345',
                'contraseña' => Hash::make('123Aa#'),
                'rol' => 'administrador',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        DB::table('ayudas')->insert([
            [
                'id' => 1,
                'nombre' => 'Tejiendo identidad',
                'fecha' => '2025-01-01',
                'monto' => '500.00',
                'causa' => 'Fortalecimiento de la producción y venta de textiles mayas',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'nombre' => 'Mujeres en movimiento',
                'fecha' => '2025-01-02',
                'monto' => '1000.00',
                'causa' => 'Red intercomunal de productoras nahuas y eventos culturales',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'nombre' => 'Artesanas guaraní Aguayrenda',
                'fecha' => '2025-01-03',
                'monto' => '1500.00',
                'causa' => 'Capacitación para elaboración y venta de cestería',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'nombre' => 'Fondo de compra Cauca',
                'fecha' => '2025-01-04',
                'monto' => '2000.00',
                'causa' => 'Apoyo a la comercialización de artesanías textiles y participación en ferias',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'nombre' => 'Expoartesano Medellín 2025',
                'fecha' => '2025-01-05',
                'monto' => '2500.00',
                'causa' => 'Facilitar la participación de mujeres indígenas en ferias nacionales',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
