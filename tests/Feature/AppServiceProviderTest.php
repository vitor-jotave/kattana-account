<?php

use App\Providers\AppServiceProvider;
use Illuminate\Support\Facades\URL;

test('production environment forces the configured root url and https scheme', function () {
    $originalEnvironment = app()['env'];
    $originalAppUrl = config('app.url');

    config()->set('app.url', 'http://conta.kattana.com.br');
    app()['env'] = 'production';

    $provider = new class(app()) extends AppServiceProvider
    {
        public function configureUrlForTest(): void
        {
            $this->configureUrl();
        }
    };

    $provider->configureUrlForTest();

    expect(URL::to('/settings/profile'))->toBe('https://conta.kattana.com.br/settings/profile');

    URL::forceRootUrl(null);
    URL::forceScheme(null);
    config()->set('app.url', $originalAppUrl);
    app()['env'] = $originalEnvironment;
});
