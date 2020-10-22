<?php

namespace Database\Factories;

use App\Models\Quest;
use Illuminate\Database\Eloquent\Factories\Factory;

class QuestFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Quest::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'description' => $this->faker->text,
            'time' => '1',
            'img' => 'https://ilocked.ru/imgrs/r-1200-1200-95/yzhfgeei9WvOWTI71T4ztg/storage/quests/sliders/xnNnijtcAkMFxn1JTfq8kEVDJU912s98OrCZ7rOv.jpeg',
        ];
    }
}
