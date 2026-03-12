<?php

test('forwarded proxy headers are trusted for redirects', function () {
    $response = $this
        ->withServerVariables([
            'REMOTE_ADDR' => '10.0.0.10',
            'HTTP_HOST' => 'internal-nginx',
        ])
        ->withHeaders([
            'X-Forwarded-For' => '203.0.113.10',
            'X-Forwarded-Host' => 'conta.kattana.com.br',
            'X-Forwarded-Port' => '443',
            'X-Forwarded-Proto' => 'https',
        ])
        ->get(route('home'));

    $response->assertRedirect('https://conta.kattana.com.br/login');
});
