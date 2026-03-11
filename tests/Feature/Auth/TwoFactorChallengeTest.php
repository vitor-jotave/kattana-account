<?php

use App\Models\User;
use Inertia\Support\Header;
use Inertia\Testing\AssertableInertia as Assert;
use Laravel\Fortify\Features;

beforeEach(function () {
    $this->skipUnlessFortifyFeature(Features::twoFactorAuthentication());
});

test('two factor challenge redirects to login when not authenticated', function () {
    $response = $this->get(route('two-factor.login'));

    $response->assertRedirect(route('login'));
});

test('two factor challenge can be rendered', function () {
    Features::twoFactorAuthentication([
        'confirm' => true,
        'confirmPassword' => true,
    ]);

    $user = User::factory()->create();

    $user->forceFill([
        'two_factor_secret' => encrypt('test-secret'),
        'two_factor_recovery_codes' => encrypt(json_encode(['code1', 'code2'])),
        'two_factor_confirmed_at' => now(),
    ])->save();

    $this->post(route('login'), [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $this->get(route('two-factor.login'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('auth/two-factor-challenge'),
        );
});

test('two factor challenge completion uses external redirect semantics for integration launches', function () {
    Features::twoFactorAuthentication([
        'confirm' => true,
        'confirmPassword' => true,
    ]);

    $user = User::factory()->create();

    $user->forceFill([
        'two_factor_secret' => encrypt('test-secret'),
        'two_factor_recovery_codes' => encrypt(json_encode(['code1', 'code2'])),
        'two_factor_confirmed_at' => now(),
    ])->save();

    $this->withSession([
        'url.intended' => route('integrations.apps.launch', [
            'app' => 'economizze',
            'return_to' => 'http://economizze-v2.test/auth/kattana/callback',
        ]),
    ])->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'password',
    ])->assertRedirect(route('two-factor.login'));

    $response = $this->withHeaders([
        Header::INERTIA => 'true',
    ])->post(route('two-factor.login.store'), [
        'recovery_code' => 'code1',
    ]);

    $response
        ->assertStatus(409)
        ->assertHeader(
            Header::LOCATION,
            route('integrations.apps.launch', [
                'app' => 'economizze',
                'return_to' => 'http://economizze-v2.test/auth/kattana/callback',
            ]),
        );
});
