<?php

use App\Models\User;

test('authenticated users can fetch their identity payload', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->getJson(route('api.me'));

    $response
        ->assertSuccessful()
        ->assertJson([
            'data' => [
                'uuid' => $user->uuid,
                'name' => $user->name,
                'email' => $user->email,
                'email_verified' => true,
            ],
        ]);

    expect($response->json('data.created_at'))->toBeString();
    expect($response->json('data'))->not->toHaveKeys([
        'id',
        'password',
        'remember_token',
    ]);
});

test('guests can not fetch the authenticated identity payload', function () {
    $this->getJson(route('api.me'))->assertUnauthorized();
});
