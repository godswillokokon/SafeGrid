<?php

use Illuminate\Database\Seeder;
use App\Company;

class CompaniesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $company = Company::create([
          'name' => 'Uddy King',
          'location' => 'Nigeria',
        ]);

        $company->users()->attach(2, [
          'role' => 'admin',
        ]);

        $company->users()->attach(3, [
          'role' => 'admin',
        ]);
    }
}
