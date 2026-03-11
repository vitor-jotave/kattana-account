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

function exchangeHeaders(string $key = 'economizze-key', string $secret = 'economizze-secret'): array
{
    return [
        'Authorization' => 'Basic '.base64_encode("{$key}:{$secret}"),
        'Accept' => 'application/json',
    ];
}

test('exchange with valid credentials returns identity and consumes the code', function () {
    $user = User::factory()->create();
    $integrationCode = IntegrationCode::factory()->for($user)->create([
        'code' => 'valid-code',
    ]);

    $response = $this
        ->withHeaders(exchangeHeaders())
        ->postJson(route('api.integrations.apps.exchange', ['app' => 'economizze']), [
            'code' => $integrationCode->code,
        ]);

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

    expect($integrationCode->refresh()->used_at)->not->toBeNull();
});

test('exchange fails with invalid app credentials', function () {
    $integrationCode = IntegrationCode::factory()->create();

    $this->withHeaders(exchangeHeaders(secret: 'wrong-secret'))
        ->postJson(route('api.integrations.apps.exchange', ['app' => 'economizze']), [
            'code' => $integrationCode->code,
        ])
        ->assertUnauthorized()
        ->assertJson([
            'message' => 'Invalid app credentials.',
        ]);
});

test('exchange fails with an invalid code', function () {
    $this->withHeaders(exchangeHeaders())
        ->postJson(route('api.integrations.apps.exchange', ['app' => 'economizze']), [
            'code' => 'missing-code',
        ])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('code');
});

test('exchange fails with an expired code', function () {
    $integrationCode = IntegrationCode::factory()->expired()->create([
        'code' => 'expired-code',
    ]);

    $this->withHeaders(exchangeHeaders())
        ->postJson(route('api.integrations.apps.exchange', ['app' => 'economizze']), [
            'code' => $integrationCode->code,
        ])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('code');
});

test('exchange fails when the code has already been used', function () {
    $integrationCode = IntegrationCode::factory()->used()->create([
        'code' => 'used-code',
    ]);

    $this->withHeaders(exchangeHeaders())
        ->postJson(route('api.integrations.apps.exchange', ['app' => 'economizze']), [
            'code' => $integrationCode->code,
        ])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('code');
});

test('exchange fails when the code belongs to another app', function () {
    config()->set('integrations.apps.notes', [
        'key' => 'notes-key',
        'secret' => 'notes-secret',
        'allowed_return_to' => [
            'http://notes.test/',
        ],
    ]);

    $integrationCode = IntegrationCode::factory()->create([
        'code' => 'notes-code',
        'app_slug' => 'notes',
    ]);

    $this->withHeaders(exchangeHeaders())
        ->postJson(route('api.integrations.apps.exchange', ['app' => 'economizze']), [
            'code' => $integrationCode->code,
        ])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('code');
});

test('the same code can not be exchanged twice', function () {
    $integrationCode = IntegrationCode::factory()->create([
        'code' => 'single-use-code',
    ]);

    $this->withHeaders(exchangeHeaders())
        ->postJson(route('api.integrations.apps.exchange', ['app' => 'economizze']), [
            'code' => $integrationCode->code,
        ])
        ->assertSuccessful();

    $this->withHeaders(exchangeHeaders())
        ->postJson(route('api.integrations.apps.exchange', ['app' => 'economizze']), [
            'code' => $integrationCode->code,
        ])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('code');
});

test('exchange returns not found for unknown apps', function () {
    $integrationCode = IntegrationCode::factory()->create();

    $this->withHeaders(exchangeHeaders())
        ->postJson(route('api.integrations.apps.exchange', ['app' => 'notes']), [
            'code' => $integrationCode->code,
        ])
        ->assertNotFound();
});
