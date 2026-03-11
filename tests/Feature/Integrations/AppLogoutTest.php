<?php

use App\Models\User;

beforeEach(function () {
    config()->set('integrations.apps.economizze', [
        'key' => 'economizze-key',
        'secret' => 'economizze-secret',
        'allowed_return_to' => [
            'http://economizze-v2.test/',
        ],
    ]);
});

test('authenticated users are logged out and redirected back to the app', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get(route('integrations.apps.logout', [
            'app' => 'economizze',
            'return_to' => 'http://economizze-v2.test/logout/callback',
        ]));

    $response->assertRedirect('http://economizze-v2.test/logout/callback');
    $this->assertGuest();
});

test('guests are still redirected back to the app on logout route', function () {
    $this->get(route('integrations.apps.logout', [
        'app' => 'economizze',
        'return_to' => 'http://economizze-v2.test/logout/callback',
    ]))->assertRedirect('http://economizze-v2.test/logout/callback');
});

test('logout route rejects invalid return_to URLs', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('integrations.apps.logout', [
            'app' => 'economizze',
            'return_to' => 'https://evil.example/logout',
        ]))
        ->assertForbidden();
});

test('logout route returns not found for unknown apps', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('integrations.apps.logout', [
            'app' => 'notes',
            'return_to' => 'http://economizze-v2.test/logout/callback',
        ]))
        ->assertNotFound();
});
