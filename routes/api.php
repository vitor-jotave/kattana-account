<?php

use App\Http\Controllers\Api\AuthenticatedUserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('me', AuthenticatedUserController::class)->name('api.me');
});
