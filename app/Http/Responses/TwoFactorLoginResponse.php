<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Laravel\Fortify\Contracts\TwoFactorLoginResponse as TwoFactorLoginResponseContract;
use Laravel\Fortify\Fortify;

class TwoFactorLoginResponse implements TwoFactorLoginResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     */
    public function toResponse($request)
    {
        if ($request->wantsJson()) {
            return new JsonResponse('', 204);
        }

        $intendedUrl = $request->session()->get('url.intended');

        if ($this->isIntegrationLaunchUrl($intendedUrl)) {
            $request->session()->forget('url.intended');

            return Inertia::location($intendedUrl);
        }

        return redirect()->intended(Fortify::redirects('login'));
    }

    private function isIntegrationLaunchUrl(?string $url): bool
    {
        if ($url === null) {
            return false;
        }

        $path = parse_url($url, PHP_URL_PATH);

        return is_string($path) && preg_match('#^/apps/[^/]+/launch$#', $path) === 1;
    }
}
