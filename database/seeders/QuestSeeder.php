<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Quest;

class QuestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Quest::factory()
            ->times(10)
            ->create();
    }
}
