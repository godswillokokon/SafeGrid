<?php

use Illuminate\Database\Seeder;
use App\Branch;

class BranchesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $branch = Branch::create([
          'company_id' => 1,
          'name' => 'Calabar One',
          'location' => 'Lemna Junction',
        ]);

        $branch->users()->attach(4, [
          'role' => 'manager',
        ]);

        $branch->users()->attach(5, [
          'role' => 'supervisor',
        ]);
    }
}
