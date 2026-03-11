<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\IntegrationCodeExchangeRequest;
use App\Http\Resources\AuthenticatedUserResource;
use App\Integrations\IntegrationAppManager;
use App\Models\IntegrationCode;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class IntegrationCodeExchangeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(
        IntegrationCodeExchangeRequest $request,
        IntegrationAppManager $integrationAppManager,
        string $app
    ): JsonResource {
        $integrationAppManager->ensureAuthorizedClient($request, $app);

        $integrationCode = DB::transaction(function () use ($request, $app): IntegrationCode {
            $integrationCode = IntegrationCode::query()
                ->where('code', $request->string('code')->toString())
                ->lockForUpdate()
                ->first();

            if ($integrationCode === null) {
                throw ValidationException::withMessages([
                    'code' => 'Invalid integration code.',
                ]);
            }

            if ($integrationCode->app_slug !== $app) {
                throw ValidationException::withMessages([
                    'code' => 'Integration code does not belong to this app.',
                ]);
            }

            if ($integrationCode->isExpired()) {
                throw ValidationException::withMessages([
                    'code' => 'Integration code has expired.',
                ]);
            }

            if ($integrationCode->hasBeenUsed()) {
                throw ValidationException::withMessages([
                    'code' => 'Integration code has already been used.',
                ]);
            }

            $integrationCode->forceFill([
                'used_at' => now(),
            ])->save();

            return $integrationCode;
        });

        return new AuthenticatedUserResource($integrationCode->user);
    }
}
