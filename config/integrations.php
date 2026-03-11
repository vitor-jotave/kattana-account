<?php

return [
    'apps' => [
        'economizze' => [
            'key' => env('ECONOMIZZE_APP_KEY'),
            'secret' => env('ECONOMIZZE_APP_SECRET'),
            'allowed_return_to' => array_values(array_filter(array_map(
                static fn (string $url): string => trim($url),
                explode(',', (string) env('ECONOMIZZE_ALLOWED_RETURN_TO', ''))
            ))),
        ],
    ],
];
