<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('docs page is publicly accessible', function () {
    $response = $this->get(route('docs'));

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('docs'));
});

test('authenticated users can access docs page from inside the application shell', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get(route('docs'));

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('docs'));
});
