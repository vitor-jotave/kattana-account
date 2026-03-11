<?php

namespace App\Integrations;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class IntegrationAppManager
{
    /**
     * @return array{key:string|null, secret:string|null, allowed_return_to: array<int, string>}
     */
    public function configFor(string $appSlug): array
    {
        $config = config("integrations.apps.{$appSlug}");

        if (! is_array($config)) {
            throw new NotFoundHttpException;
        }

        return [
            'key' => Arr::get($config, 'key'),
            'secret' => Arr::get($config, 'secret'),
            'allowed_return_to' => array_values(array_filter(Arr::wrap(Arr::get($config, 'allowed_return_to', [])))),
        ];
    }

    public function ensureAllowedReturnTo(string $appSlug, string $returnTo): void
    {
        $config = $this->configFor($appSlug);

        if (! filter_var($returnTo, FILTER_VALIDATE_URL)) {
            throw new AccessDeniedHttpException('Invalid return_to URL.');
        }

        foreach ($config['allowed_return_to'] as $allowedPrefix) {
            if ($allowedPrefix !== '' && str_starts_with($returnTo, $allowedPrefix)) {
                return;
            }
        }

        throw new AccessDeniedHttpException('Invalid return_to URL.');
    }

    public function ensureAuthorizedClient(Request $request, string $appSlug): void
    {
        $config = $this->configFor($appSlug);

        if (
            blank($config['key']) ||
            blank($config['secret']) ||
            ! hash_equals((string) $config['key'], (string) $request->getUser()) ||
            ! hash_equals((string) $config['secret'], (string) $request->getPassword())
        ) {
            throw new UnauthorizedHttpException('Basic', 'Invalid app credentials.');
        }
    }
}
