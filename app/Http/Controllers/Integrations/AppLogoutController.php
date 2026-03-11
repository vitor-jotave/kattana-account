<?php

namespace App\Http\Controllers\Integrations;

use App\Http\Controllers\Controller;
use App\Http\Requests\Integrations\AppLogoutRequest;
use App\Integrations\IntegrationAppManager;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class AppLogoutController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(
        AppLogoutRequest $request,
        IntegrationAppManager $integrationAppManager,
        string $app
    ): Response {
        $returnTo = $request->string('return_to')->toString();

        $integrationAppManager->ensureAllowedReturnTo($app, $returnTo);

        if (Auth::guard('web')->check()) {
            Auth::guard('web')->logout();
        }

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        if ($request->header('X-Inertia')) {
            return Inertia::location($returnTo);
        }

        return redirect()->away($returnTo);
    }
}
