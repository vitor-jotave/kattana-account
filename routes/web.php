<?php

use App\Http\Controllers\Integrations\AppLaunchController;
use App\Http\Controllers\Integrations\AppLogoutController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('profile.edit');
    }

    return redirect()->route('login');
})->name('home');

Route::inertia('/docs', 'docs')->name('docs');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('apps/{app}/launch', AppLaunchController::class)->name('integrations.apps.launch');
});

Route::get('apps/{app}/logout', AppLogoutController::class)->name('integrations.apps.logout');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::redirect('dashboard', '/settings/profile')->name('dashboard');
});

require __DIR__.'/settings.php';
