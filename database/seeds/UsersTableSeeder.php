<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        /*
         * Only in development
         * use a different migration for testing
         */
        if (true) {
            User::create([
              'name' => 'Super Admin',
              'mobile' => '08145070435',
              'email' => 'admin@gmail.com',
              'gender' => 'M',
              'role' => 'admin',
              'password' => bcrypt('password'),
            ]);

            /*
             * Create Regular Users
             */
            User::create([
              'name' => 'Uddy King Admin One',
              'mobile' => '08145070436',
              'email' => 'regularone@gmail.com',
              'gender' => 'F',
              'password' => bcrypt('password'),
            ]);

            User::create([
              'name' => 'Uddy King Admin Two',
              'mobile' => '08145070437',
              'email' => 'regulartwo@gmail.com',
              'gender' => 'M',
              'password' => bcrypt('password'),
            ]);

            User::create([
              'name' => 'Regular User Three',
              'mobile' => '08145070438',
              'email' => 'regularthree@gmail.com',
              'gender' => 'F',
              'password' => bcrypt('password'),
            ]);

            User::create([
              'name' => 'Regular User Four',
              'mobile' => '08145070439',
              'email' => 'regularfour@gmail.com',
              'gender' => 'M',
              'password' => bcrypt('password'),
            ]);
        }
    }
}
