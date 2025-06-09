<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Inventario;

class InventarioSeeder extends Seeder
{
    public function run()
    {
        Inventario::create([
            'nombre' => 'Zapatos deportivos',
            'descripcion' => 'Zapatos cómodos para correr.',
            'precio' => 120000
        ]);

        Inventario::create([
            'nombre' => 'Camiseta técnica',
            'descripcion' => 'Camiseta ligera de entrenamiento.',
            'precio' => 65000
        ]);
    }
}
