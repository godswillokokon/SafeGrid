<?php

use Illuminate\Database\Seeder;
use App\StockRecord;

class StockRecordsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        StockRecord::create([
          'stock_id' => 1,
          'quantity' => 200,
          'added_by' => 4,
          'balance' => 200,
          'transaction_type' => 'addition',
        ]);

        sleep(1);

        StockRecord::create([
          'stock_id' => 1,
          'added_by' => 4,
          'quantity' => 100,
          'balance' => 300,
          'transaction_type' => 'addition',
        ]);

        sleep(1);

        StockRecord::create([
          'stock_id' => 1,
          'added_by' => 4,
          'quantity' => 180,
          'balance' => 480,
          'transaction_type' => 'addition',
        ]);

        sleep(1);
    }
}
