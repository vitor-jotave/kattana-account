<?php

use App\Http\Controllers\Integrations\AppLaunchController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::inertia('/docs', 'docs')->name('docs');

Route::middleware(['auth'])->group(function () {
    Route::get('apps/{app}/launch', AppLaunchController::class)->name('integrations.apps.launch');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
