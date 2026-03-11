<?php

namespace App\Http\Responses;

use Inertia\Inertia;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Laravel\Fortify\Fortify;

class LoginResponse implements LoginResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     */
    public function toResponse($request)
    {
        if ($request->wantsJson()) {
            return response()->json(['two_factor' => false]);
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
