<?php

namespace Database\Factories;

use App\Models\IntegrationCode;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<IntegrationCode>
 */
class IntegrationCodeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'code' => Str::random(40),
            'user_id' => User::factory(),
            'app_slug' => 'economizze',
            'expires_at' => now()->addMinutes(5),
            'used_at' => null,
        ];
    }

    public function expired(): static
    {
        return $this->state(fn (array $attributes) => [
            'expires_at' => now()->subMinute(),
        ]);
    }

    public function used(): static
    {
        return $this->state(fn (array $attributes) => [
            'used_at' => now()->subSecond(),
        ]);
    }
}
