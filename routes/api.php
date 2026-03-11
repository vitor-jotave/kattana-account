<?php

use App\Http\Controllers\Api\AuthenticatedUserController;
use App\Http\Controllers\Api\IntegrationCodeExchangeController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('me', AuthenticatedUserController::class)->name('api.me');
});

Route::post('integrations/apps/{app}/exchange', IntegrationCodeExchangeController::class)
    ->name('api.integrations.apps.exchange');
