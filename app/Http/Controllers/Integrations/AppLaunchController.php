<?php

namespace App\Http\Controllers\Integrations;

use App\Http\Controllers\Controller;
use App\Http\Requests\Integrations\AppLaunchRequest;
use App\Integrations\IntegrationAppManager;
use App\Models\IntegrationCode;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

class AppLaunchController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(
        AppLaunchRequest $request,
        IntegrationAppManager $integrationAppManager,
        string $app
    ): RedirectResponse {
        $returnTo = $request->string('return_to')->toString();

        $integrationAppManager->ensureAllowedReturnTo($app, $returnTo);

        $integrationCode = IntegrationCode::query()->create([
            'code' => Str::random(64),
            'user_id' => $request->user()->id,
            'app_slug' => $app,
            'expires_at' => now()->addMinutes(5),
        ]);

        return redirect()->away($this->appendCodeToReturnTo($returnTo, $integrationCode->code));
    }

    private function appendCodeToReturnTo(string $returnTo, string $code): string
    {
        $separator = str_contains($returnTo, '?') ? '&' : '?';

        return "{$returnTo}{$separator}code={$code}";
    }
}
