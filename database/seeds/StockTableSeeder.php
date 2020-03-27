<?php

use Illuminate\Database\Seeder;
use App\Stock;

class StockTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Stock::create([
          'branch_id' => 1,
          'name' => 'AGO',
          'unit' => 'L',
        ]);

        Stock::create([
          'branch_id' => 1,
          'name' => 'PMS',
          'unit' => 'L',
        ]);

        Stock::create([
          'branch_id' => 1,
          'name' => 'DPK',
          'unit' => 'L',
        ]);
    }
}
