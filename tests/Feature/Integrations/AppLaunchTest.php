<?php

use App\Models\IntegrationCode;
use App\Models\User;

beforeEach(function () {
    config()->set('integrations.apps.economizze', [
        'key' => 'economizze-key',
        'secret' => 'economizze-secret',
        'allowed_return_to' => [
            'http://economizze.test/',
        ],
    ]);
});

test('authenticated users receive a redirect with an integration code', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get(route('integrations.apps.launch', [
            'app' => 'economizze',
            'return_to' => 'http://economizze.test/auth/callback',
        ]));

    $response->assertRedirect();

    $location = $response->headers->get('Location');

    expect($location)->toStartWith('http://economizze.test/auth/callback?code=');

    $code = str($location)->after('?code=')->toString();

    $integrationCode = IntegrationCode::query()->where('code', $code)->first();

    expect($integrationCode)->not->toBeNull();
    expect($integrationCode->user_id)->toBe($user->id);
    expect($integrationCode->app_slug)->toBe('economizze');
    expect($integrationCode->used_at)->toBeNull();
});

test('guests are redirected to login when accessing launch', function () {
    $response = $this->get(route('integrations.apps.launch', [
        'app' => 'economizze',
        'return_to' => 'http://economizze.test/auth/callback',
    ]));

    $response->assertRedirect(route('login'));
    expect(session('url.intended'))->toContain('/apps/economizze/launch');
});

test('guest login continues the launch flow and reaches the final redirect with a code', function () {
    $user = User::factory()->create();

    $this->get(route('integrations.apps.launch', [
        'app' => 'economizze',
        'return_to' => 'http://economizze.test/auth/callback',
    ]))->assertRedirect(route('login'));

    $response = $this->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $response->assertRedirectContains('/apps/economizze/launch');

    $launchResponse = $this->actingAs($user)->get($response->headers->get('Location'));

    $launchResponse->assertRedirect();
    expect($launchResponse->headers->get('Location'))
        ->toStartWith('http://economizze.test/auth/callback?code=');
});

test('launch fails when return_to is outside the allowlist', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('integrations.apps.launch', [
            'app' => 'economizze',
            'return_to' => 'https://evil.example/callback',
        ]))
        ->assertForbidden();
});

test('launch returns not found for unknown apps', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('integrations.apps.launch', [
            'app' => 'notes',
            'return_to' => 'http://economizze.test/auth/callback',
        ]))
        ->assertNotFound();
});
